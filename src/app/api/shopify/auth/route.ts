import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
  const host = searchParams.get("host")
  const embedded = searchParams.get("embedded") || "1"

  if (!shop) {
    return NextResponse.json({ error: "Missing 'shop'" }, { status: 400 })
  }

  // Updated scopes to include storefront access token creation
  const scopes = "read_products,write_storefront_access_tokens"
  const redirectUri = "https://dtec.app/api/shopify/callback"
  const state = crypto.randomBytes(16).toString("hex")

  // Build auth URL with all necessary parameters
  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`)
  authUrl.searchParams.set("client_id", SHOPIFY_CLIENT_ID)
  authUrl.searchParams.set("scope", scopes)
  authUrl.searchParams.set("redirect_uri", redirectUri)
  authUrl.searchParams.set("state", state)

  // Preserve embedded context
  if (host) authUrl.searchParams.set("host", host)
  if (embedded) authUrl.searchParams.set("embedded", embedded)

  return NextResponse.redirect(authUrl.toString())
}
