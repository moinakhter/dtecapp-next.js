import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")

  console.log("=== SHOPIFY AUTH DEBUG ===")
  console.log("Environment:", process.env.NODE_ENV)
  console.log("Site URL:", SITE_URL)
  console.log("Client ID exists:", !!SHOPIFY_CLIENT_ID)
  console.log("Shop parameter:", shop)
  console.log("Request URL:", req.url)

  if (!shop) {
    return NextResponse.json({ error: "Missing 'shop' query parameter" }, { status: 400 })
  }

  if (!SHOPIFY_CLIENT_ID) {
    console.error("SHOPIFY_CLIENT_ID is not set!")
    return NextResponse.json({ error: "Server configuration error: Missing client ID" }, { status: 500 })
  }

  if (!SITE_URL) {
    console.error("NEXT_PUBLIC_SITE_URL is not set!")
    return NextResponse.json({ error: "Server configuration error: Missing site URL" }, { status: 500 })
  }

  const scopes = "unauthenticated_read_customers,unauthenticated_read_product_listings"
  const redirectUri = `${SITE_URL}/api/shopify/callback`
  const stateParam = crypto.randomBytes(16).toString("hex")

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${stateParam}`

  console.log("Generated auth URL:", authUrl)
  console.log("Redirect URI:", redirectUri)

  return NextResponse.redirect(authUrl)
}
