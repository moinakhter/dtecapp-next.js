import { type NextRequest, NextResponse } from "next/server"

const SHOPIFY_CLIENT_SECRET = "a7e2907c64479d91a2b69425dac98a57"
const SHOPIFY_CLIENT_ID = "9a0b89206045b51e5c07c821e340a610"

async function createStorefrontToken(shop: string, accessToken: string) {
  try {
    console.log("Creating storefront token for shop:", shop)

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

    console.log("Storefront token response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("Storefront token creation failed:", response.status, response.statusText, errorText)
      return { error: `Failed to create storefront token: ${response.status} ${response.statusText}` }
    }

    const data = await response.json()
    console.log("Storefront token data:", data)

    if (data.storefront_access_token) {
      return {
        storefrontAccessToken: {
          accessToken: data.storefront_access_token.access_token,
        },
      }
    }

    return { error: "Failed to create storefront token - no token in response" }
  } catch (error) {
    console.error("Storefront token creation error:", error)
    return { error: "Failed to create storefront token - network error" }
  }
}

async function createStorefrontToken2(shop: string, accessToken: string) {
  const query = `
    mutation storefrontAccessTokenCreate($input: StorefrontAccessTokenInput!) {
      storefrontAccessTokenCreate(input: $input) {
        storefrontAccessToken {
          id
          accessToken
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      title: 'JavaScript Storefront Token',
    },
  };

  try {
    const response = await fetch(`https://${shop}/admin/api/2023-10/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    console.log("222 Storefront token response status:", response.status)
    const json = await response.json();
    console.log(" 222 Storefront token data:", json)

    if (!json.data || json.data.storefrontAccessTokenCreate == null) {
      return { error: '22 Unknown error', details: json };
    }

    return json.data.storefrontAccessTokenCreate;
  } catch (error) {
    return { error: error };
  }
}


export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const shop = searchParams.get("shop")
  const code = searchParams.get("code")
  const hmac = searchParams.get("hmac")
  const embedded = searchParams.get("embedded") ?? undefined
  const host = searchParams.get("host")

  if (!code && shop) {
    console.log("No code found, redirecting to auth route")
    const redirect = new URL("/api/shopify/auth", process.env.NEXT_PUBLIC_SITE_URL)
    redirect.searchParams.set("shop", shop)
    if (host) redirect.searchParams.set("host", host)
    if (embedded) redirect.searchParams.set("embedded", embedded)

    return NextResponse.json({
      redirect_url: redirect.toString(),
      status: false,
    })
  }

  if (!shop || !code || !hmac) {
    console.error("Missing required parameters:", {
      shop: !!shop,
      code: !!code,
      hmac: !!hmac,
    })
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
  }

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
 

    console.log("✅ Successfully obtained access token for shop:", shop)
    console.log("Granted scopes:", scopes)

 
    const storefrontTokenData = await createStorefrontToken(shop, accessToken)
    const createStorefrontTokenD = await createStorefrontToken2(shop, accessToken)

    return NextResponse.json({
      status: true,
      shop,
      host,
      access_token: accessToken,
      scope: scopes,
      storefront_access_token: storefrontTokenData,
      createStorefrontToken2: createStorefrontTokenD,
    })
  } catch (error) {
    console.error("Token exchange failed:", error)
    return NextResponse.json(
      {
        error: "Token exchange failed",
        debug: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
