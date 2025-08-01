import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_ID = "9a0b89206045b51e5c07c821e340a610"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const shop = searchParams.get("shop")

  if (!shop) {
    return NextResponse.json({ error: "Missing 'shop' query parameter" }, { status: 400 })
  }

  // Minimal scopes needed for storefront token creation
  const scopes = "read_products,write_storefront_access_tokens,read_content,read_customers,read_fulfillments,read_orders,read_products,read_script_tags"
  const redirectUri = "https://dtecapp-design.vercel.app/api/shopify/callback"
  const stateParam = crypto.randomBytes(16).toString("hex")

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri,
  )}&state=${stateParam}&grant_options[]=per-user`

  console.log("Redirecting to Shopify OAuth URL:", authUrl)
  return NextResponse.redirect(authUrl)
}
