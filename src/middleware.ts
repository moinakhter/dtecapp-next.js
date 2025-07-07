import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { jwtVerify } from 'jose';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  // Step 1: Middleware handles i18n redirect/rewrite
  const intlResp = await intlMiddleware(req);
  if (!intlResp.ok) return intlResp;

  // Step 2: After locale is settled, protect /dashboard
  const { pathname } = req.nextUrl;
  if (pathname.startsWith(`/${req.nextUrl.locale}/dashboard`)) {
    const token = req.cookies.get('auth_token')?.value;
    if (!token) {
      return NextResponse.redirect(new URL(`/${req.nextUrl.locale}/products/shopify-assistant/signin`, req.url));
    }
    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    } catch {
      return NextResponse.redirect(new URL(`/${req.nextUrl.locale}/products/shopify-assistant/signin`, req.url));
    }
  }

  return intlResp;
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',  
  ]
};
