import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")
 

  if (!shop) {
    return NextResponse.json({ error: "Missing 'shop'" }, { status: 400 })
  }

  // Updated scopes to include storefront token creation
  const scopes = "read_products,write_storefront_access_tokens"
  const redirectUri = "https://dtec.app/api/shopify/callback"
  const state = crypto.randomBytes(16).toString("hex")

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&state=${state}`

  return NextResponse.redirect(authUrl)
}
