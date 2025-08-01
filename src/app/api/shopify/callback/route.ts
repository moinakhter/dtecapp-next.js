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
      return data.storefront_access_token.access_token
    }

    // Try to get existing tokens if creation fails
    const existingResponse = await fetch(`https://${shop}/admin/api/2024-01/storefront_access_tokens.json`, {
      method: "GET",
      headers: {
        "X-Shopify-Access-Token": accessToken,
        "Content-Type": "application/json",
      },
    })

    const existingData = await existingResponse.json()
    if (existingResponse.ok && existingData.storefront_access_tokens?.length > 0) {
      return existingData.storefront_access_tokens[0].access_token
    }

    return null
  } catch (error) {
    console.error("Storefront token error:", error)
    return null
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const state = searchParams.get("state")

  if (!shop || !code || !state) {
    const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("shop", shop || "")
    errorUrl.searchParams.set("error", "Missing parameters")
    return NextResponse.redirect(errorUrl.toString())
  }

  // Decode the state to get iframe context
  let host: string | null = null
  let embedded: string | null = null

  try {
    const stateData = JSON.parse(Buffer.from(state, "base64").toString())
    host = stateData.host
    embedded = stateData.embedded
  } catch (error) {
    console.error("Failed to decode state:", error)
  }

  try {
    // Exchange code for access token
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
      const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
      errorUrl.searchParams.set("shop", shop)
      errorUrl.searchParams.set("error", "Failed to get access token")
      if (host) errorUrl.searchParams.set("host", host)
      if (embedded) errorUrl.searchParams.set("embedded", embedded)
      return NextResponse.redirect(errorUrl.toString())
    }

    // Create storefront token
    const storefrontToken = await createStorefrontToken(shop, tokenData.access_token)

    const redirectUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    redirectUrl.searchParams.set("shop", shop)

    if (storefrontToken) {
      redirectUrl.searchParams.set("token", storefrontToken)
      redirectUrl.searchParams.set("status", "success")
    } else {
      redirectUrl.searchParams.set("error", "Failed to create storefront token")
      redirectUrl.searchParams.set("status", "error")
    }

    // Restore iframe context from state
    if (host) redirectUrl.searchParams.set("host", host)
    if (embedded) redirectUrl.searchParams.set("embedded", embedded)

    return NextResponse.redirect(redirectUrl.toString())
  } catch (error) {
    console.error("Callback error:", error)
    const errorUrl = new URL("https://dtec.app/en/products/shopify-assistant")
    errorUrl.searchParams.set("shop", shop)
    errorUrl.searchParams.set("error", "Internal server error")
    if (host) errorUrl.searchParams.set("host", host)
    if (embedded) errorUrl.searchParams.set("embedded", embedded)
    return NextResponse.redirect(errorUrl.toString())
  }
}
