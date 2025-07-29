import { type NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;
const SCOPES = "unauthenticated_write_checkouts,unauthenticated_read_product_listings,unauthenticated_read_customers,unauthenticated_read_checkouts";
const REDIRECT_URI = "https://dtecapp-design.vercel.app/api/shopify/callback";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const shop = searchParams.get("shop");
 


  if (!shop) {
    return NextResponse.json({ error: "Missing shop parameter" }, { status: 400 });
  }

  // Generate secure state
  const stateParam = crypto.randomBytes(16).toString("hex");

  const authUrl = new URL(`https://${shop}/admin/oauth/authorize`);
  authUrl.searchParams.set("client_id", SHOPIFY_CLIENT_ID);
  authUrl.searchParams.set("scope", SCOPES);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("state", stateParam);
 

  // Redirect to Shopify
  const response = NextResponse.redirect(authUrl.toString());

  // Store state in httpOnly cookie for later verification
  response.cookies.set({
    name: "shopify_oauth_state",
    value: stateParam,
    httpOnly: true,
    secure: true,
    path: "/",
  });

  return response;
}
