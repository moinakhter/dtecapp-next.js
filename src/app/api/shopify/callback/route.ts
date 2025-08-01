// /api/shopify/callback/route.ts
import { type NextRequest, NextResponse } from "next/server";

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;
const SHOPIFY_CLIENT_ID = "9a0b89206045b51e5c07c821e340a610";

async function createStorefrontToken(shop: string, accessToken: string) {
  try {
    const response = await fetch(
      `https://${shop}/admin/api/2024-01/storefront_access_tokens.json`,
      {
        method: "POST",
        headers: {
          "X-Shopify-Access-Token": accessToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storefront_access_token: {
            title: "Dtec App Access",
          },
        }),
      }
    );

    if (!response.ok) return { error: "Failed to create storefront token" };

    const data = await response.json();
    if (data.storefront_access_token) {
      return {
        storefrontAccessToken: {
          accessToken: data.storefront_access_token.access_token,
        },
      };
    }

    return { error: "Missing token in response" };
  } catch {
    return { error: "Token creation error" };
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");

  if (!shop || !code) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  try {
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
    const accessToken = tokenData?.access_token;
    if (!accessToken) throw new Error("No token returned");

    const storefrontTokenData = await createStorefrontToken(shop, accessToken);

    return NextResponse.json({
      status: true,
      storefront_access_token: {
        storefrontAccessToken: storefrontTokenData?.storefrontAccessToken || {},
      },
    });
  } catch {
    return NextResponse.json({ error: "OAuth failed" }, { status: 500 });
  }
}
