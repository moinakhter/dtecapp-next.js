import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    environment: process.env.NODE_ENV,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
    hasClientId: !!process.env.SHOPIFY_CLIENT_ID,
    hasClientSecret: !!process.env.SHOPIFY_CLIENT_SECRET,
    clientIdLength: process.env.SHOPIFY_CLIENT_ID?.length || 0,
    timestamp: new Date().toISOString(),
  })
}
