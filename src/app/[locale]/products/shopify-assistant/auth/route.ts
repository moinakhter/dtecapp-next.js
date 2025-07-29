import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")

  // Get locale from URL path
  const pathname = req.nextUrl.pathname
  const locale = pathname.split("/")[1] || "en" // Default to 'en' if no locale

  console.log("Auth route called with:", { shop, code: !!code, locale })

  // If no code, redirect to OAuth
  if (!code && shop) {
    console.log("No code found, redirecting to OAuth")
    const scopes =
      "unauthenticated_write_checkouts,unauthenticated_read_product_listings,unauthenticated_read_customers,unauthenticated_read_checkouts"
    // Use the same redirect URI as in the callback route
    const redirectUri = encodeURIComponent(
      `https://dtecapp-design.vercel.app/${locale}/products/shopify-assistant/auth`,
    )
    const state = crypto.randomBytes(16).toString("hex")

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${redirectUri}&state=${state}`

    console.log("Redirecting to OAuth URL:", authUrl)
    return NextResponse.redirect(authUrl)
  }

  // If we have a code, redirect back to the main page with the parameters
  if (code && shop) {
    const params = new URLSearchParams()
    for (const [key, value] of searchParams.entries()) {
      params.set(key, value)
    }

    const redirectUrl = `https://dtecapp-design.vercel.app/${locale}/products/shopify-assistant?${params.toString()}`
    console.log("Redirecting back to main page:", redirectUrl)
    return NextResponse.redirect(redirectUrl)
  }

  console.error("Missing parameters in auth route:", { shop, code })
  return NextResponse.json({ error: "Missing parameters" }, { status: 400 })
}
