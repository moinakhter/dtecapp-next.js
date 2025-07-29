import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!

function validateHmac(rawQuery: string, secret: string): boolean {
  const query = new URLSearchParams(rawQuery);
  const hmac = query.get("hmac");
  if (!hmac) return false;

  // Remove hmac and signature
  const filteredParams = new URLSearchParams();
  for (const [key, value] of query.entries()) {
    if (key !== "hmac" && key !== "signature") {
      filteredParams.append(key, value);
    }
  }

  // Sort the filtered parameters
  const sortedParams = Array.from(filteredParams.entries()).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  // Rebuild query string as Shopify expects
  const message = sortedParams.map(([key, value]) => `${key}=${value}`).join("&");

  // Generate HMAC
  const generatedHmac = crypto
    .createHmac("sha256", secret)
    .update(message)
    .digest("hex");

  const isValid = generatedHmac === hmac;

  console.log("🔒 Raw query string:", rawQuery);
  console.log("🔄 Reconstructed message:", message);
  console.log("✅ HMAC Valid:", isValid);

  return isValid;
}


async function createStorefrontToken(shop: string, accessToken: string) {
  try {
    const response = await fetch(`https://${shop}/admin/api/2024-01/storefront_access_tokens.json`, {
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
    })

    if (!response.ok) {
      console.error("Storefront token creation failed:", response.status, response.statusText)
      return { error: "Failed to create storefront token" }
    }

    const data = await response.json()

    if (data.storefront_access_token) {
      return {
        storefrontAccessToken: {
          accessToken: data.storefront_access_token.access_token,
        },
      }
    }

    return { error: "Failed to create storefront token" }
  } catch (error) {
    console.error("Storefront token creation error:", error)
    return { error: "Failed to create storefront token" }
  }
}

export async function GET(req: NextRequest) {
 
  const rawQuery = req.nextUrl.search; 
  const cleanQuery = rawQuery.startsWith("?") ? rawQuery.slice(1) : rawQuery;

  const searchParams = req.nextUrl.searchParams;
  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");

  if (!shop || !code || !hmac) {
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const isValid = validateHmac(cleanQuery, SHOPIFY_CLIENT_SECRET);
  if (!isValid) {
    return NextResponse.json({ error: "HMAC validation failed" }, { status: 403 });
  }


  console.log("HMAC validation successful!")

  // Exchange code for access token
  try {
    console.log("Exchanging code for access token...")
    const tokenResponse = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: SHOPIFY_CLIENT_ID,
        client_secret: SHOPIFY_CLIENT_SECRET,
        code,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      console.error("Token request failed:", tokenResponse.status, tokenResponse.statusText, errorText)
      return NextResponse.json({ error: "Token request failed" }, { status: 500 })
    }

    const tokenData = await tokenResponse.json()
    console.log("Token response:", tokenData)

    if (!tokenData?.access_token) {
      console.error("No access token in response:", tokenData)
      return NextResponse.json({ error: "No access token returned" }, { status: 500 })
    }

    const accessToken = tokenData.access_token
    const scopes = tokenData.scope

    console.log("Successfully obtained access token for shop:", shop)

    // Create storefront access token
    const storefrontTokenData = await createStorefrontToken(shop, accessToken)

    return NextResponse.json({
      status: true,
      shop,
      access_token: accessToken,
      scope: scopes,
      storefront_access_token: storefrontTokenData,
    })
  } catch (error) {
    console.error("Token exchange failed:", error)
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 })
  }
}