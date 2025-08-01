import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
  const host = searchParams.get("host")
  const embedded = searchParams.get("embedded")

  if (!shop) {
    return NextResponse.json({ error: "Missing 'shop'" }, { status: 400 })
  }

  const scopes = "read_products,write_storefront_access_tokens"
  const redirectUri = "https://dtec.app/api/shopify/callback"
  const state = crypto.randomBytes(16).toString("hex")

  // Build the callback URL to return to the same page with iframe context
  const callbackUrl = new URL(redirectUri)
  if (host) callbackUrl.searchParams.set("host", host)
  if (embedded) callbackUrl.searchParams.set("embedded", embedded)

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(callbackUrl.toString())}&state=${state}`

  return NextResponse.redirect(authUrl)
}
