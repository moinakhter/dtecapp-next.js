import { type NextRequest, NextResponse } from "next/server"
 

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

async function createStorefrontToken(shop: string, accessToken: string) {
  try {
    // Use the correct API version and endpoint
    const response = await fetch(`https://${shop}/admin/api/2024-01/storefront_access_tokens.json`, {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storefront_access_token: {
          title: "Dtec App Access",
        },
      }),
    })

    const data = await response.json()

    if (response.ok && data.storefront_access_token) {
      return {
        accessToken: data.storefront_access_token.access_token,
      }
    } else {
      console.error("❌ Storefront token creation failed:", data)
      // Try with different API version if first attempt fails
      const fallbackResponse = await fetch(`https://${shop}/admin/api/2023-10/storefront_access_tokens.json`, {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storefront_access_token: {
            title: "Dtec App Access",
          },
        }),
      })

      const fallbackData = await fallbackResponse.json()
      if (fallbackResponse.ok && fallbackData.storefront_access_token) {
        return {
          accessToken: fallbackData.storefront_access_token.access_token,
        }
      }

      return null
    }
  } catch (error) {
    console.error("❌ Storefront token error:", error)
    return null
  }
}

 

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const hmac = searchParams.get("hmac")
  const embedded = searchParams.get("embedded") || "1"
  const host = searchParams.get("host")

  // Step 1: Redirect to auth if no code is present
  if (!code && shop) {
    const redirect = new URL("https://dtec.app/api/shopify/auth")
    redirect.searchParams.set("shop", shop)
    if (host) redirect.searchParams.set("host", host)
    if (embedded) redirect.searchParams.set("embedded", embedded)

    return NextResponse.redirect(redirect.toString())
  }

  // Step 2: Validate required params
  if (!shop || !code || !hmac) {
    console.error("❌ Missing required parameters:", { shop, code, hmac })
    return NextResponse.json({ status: false, error: "Missing required parameters" }, { status: 400 })
  }

  
  // Step 4: Exchange code for access token
  try {
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: SHOPIFY_CLIENT_ID,
        client_secret: SHOPIFY_CLIENT_SECRET,
        code,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("❌ Access token request failed:", tokenData)
      return NextResponse.json({ status: false, error: "Failed to get access token" }, { status: 500 })
    }

    const accessToken = tokenData.access_token

    // Step 5: Create Storefront Access Token
    const storefrontToken = await createStorefrontToken(shop, accessToken)

    // Step 6: Redirect back to the app page within the iframe
    const redirectUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    redirectUrl.searchParams.set("shop", shop)
    redirectUrl.searchParams.set("status", "success")

    if (storefrontToken?.accessToken) {
      redirectUrl.searchParams.set("storefront_token", storefrontToken.accessToken)
    } else {
      redirectUrl.searchParams.set("status", "error")
      redirectUrl.searchParams.set("error", "Failed to create storefront token")
    }

    // Preserve embedded context
    if (host) redirectUrl.searchParams.set("host", host)
    if (embedded) redirectUrl.searchParams.set("embedded", embedded)

    // For embedded apps, we need to redirect properly within the iframe
    if (embedded === "1" && host) {
      // Return HTML that uses App Bridge to redirect within the iframe
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <script src="https://unpkg.com/@shopify/app-bridge@3"></script>
        </head>
        <body>
          <script>
            document.addEventListener('DOMContentLoaded', function() {
              if (window.top !== window.self) {
                // We're in an iframe, use App Bridge
                const AppBridge = window['app-bridge'];
                const createApp = AppBridge.default;
                const { Redirect } = AppBridge.actions;
                
                const app = createApp({
                  apiKey: '${SHOPIFY_CLIENT_ID}',
                  host: '${host}'
                });
                
                const redirect = Redirect.create(app);
                redirect.dispatch(Redirect.Action.APP, '${redirectUrl.pathname}${redirectUrl.search}');
              } else {
                // Fallback for non-embedded
                window.location.href = '${redirectUrl.toString()}';
              }
            });
          </script>
          <p>Redirecting...</p>
        </body>
        </html>
      `

      return new Response(html, {
        headers: { "Content-Type": "text/html" },
      })
    }

    // For non-embedded apps, use regular redirect
    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error("❌ Token exchange failed:", error)

    const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("shop", shop)
    errorUrl.searchParams.set("status", "error")
    errorUrl.searchParams.set("error", "Internal error during token exchange")
    if (host) errorUrl.searchParams.set("host", host)
    if (embedded) errorUrl.searchParams.set("embedded", embedded)

    return NextResponse.redirect(errorUrl.toString())
  }
}
