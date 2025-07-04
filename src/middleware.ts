import createMiddleware from 'next-intl/middleware';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  // Protect only dashboard pages
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth_token')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/products/shopify-assistant/signin', request.url));
    }

    try {
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
      return intlMiddleware(request); // Run next-intl middleware + allow access
    } catch {
      return NextResponse.redirect(new URL('/products/shopify-assistant/signin', request.url));
    }
  }

  // For all other pages, run next-intl middleware without auth check
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/dashboard/:path*', // Only apply middleware to dashboard pages
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)', // Next-intl default matcher
  ],
};
