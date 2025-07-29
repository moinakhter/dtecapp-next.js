import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

function validateHmac(query: URLSearchParams, secret: string): boolean {
  const hmac = query.get("hmac")
  if (!hmac) return false

  // Remove hmac and signature from query params
  const filteredQuery = new URLSearchParams()
  for (const [key, value] of query.entries()) {
    if (key !== "hmac" && key !== "signature") {
      filteredQuery.append(key, value)
    }
  }

  // Sort parameters alphabetically by key
  const sortedParams = Array.from(filteredQuery.entries()).sort(([a], [b]) => a.localeCompare(b))

  // Build query string manually to ensure proper formatting
  const queryString = sortedParams.map(([key, value]) => `${key}=${value}`).join("&")

  console.log("HMAC Debug:")
  console.log("Original query string for HMAC:", queryString)
  console.log("Sorted params:", sortedParams)

  // Generate HMAC
  const generatedHmac = crypto.createHmac("sha256", secret).update(queryString).digest("hex")

  console.log("Generated HMAC:", generatedHmac)
  console.log("Received HMAC:", hmac)
  console.log("HMAC match:", generatedHmac === hmac)

  return generatedHmac === hmac
}

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
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const hmac = searchParams.get("hmac")

  console.log("Callback API called with params:", { shop, code: !!code, hmac: !!hmac })
  console.log("All search params:", Object.fromEntries(searchParams.entries()))

  // If no code, redirect to auth route to start OAuth
  if (!code && shop) {
    console.log("No code found, redirecting to auth route")
    return NextResponse.json({
      redirect_url: `https://dtecapp-design.vercel.app/api/shopify/auth?shop=${encodeURIComponent(shop)}`,
      status: false,
    })
  }

  if (!shop || !code || !hmac) {
    console.error("Missing required parameters:", { shop: !!shop, code: !!code, hmac: !!hmac })
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

  // HMAC validation using the corrected algorithm
  console.log("=== HMAC Validation ===")
  const isValidHmac = validateHmac(searchParams, SHOPIFY_CLIENT_SECRET)

  if (!isValidHmac) {
    console.error("HMAC validation failed!")
    return NextResponse.json(
      {
        error: "HMAC validation failed",
        debug: {
          received_hmac: hmac,
          all_params: Object.fromEntries(searchParams.entries()),
        },
      },
      { status: 403 },
    )
  }

  console.log("HMAC validation successful!")

  // Exchange code for access token
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
      console.error("Token request failed:", tokenResponse.status, tokenResponse.statusText, errorText)
      return NextResponse.json({ error: "Token request failed" }, { status: 500 })
    }

    const tokenData = await tokenResponse.json()
    console.log("Token response:", tokenData)

    if (!tokenData?.access_token) {
      console.error("No access token in response:", tokenData)
      return NextResponse.json({ error: "No access token returned" }, { status: 500 })
    }

    const accessToken = tokenData.access_token
    const scopes = tokenData.scope

    console.log("Successfully obtained access token for shop:", shop)

    // Create storefront access token
    const storefrontTokenData = await createStorefrontToken(shop, accessToken)

    return NextResponse.json({
      status: true,
      shop,
      access_token: accessToken,
      scope: scopes,
      storefront_access_token: storefrontTokenData,
    })
  } catch (error) {
    console.error("Token exchange failed:", error)
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 })
  }
}
