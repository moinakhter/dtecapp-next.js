import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");
  const state = searchParams.get("state");
  const host = searchParams.get("host");
 

  console.log("Auth route called with:", {
    shop,
    code: !!code,
    hmac: !!hmac,
    state,
    host,
  });

  console.log(code, shop);
  // If no code, this is the initial OAuth request - redirect to Shopify
  if (!code && shop) {
    console.log("No code found, redirecting to Shopify OAuth");
    const scopes =
      "unauthenticated_read_customers,unauthenticated_read_product_listings";

    // Use the API route as redirect URI
    const redirectUri = "https://dtecapp-design.vercel.app/api/shopify/auth";
 

    const stateParam = crypto.randomBytes(16).toString("hex");

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${stateParam}`;

    console.log("Redirecting to Shopify OAuth URL:", authUrl);

    // This should be a redirect, not JSON response
    return NextResponse.redirect(authUrl);
  }



  console.error("Missing required parameters:", { shop, code });
  return NextResponse.json(
    { error: "Missing required parameters" },
    { status: 400 }
  );
}
