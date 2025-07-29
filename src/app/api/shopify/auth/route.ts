// /api/shopify/auth.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;
const SHOPIFY_SCOPES = "unauthenticated_write_checkouts,unauthenticated_read_product_listings,unauthenticated_read_customers,unauthenticated_read_checkouts";
const REDIRECT_URI = "https://dtecapp-design.vercel.app/api/shopify/callback";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const shop = searchParams.get("shop");
  const embedded = searchParams.get("embedded");
  
  if (!shop) {
    return NextResponse.json({ error: "Missing shop parameter" }, { status: 400 });
  }

  const state = crypto.randomBytes(16).toString("hex");
  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set("client_id", SHOPIFY_CLIENT_ID);
  authUrl.searchParams.set("scope", SHOPIFY_SCOPES);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("state", state);
  if (embedded) authUrl.searchParams.set("embedded", embedded);

  console.log("Redirecting to Shopify OAuth URL:", authUrl.toString());

  const response = NextResponse.redirect(authUrl.toString());
  response.cookies.set({
    name: "shopify_oauth_state",
    value: state,
    httpOnly: true,
    secure: true,
    path: "/",
  });
  return response;
}
