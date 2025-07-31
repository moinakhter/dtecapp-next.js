import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!

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
        storefrontAccessToken: data.storefront_access_token.access_token,
      }
    }
    return { error: "Failed to create storefront token" }
  } catch (error) {
    console.error("Storefront token creation error:", error)
    return { error: "Failed to create storefront token" }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const hmac = searchParams.get("hmac")
 

  if (!shop) {
    return NextResponse.json({ error: "Missing 'shop' query parameter" }, { status: 400 })
  }

  // If we have a code, exchange it for tokens
  if (code && hmac) {
    try {
      console.log("Exchanging code for access token...")
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
        console.error("Token request failed:", tokenResponse.status, errorText)
        return NextResponse.json({ error: "Token request failed", debug: errorText }, { status: 500 })
      }

      const tokenData = await tokenResponse.json()

      if (!tokenData?.access_token) {
        console.error("No access token in response:", tokenData)
        return NextResponse.json({ error: "No access token returned", debug: tokenData }, { status: 500 })
      }

      const accessToken = tokenData.access_token
      console.log("✅ Successfully obtained access token for shop:", shop)

      // Create storefront access token
      const storefrontTokenResult = await createStorefrontToken(shop, accessToken)

      if ("error" in storefrontTokenResult) {
        return NextResponse.json({
          status: true,
          error: storefrontTokenResult.error,
          shop,
        })
      }

      return NextResponse.json({
        status: true,
        storefront_token: storefrontTokenResult.storefrontAccessToken,
        shop,
      })
    } catch (error) {
      console.error("Token exchange failed:", error)
      return NextResponse.json({ error: "Token exchange failed", debug: error }, { status: 500 })
    }
  }

  // If no code, return OAuth URL for frontend to handle
  const scopes = "unauthenticated_read_customers,unauthenticated_read_product_listings"
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/en/products/shopify-assistant`
  const stateParam = crypto.randomBytes(16).toString("hex")

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${stateParam}`

  return NextResponse.json({
    status: false,
    auth_url: authUrl,
    shop,
  })
}
