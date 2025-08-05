import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID ?? "9a0b89206045b51e5c07c821e340a610"
const REDIRECT_URI = process.env.NEXT_PUBLIC_SITE_URL + "/api/shopify/callback"
// const REDIRECT_URI = process.env.NEXT_PUBLIC_SITE_URL + "/api/shopify/callback"
// https://dtecapp-next-js.vercel.app/products/shopify-assistant
const SCOPES = [
 "unauthenticated_write_checkouts",
"unauthenticated_read_product_listings",
"unauthenticated_read_customers",
"unauthenticated_read_checkouts",
].join(",")

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
  // const host = searchParams.get("host")
  // const embedded = searchParams.get("embedded")

  if (!shop) {
    return NextResponse.json({ error: "Missing 'shop' query parameter" }, { status: 400 })
  }

  const state = crypto.randomBytes(16).toString("hex")

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`)
  authUrl.searchParams.set("client_id", SHOPIFY_CLIENT_ID)
  authUrl.searchParams.set("scope", SCOPES)
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI)
  authUrl.searchParams.set("state", state)
  authUrl.searchParams.append("grant_options[]", "per-user")
  // if (host) authUrl.searchParams.set("host", host)
  // if (embedded) authUrl.searchParams.set("embedded", embedded)

  console.log("🔁 Redirecting to Shopify OAuth:", authUrl.toString())

  return NextResponse.redirect(authUrl.toString())
}
