import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;

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
  const redirectUri = "https://dtecapp-design.vercel.app/api/shopify/callback";
  const stateParam = crypto.randomBytes(16).toString("hex");

  const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${stateParam}`;

  console.log("Redirecting to Shopify OAuth URL:", authUrl);

  return NextResponse.redirect(authUrl);
}
