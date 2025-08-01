import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_ID = "9a0b89206045b51e5c07c821e340a610";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const shop = searchParams.get("shop");

  if (!shop) {
    return NextResponse.json(
      { error: "Missing 'shop' query parameter" },
      { status: 400 }
    );
  }

  const scopes =
    "unauthenticated_read_customers,unauthenticated_read_product_listings";
const redirectUri = "https://dtec.app/api/shopify/callback";

  const stateParam = crypto.randomBytes(16).toString("hex");

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${stateParam}`;

  return NextResponse.redirect(authUrl);
}