import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_API_KEY = process.env.SHOPIFY_CLIENT_ID!;
const SHOPIFY_API_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/products/shopify-assistant`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const shop = searchParams.get("shop");
  const hmac = searchParams.get("hmac");
  const code = searchParams.get("code");

  if (!shop || !hmac) {
    return NextResponse.json({ error: "Missing required query params" }, { status: 400 });
  }

 
  const sortedParams = [...searchParams.entries()]
    .filter(([key]) => key !== "hmac")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, val]) => `${key}=${val}`)
    .join("&");

  const hash = crypto
    .createHmac("sha256", SHOPIFY_API_SECRET)
    .update(sortedParams)
    .digest("hex");

  if (
    hash.length !== hmac.length ||
    !crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(hmac))
  ) {
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 403 });
  }

 
  if (!code) {
    const redirect_url = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_API_KEY}&scope=unauthenticated_read_product_listings&redirect_uri=${REDIRECT_URI}&state=teststate`;
    return NextResponse.json({ redirect_url });
  }

  const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: SHOPIFY_API_KEY,
      client_secret: SHOPIFY_API_SECRET,
      code,
    }),
  });

  if (!tokenResponse.ok) {
    return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
  }

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

 
  const sfRes = await fetch(`https://${shop}/admin/api/2024-01/storefront_access_tokens.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": accessToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      storefront_access_token: {
        title: "Dtec Storefront Token",
      },
    }),
  });

  const sfData = await sfRes.json();

  if (!sfRes.ok || !sfData.storefront_access_token?.access_token) {
    return NextResponse.json({
      error: "Could not fetch Storefront Access Token",
    }, { status: 500 });
  }

  const storefrontToken = sfData.storefront_access_token.access_token;

  return NextResponse.json({
    success: true,
    storefront_access_token: storefrontToken,
  });
}
