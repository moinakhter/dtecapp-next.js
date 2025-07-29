import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

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

    if (data.storefront_access_token) {
      return {
        storefrontAccessToken: {
          accessToken: data.storefront_access_token.access_token,
        },
      }
    }

    return { error: "Failed to create storefront token" }
  } catch {
    return { error: "Failed to create storefront token" }
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const hmac = searchParams.get("hmac")

  console.log("API called with params:", { shop, code: !!code, hmac: !!hmac })

  // Handle case where there's no code (initial OAuth or re-authentication)
  if (!code && shop) {
    console.log("No code found, redirecting to OAuth")
    const scopes =
      "unauthenticated_write_checkouts,unauthenticated_read_product_listings,unauthenticated_read_customers,unauthenticated_read_checkouts"
    const redirectUri = encodeURIComponent("https://dtecapp-design.vercel.app/products/shopify-assistant")
    const state = crypto.randomBytes(16).toString("hex")

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}`

    console.log("Returning redirect URL:", authUrl)
    return NextResponse.json({
      redirect_url: authUrl,
      status: false,
    })
  }

  if (!shop || !code || !hmac) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  // HMAC validation - matching PHP logic exactly
  const filteredParams = new URLSearchParams()
  for (const [key, value] of searchParams.entries()) {
    if (key !== "hmac") {
      filteredParams.append(key, value)
    }
  }

  // Sort parameters
  const sortedParams = Array.from(filteredParams.entries()).sort()
  const queryString = new URLSearchParams(sortedParams).toString()

  // Generate HMAC - decode the query string like PHP does
  const generatedHmac = crypto
    .createHmac("sha256", SHOPIFY_CLIENT_SECRET)
    .update(decodeURIComponent(queryString))
    .digest("hex")

  // Timing-safe comparison
  const hmacIsValid =
    generatedHmac.length === hmac.length && crypto.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmac))

  if (!hmacIsValid) {
    return NextResponse.json({ error: "HMAC validation failed" }, { status: 403 })
  }

  // Exchange code for access token
  try {
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
      return NextResponse.json({ error: "Token request failed" }, { status: 500 })
    }

    const tokenData = await tokenResponse.json()

    if (!tokenData?.access_token) {
      return NextResponse.json({ error: "No access token returned" }, { status: 500 })
    }

    const accessToken = tokenData.access_token
    const scopes = tokenData.scope

    // Create storefront access token
    const storefrontTokenData = await createStorefrontToken(shop, accessToken)

    return NextResponse.json({
      status: true,
      shop,
      access_token: accessToken,
      scope: scopes,
      storefront_access_token: storefrontTokenData,
    })
  } catch {
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 })
  }
}
