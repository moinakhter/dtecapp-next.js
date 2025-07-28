import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_SITE_URL}/products/shopify-assistant`;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");

  if (!shop) {
    return NextResponse.json({ error: "Missing shop" }, { status: 400 });
  }

  if (!code) {
    const scopes = [
      "unauthenticated_write_checkouts",
      "unauthenticated_read_product_listings",
      "unauthenticated_read_customers",
      "unauthenticated_read_checkouts",
    ].join(",");

    const state = crypto.randomBytes(16).toString("hex");

    const authUrl = `https://${shop}/admin/oauth/authorize?client_id=${SHOPIFY_CLIENT_ID}&scope=${scopes}&redirect_uri=${encodeURIComponent(
      REDIRECT_URI
    )}&state=${state}`;

    return NextResponse.json({ redirect_url: authUrl, status: false });
  }

  if (!hmac) {
    return NextResponse.json({ error: "Missing HMAC" }, { status: 400 });
  }

  const filtered = Array.from(searchParams.entries())
    .filter(([k]) => k !== "hmac")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("&");

  const decoded = decodeURIComponent(filtered);

  const generatedHmac = crypto
    .createHmac("sha256", SHOPIFY_CLIENT_SECRET)
    .update(decoded)
    .digest("hex");

  if (!crypto.timingSafeEqual(Buffer.from(generatedHmac), Buffer.from(hmac))) {
    return NextResponse.json({ error: "Invalid HMAC" }, { status: 403 });
  }

  // 🔄 Exchange code for token
  const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      client_id: SHOPIFY_CLIENT_ID,
      client_secret: SHOPIFY_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenRes.json();

  if (!tokenData.access_token) {
    return NextResponse.json({ error: "Access token not returned" }, { status: 500 });
  }

  // 🔑 Create Storefront Access Token
  const storefrontTokenRes = await fetch(`https://${shop}/admin/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": tokenData.access_token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        mutation {
          storefrontAccessTokenCreate(input: {
            title: \"DTEC Assistant\"
          }) {
            storefrontAccessToken {
              accessToken
              accessScope
            }
            userErrors {
              field
              message
            }
          }
        }
      `,
    }),
  });

  const storefrontTokenData = await storefrontTokenRes.json();
  const storefrontAccessToken =
    storefrontTokenData?.data?.storefrontAccessTokenCreate?.storefrontAccessToken?.accessToken ?? null;

  return NextResponse.json({
    status: true,
    shop,
    access_token: tokenData.access_token,
    scope: tokenData.scope,
    storefront_access_token: storefrontAccessToken,
  });
}
