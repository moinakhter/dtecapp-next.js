import { type NextRequest, NextResponse } from "next/server"

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

async function createStorefrontToken(shop: string, accessToken: string) {
  try {
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
    const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("shop", shop || "")
    errorUrl.searchParams.set("status", "error")
    errorUrl.searchParams.set("error", "Missing required parameters")
    if (host) errorUrl.searchParams.set("host", host)
    if (embedded) errorUrl.searchParams.set("embedded", embedded)
    return NextResponse.redirect(errorUrl.toString())
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
      const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
      errorUrl.searchParams.set("shop", shop)
      errorUrl.searchParams.set("status", "error")
      errorUrl.searchParams.set("error", "Failed to get access token")
      if (host) errorUrl.searchParams.set("host", host)
      if (embedded) errorUrl.searchParams.set("embedded", embedded)
      return NextResponse.redirect(errorUrl.toString())
    }

    const accessToken = tokenData.access_token

    // Step 5: Create Storefront Access Token
    const storefrontToken = await createStorefrontToken(shop, accessToken)

    const redirectUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    redirectUrl.searchParams.set("shop", shop)
    redirectUrl.searchParams.set("status", "true")

    if (storefrontToken?.accessToken) {
      redirectUrl.searchParams.set("storefront_token", storefrontToken.accessToken)
    } else {
      redirectUrl.searchParams.set("status", "error")
      redirectUrl.searchParams.set("error", "Failed to create storefront token")
    }

    // Preserve iframe context
    if (host) redirectUrl.searchParams.set("host", host)
    if (embedded) redirectUrl.searchParams.set("embedded", embedded)

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
