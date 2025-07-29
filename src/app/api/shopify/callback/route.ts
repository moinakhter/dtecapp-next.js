import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;
 

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");

  if (!shop || !code || !hmac) {
    return NextResponse.json(
      { error: "Missing required query parameters" },
      { status: 400 }
    );
  }

  // Recreate the HMAC message
  const message = Array.from(searchParams.entries())
    .filter(([key]) => key !== "hmac")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const generated = crypto
    .createHmac("sha256", SHOPIFY_CLIENT_SECRET)
    .update(message)
    .digest("hex");

  const hmacIsValid =
    generated.length === hmac.length &&
    crypto.timingSafeEqual(Buffer.from(generated), Buffer.from(hmac));

  if (!hmacIsValid) {
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 403 });
  }

  // Exchange code for access token
  const tokenRes = await fetch(
    `https://${shop}/admin/oauth/access_token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: SHOPIFY_CLIENT_ID,
        client_secret: SHOPIFY_CLIENT_SECRET,
        code,
      }),
    }
  );

  const tokenData = await tokenRes.json();

  if (!tokenData?.access_token) {
    return NextResponse.json({ error: "Failed to get access token" }, { status: 500 });
  }

  // Optional: fetch storefront access token
  const storefrontTokenRes = await fetch(
    `https://${shop}/admin/api/2024-01/storefront_access_tokens.json`,
    {
      method: "POST",
      headers: {
        "X-Shopify-Access-Token": tokenData.access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storefront_access_token: {
          title: "Dtec App Access",
        },
      }),
    }
  );

  const storefrontTokenData = await storefrontTokenRes.json();

  return NextResponse.json({
    success: true,
    storefront_access_token:
      storefrontTokenData.storefront_access_token?.access_token || null,
  });
}
