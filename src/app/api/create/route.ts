// File: /app/api/shopify/register/route.ts

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storeUrl } = body;

    if (!storeUrl) {
      return NextResponse.json({ error: "Missing Store URL" }, { status: 400 });
    }

    const shop = new URL(storeUrl).host;
    const state = Date.now().toString();  

    const installUrl = `https://${shop}/admin/oauth/authorize` +
      `?client_id=${process.env.SHOPIFY_API_KEY}` +
      `&scope=read_products,write_products` +
      `&redirect_uri=${process.env.SHOPIFY_CALLBACK_URL}` +
      `&state=${state}`;

    return NextResponse.json({ installUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
