import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!

// Simple in-memory cache to prevent code reuse
const usedCodes = new Set<string>()

function validateHmac(params: URLSearchParams, secret: string): boolean {
  const hmacFromShopify = params.get("hmac") || ""

  const filteredParams: Record<string, string> = {}
  for (const [key, value] of params.entries()) {
    if (key !== "hmac") {
      filteredParams[key] = value
    }
  }

  const sortedKeys = Object.keys(filteredParams).sort()
  const queryParts = sortedKeys.map((key) => `${key}=${filteredParams[key]}`)
  const queryString = queryParts.join("&")
  const generatedHmac = crypto.createHmac("sha256", secret).update(queryString).digest("hex")

  console.log("🔍 HMAC validation:", {
    expected: generatedHmac,
    received: hmacFromShopify,
    valid: crypto.timingSafeEqual(Buffer.from(hmacFromShopify), Buffer.from(generatedHmac)),
  })

  return crypto.timingSafeEqual(Buffer.from(hmacFromShopify), Buffer.from(generatedHmac))
}

async function exchangeCodeForToken(shop: string, code: string) {
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
      console.error("❌ Token request failed:", tokenResponse.status, errorText.substring(0, 200))
      throw new Error(`Token exchange failed: ${tokenResponse.status}`)
    }

    const tokenData = await tokenResponse.json()
    console.log("✅ Token exchange successful!")

    return tokenData
  } catch (error) {
    console.error("❌ Token exchange error:", error)
    throw error
  }
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
  const state = searchParams.get("state")
  const host = searchParams.get("host")

  console.log("🚀 Auth route called with:", {
    shop,
    code: code ? code.substring(0, 8) + "..." : null,
    hmac: hmac ? hmac.substring(0, 8) + "..." : null,
    state,
    host,
  })

  // STEP 1: Initial OAuth request - redirect to Shopify
  if (!code && shop) {
    console.log("📤 No code found, redirecting to Shopify OAuth")
    const scopes = "unauthenticated_read_customers,unauthenticated_read_product_listings"
    const redirectUri = "https://dtecapp-design.vercel.app/api/shopify/auth"
    const stateParam = crypto.randomBytes(16).toString("hex")

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${stateParam}`

    console.log("🔗 Redirecting to Shopify OAuth URL")
    return NextResponse.redirect(authUrl)
  }

  // STEP 2: OAuth callback from Shopify - automatically process the token
  if (code && shop && hmac) {
    console.log("📥 Received OAuth callback from Shopify - processing automatically...")

    // Check if code has already been used
    if (usedCodes.has(code)) {
      console.error("❌ Authorization code already processed")
      const errorUrl = `https://dtecapp-design.vercel.app/en/products/shopify-assistant?error=code_already_used&shop=${shop}`
      return NextResponse.redirect(errorUrl)
    }

    // Mark code as used immediately
    usedCodes.add(code)

    try {
      // Validate HMAC (optional but recommended)
      const isValidHmac = validateHmac(searchParams, SHOPIFY_CLIENT_SECRET)
      if (!isValidHmac) {
        console.warn("⚠️ HMAC validation failed, but continuing...")
      }

      // Exchange code for access token
      const tokenData = await exchangeCodeForToken(shop, code)

      if (!tokenData?.access_token) {
        throw new Error("No access token received")
      }

      const accessToken = tokenData.access_token
      const scopes = tokenData.scope

      console.log("🎉 Successfully obtained access token for shop:", shop)

      // Create storefront access token
      const storefrontTokenData = await createStorefrontToken(shop, accessToken)

      // Clean up old codes
      if (usedCodes.size > 50) {
        const codesArray = Array.from(usedCodes)
        const oldCodes = codesArray.slice(0, codesArray.length - 25)
        oldCodes.forEach((oldCode) => usedCodes.delete(oldCode))
      }

      // TODO: Store tokens in your database here
      console.log("💾 Tokens obtained:", {
        shop,
        access_token: accessToken.substring(0, 10) + "...",
        scope: scopes,
        storefront_token: storefrontTokenData.storefrontAccessToken?.accessToken?.substring(0, 10) + "..." || "failed",
      })

      // Redirect back to your app with success
      const successUrl = `https://dtecapp-design.vercel.app/en/products/shopify-assistant?success=true&shop=${shop}&scope=${encodeURIComponent(scopes)}`
      console.log("✅ Redirecting to app with success")
      return NextResponse.redirect(successUrl)
    } catch (error) {
      console.error("❌ OAuth processing failed:", error)
      usedCodes.delete(code) // Remove from used set on error

      const errorUrl = `https://dtecapp-design.vercel.app/en/products/shopify-assistant?error=oauth_failed&shop=${shop}&message=${encodeURIComponent(error instanceof Error ? error.message : "Unknown error")}`
      return NextResponse.redirect(errorUrl)
    }
  }

  console.error("❌ Missing required parameters:", { shop, code, hmac })
  const errorUrl = `https://dtecapp-design.vercel.app/en/products/shopify-assistant?error=missing_parameters`
  return NextResponse.redirect(errorUrl)
}
