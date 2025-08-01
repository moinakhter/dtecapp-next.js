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
  // Use the exact whitelisted redirect URI without query parameters
  const redirectUri = "https://dtec.app/api/shopify/callback"
  const state = crypto.randomBytes(16).toString("hex")

  // Store the iframe context in the state parameter instead
  const stateData = {
    random: state,
    host: host,
    embedded: embedded,
  }
  const encodedState = Buffer.from(JSON.stringify(stateData)).toString("base64")

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${encodedState}`

  return NextResponse.redirect(authUrl)
}
