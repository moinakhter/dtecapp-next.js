import { type NextRequest, NextResponse } from "next/server";

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/api/shopify/callback`;

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get("shop");
  const host = searchParams.get("host");
  const embedded = searchParams.get("embedded");

  if (!shop) {
    return NextResponse.json(
      { error: "Missing shop parameter" },
      { status: 400 }
    );
  }

  const scopes =
    "read_products,read_customers,write_storefront_access_tokens";

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set("client_id", SHOPIFY_CLIENT_ID);
  authUrl.searchParams.set("scope", scopes);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("state", crypto.randomUUID());
  if (host) authUrl.searchParams.set("host", host);
  if (embedded) authUrl.searchParams.set("embedded", embedded);

  return NextResponse.redirect(authUrl.toString());
}
