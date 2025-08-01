import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_ID = "9a0b89206045b51e5c07c821e340a610"

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const shop = searchParams.get("shop");

  if (!shop) {
    return NextResponse.json(
      { error: "Missing 'shop' query parameter" },
      { status: 400 }
    );
  }
const scopes = [
  "read_products",
  "write_products",

  "unauthenticated_read_content",
  "unauthenticated_read_customer_tags",
  "unauthenticated_read_product_tags",
  "unauthenticated_read_product_listings",
  "unauthenticated_write_checkouts",
  "unauthenticated_read_checkouts",
  "unauthenticated_write_customers",
  "unauthenticated_read_customers"
].join(",");


  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/shopify/callback`;
  const stateParam = crypto.randomBytes(16).toString("hex");

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${stateParam}`;

  console.log("Redirecting to Shopify OAuth URL:", authUrl);

  return NextResponse.redirect(authUrl);
}