import { type NextRequest, NextResponse } from "next/server";
const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;
const SHOPIFY_CLIENT_ID = "9a0b89206045b51e5c07c821e340a610";

async function createStorefrontToken(shop: string, accessToken: string) {
  console.log(`[STOREFRONT] Creating Storefront token for shop: ${shop}`);

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

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[STOREFRONT] Failed (${response.status}): ${errorText}`);
      return { error: "Failed to create storefront token" };
    }

    const data = await response.json();
    console.log("[STOREFRONT] Success:", data);

    if (data.storefront_access_token) {
      return {
        storefrontAccessToken: {
          accessToken: data.storefront_access_token.access_token,
        },
      };
    }

    return { error: "Missing token in response" };
  } catch (error) {
    console.error("[STOREFRONT] Exception:", error);
    return { error: "Exception while creating token" };
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");
  const embedded = searchParams.get("embedded") || "1";
  const host = searchParams.get("host");

  console.log("[CALLBACK] Received request with params:", {
    shop,
    code,
    hmac,
    embedded,
    host,
  });

  if (!code && shop) {
    console.warn("[CALLBACK] Missing code param, redirecting to auth...");
    const redirect = new URL(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/shopify/auth`
    );
    redirect.searchParams.set("shop", shop);
    if (host) redirect.searchParams.set("host", host);
    if (embedded) redirect.searchParams.set("embedded", embedded);

    return NextResponse.json({
      redirect_url: redirect.toString(),
      status: false,
    });
  }

  if (!shop || !code || !hmac) {
    console.error("[CALLBACK] Missing required parameters", {
      shop: !!shop,
      code: !!code,
      hmac: !!hmac,
    });
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  try {
    console.log("[CALLBACK] Exchanging code for admin access token...");

    const tokenResponse = await fetch(
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

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error(
        "[CALLBACK] Token exchange failed:",
        tokenResponse.status,
        tokenResponse.statusText,
        errorText
      );
      return NextResponse.json(
        { error: "Token exchange failed" },
        { status: 500 }
      );
    }

    const tokenData = await tokenResponse.json();
    console.log("[CALLBACK] Access token response:", tokenData);

    const accessToken = tokenData.access_token;
    const scopes = tokenData.scope;

    if (!accessToken) {
      console.error("[CALLBACK] No access token in response");
      return NextResponse.json(
        { error: "No access token returned" },
        { status: 500 }
      );
    }

    const storefrontTokenData = await createStorefrontToken(shop, accessToken);

    console.log("[CALLBACK] Returning token to frontend");

    return NextResponse.json({
      status: true,
      shop,
      scope: scopes,
      storefront_access_token: storefrontTokenData,
    });
  } catch (error) {
    console.error("[CALLBACK] Exception during OAuth flow:", error);
    return NextResponse.json(
      { error: "Exception during OAuth" },
      { status: 500 }
    );
  }
}
