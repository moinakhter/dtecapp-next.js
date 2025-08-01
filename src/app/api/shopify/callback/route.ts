import { type NextRequest, NextResponse } from "next/server"

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

async function createStorefrontToken(shop: string, accessToken: string) {
  console.log("🔄 Starting storefront token creation for shop:", shop)

  try {
    // First, let's check what scopes we have
    const shopResponse = await fetch(`https://${shop}/admin/api/2024-01/shop.json`, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    })

    const shopData = await shopResponse.json()
    console.log("📊 Shop API test:", { status: shopResponse.status, hasShop: !!shopData.shop })

    // Try to create storefront token
    console.log("🔄 Attempting to create storefront token...")
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
    console.log("📊 Storefront token creation response:", {
      status: response.status,
      statusText: response.statusText,
      data: data,
      headers: Object.fromEntries(response.headers.entries()),
    })

    if (response.ok && data.storefront_access_token) {
      console.log("✅ Storefront token created successfully")
      return data.storefront_access_token.access_token
    }

    // If creation failed, try to get existing tokens
    console.log("🔄 Creation failed, trying to get existing tokens...")
    const existingResponse = await fetch(`https://${shop}/admin/api/2024-01/storefront_access_tokens.json`, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    })

    const existingData = await existingResponse.json()
    console.log("📊 Existing tokens response:", {
      status: existingResponse.status,
      data: existingData,
    })

    if (existingResponse.ok && existingData.storefront_access_tokens?.length > 0) {
      console.log("✅ Using existing storefront token")
      return existingData.storefront_access_tokens[0].access_token
    }

    console.log("❌ No existing tokens found")
    return null
  } catch (error) {
    console.error("❌ Storefront token error:", error)
    return null
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  console.log("🔄 Callback received:", {
    shop,
    hasCode: !!code,
    hasState: !!state,
    url: req.url,
  })

  if (!shop || !code || !state) {
    console.error("❌ Missing required parameters")
    const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("shop", shop || "")
    errorUrl.searchParams.set("error", "Missing required parameters")
    return NextResponse.redirect(errorUrl.toString())
  }

  // Decode the state to get iframe context
  let host: string | null = null
  let embedded: string | null = null

  try {
    const stateData = JSON.parse(Buffer.from(state, "base64").toString())
    host = stateData.host
    embedded = stateData.embedded
    console.log("📊 Decoded state:", { host, embedded })
  } catch (error) {
    console.error("❌ Failed to decode state:", error)
  }

  try {
    // Exchange code for access token
    console.log("🔄 Exchanging code for access token...")
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
    console.log("📊 Token exchange response:", {
      status: tokenResponse.status,
      hasAccessToken: !!tokenData.access_token,
      scope: tokenData.scope,
    })

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error("❌ Access token request failed:", tokenData)
      const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
      errorUrl.searchParams.set("shop", shop)
      errorUrl.searchParams.set("error", `Failed to get access token: ${JSON.stringify(tokenData)}`)
      if (host) errorUrl.searchParams.set("host", host)
      if (embedded) errorUrl.searchParams.set("embedded", embedded)
      return NextResponse.redirect(errorUrl.toString())
    }

    console.log("✅ Access token obtained with scopes:", tokenData.scope)

    // Create storefront token
    const storefrontToken = await createStorefrontToken(shop, tokenData.access_token)

    const redirectUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    redirectUrl.searchParams.set("shop", shop)

    if (storefrontToken) {
      console.log("✅ Success! Redirecting with token")
      redirectUrl.searchParams.set("token", storefrontToken)
      redirectUrl.searchParams.set("status", "success")
    } else {
      console.log("❌ Failed to create storefront token, redirecting with error")
      redirectUrl.searchParams.set("error", "Failed to create storefront token - check app permissions and scopes")
      redirectUrl.searchParams.set("status", "error")
      redirectUrl.searchParams.set("debug_scope", tokenData.scope || "unknown")
    }

    // Restore iframe context from state
    if (host) redirectUrl.searchParams.set("host", host)
    if (embedded) redirectUrl.searchParams.set("embedded", embedded)

    console.log("🔄 Final redirect URL:", redirectUrl.toString())
    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error("❌ Callback error:", error)
    const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("shop", shop)
    errorUrl.searchParams.set("error", `Internal server error: ${error}`)
    if (host) errorUrl.searchParams.set("host", host)
    if (embedded) errorUrl.searchParams.set("embedded", embedded)
    return NextResponse.redirect(errorUrl.toString())
  }
}
