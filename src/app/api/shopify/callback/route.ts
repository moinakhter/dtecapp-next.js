import { type NextRequest, NextResponse } from "next/server"
 

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

// Simple in-memory cache to prevent code reuse
const usedCodes = new Set<string>()

 

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

    if (!response.ok) {
      console.error("Storefront token creation failed:", response.status, response.statusText)
      return { error: "Failed to create storefront token" }
    }

    const data = await response.json()
    if (data.storefront_access_token) {
      return {
        storefrontAccessToken: {
          accessToken: data.storefront_access_token.access_token,
        },
      }
    }

    return { error: "Failed to create storefront token" }
  } catch (error) {
    console.error("Storefront token creation error:", error)
    return { error: "Failed to create storefront token" }
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const hmac = searchParams.get("hmac")
  const embedded = searchParams.get("embedded") || "1"
  const host = searchParams.get("host")

  console.log("🔍 Callback received:", {
    shop,
    code: code?.substring(0, 8) + "...",
    hmac: hmac?.substring(0, 8) + "...",
  })

  if (!code && shop) {
    console.log("No code found, redirecting to auth route")
    const redirect = new URL("https://dtecapp-design.vercel.app/api/shopify/auth")
    redirect.searchParams.set("shop", shop)
    if (host) redirect.searchParams.set("host", host)
    if (embedded) redirect.searchParams.set("embedded", embedded)

    return NextResponse.json({
      redirect_url: redirect.toString(),
      status: false,
    })
  }

  if (!shop || !code || !hmac) {
    console.error("Missing required parameters:", {
      shop: !!shop,
      code: !!code,
      hmac: !!hmac,
    })

    // Redirect to frontend with error
    const errorUrl = new URL("https://dtecapp-design.vercel.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("error", "missing_parameters")
    if (shop) errorUrl.searchParams.set("shop", shop)

    return NextResponse.redirect(errorUrl)
  }

  // Check if code has already been used
  if (usedCodes.has(code)) {
    console.error("❌ Authorization code already processed:", code.substring(0, 8) + "...")
    return NextResponse.json(
      {
        error: "Authorization code already used",
        message: "This authorization code has already been processed. Please start a new OAuth flow.",
        action: "restart_oauth",
        shop: shop,
      },
      { status: 400 },
    )
  }

  // Mark code as used immediately to prevent race conditions
  usedCodes.add(code)
  console.log("✅ Code marked as used:", code.substring(0, 8) + "...")

 

  // Exchange code for access token
  try {
    console.log("🔄 Exchanging code for access token...")

    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: SHOPIFY_CLIENT_ID,
        client_secret: SHOPIFY_CLIENT_SECRET,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("❌ Token request failed:", tokenResponse.status, errorText)

      // Redirect to frontend with error
      const errorUrl = new URL("https://dtecapp-design.vercel.app/en/products/shopify-assistant")
      errorUrl.searchParams.set("error", "token_exchange_failed")
      errorUrl.searchParams.set("shop", shop)
      if (host) errorUrl.searchParams.set("host", host)
      if (embedded) errorUrl.searchParams.set("embedded", embedded)

      return NextResponse.redirect(errorUrl)
    }

    const tokenData = await tokenResponse.json()
    console.log("✅ Token exchange successful")

    if (!tokenData?.access_token) {
      console.error("No access token in response:", tokenData)

      // Redirect to frontend with error
      const errorUrl = new URL("https://dtecapp-design.vercel.app/en/products/shopify-assistant")
      errorUrl.searchParams.set("error", "no_access_token")
      errorUrl.searchParams.set("shop", shop)
      if (host) errorUrl.searchParams.set("host", host)
      if (embedded) errorUrl.searchParams.set("embedded", embedded)

      return NextResponse.redirect(errorUrl)
    }

    const accessToken = tokenData.access_token
    const scopes = tokenData.scope

    console.log("🎉 Successfully obtained access token for shop:", shop)

    // Create storefront access token
    const storefrontTokenData = await createStorefrontToken(shop, accessToken)

    // Redirect back to frontend with success and token data
    const successUrl = new URL("https://dtecapp-design.vercel.app/en/products/shopify-assistant")
    successUrl.searchParams.set("success", "true")
    successUrl.searchParams.set("shop", shop)
    successUrl.searchParams.set("scope", scopes)

    // Add the storefront token if successful
    if (storefrontTokenData.storefrontAccessToken?.accessToken) {
      successUrl.searchParams.set("storefront_token", storefrontTokenData.storefrontAccessToken.accessToken)
    } else if (storefrontTokenData.error) {
      successUrl.searchParams.set("storefront_error", storefrontTokenData.error)
    }

    // Preserve embedded context parameters
    if (host) successUrl.searchParams.set("host", host)
    if (embedded) successUrl.searchParams.set("embedded", embedded)
    if (hmac) successUrl.searchParams.set("hmac", hmac)
    if (code) successUrl.searchParams.set("code", code)

    console.log("🔄 Redirecting to frontend with success")
    return NextResponse.redirect(successUrl)
  } catch (error) {
    console.error("❌ Token exchange failed:", error)

    // Redirect to frontend with error
    const errorUrl = new URL("https://dtecapp-design.vercel.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("error", "token_exchange_exception")
    errorUrl.searchParams.set("shop", shop)
    if (host) errorUrl.searchParams.set("host", host)
    if (embedded) errorUrl.searchParams.set("embedded", embedded)

    return NextResponse.redirect(errorUrl)
  }
}
