import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const SHOPIFY_CLIENT_SECRET = process.env.SHOPIFY_CLIENT_SECRET!;
const SHOPIFY_CLIENT_ID = process.env.SHOPIFY_CLIENT_ID!;

function validateHmac(params: URLSearchParams): boolean {
  const hmac = params.get("hmac")!;
  const entries: [string, string][] = [];
  params.forEach((v, k) => {
    if (k !== "hmac" && k !== "signature") entries.push([k, v]);
  });
  const sorted = entries.sort(([a], [b]) => a.localeCompare(b));
  const raw = sorted.map(([k, v]) => `${k}=${v}`).join("&");
  const generated = crypto.createHmac("sha256", SHOPIFY_CLIENT_SECRET).update(raw).digest("hex");
  console.log("Raw payload string:", raw);
  console.log("Generated HMAC:", generated);
  console.log("Received HMAC:", hmac);
  return generated === hmac;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  console.log("Callback query params:", Object.fromEntries(searchParams.entries()));

  const shop = searchParams.get("shop");
  const code = searchParams.get("code");
  const hmac = searchParams.get("hmac");
  const state = searchParams.get("state");
  const timestamp = searchParams.get("timestamp");
  const host = searchParams.get("host");

  if (!shop || !code || !hmac || !state || !timestamp) {
    console.error("Missing required params:", { shop, code, hmac, state, timestamp });
    return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
  }

  const storedState = req.cookies.get("shopify_oauth_state")?.value;
  if (!storedState || storedState !== state) {
    console.error("Invalid state:", { received: state, stored: storedState });
    return NextResponse.json({ error: "Invalid state parameter" }, { status: 403 });
  }

  if (!validateHmac(searchParams)) {
    return NextResponse.json(
      {
        error: "HMAC validation failed",
        debug: {
          received_hmac: hmac,
          all_params: Object.fromEntries(searchParams.entries()),
        },
      },
      { status: 403 },
    );
  }

  console.log("✅ HMAC validated");

  // Exchange code for access token...
  try {
    const tokenRes = await fetch(`https://${shop}/admin/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ client_id: SHOPIFY_CLIENT_ID, client_secret: SHOPIFY_CLIENT_SECRET, code }),
    });
    if (!tokenRes.ok) throw new Error("Token request failed");
    const data = await tokenRes.json();
    if (!data.access_token) throw new Error("No access token returned");

    return NextResponse.json({
      status: true,
      shop,
      access_token: data.access_token,
      scope: data.scope,
      storefront_access_token: data.storefront_access_token || null,
    });
  } catch (err) {
    console.error("Exchange failed", err);
    return NextResponse.json({ error: "Token exchange failed" }, { status: 500 });
  }
}
