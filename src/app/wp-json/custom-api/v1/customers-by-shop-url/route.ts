// src/app/wp-json/custom-api/v1/customers-by-shop-url/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shop_url = searchParams.get('shop_url');

  if (!shop_url) {
    return NextResponse.json({ message: 'Missing shop_url query param' }, { status: 400 });
  }

  try {
    const [results] = await db.query(
      'SELECT * FROM shopify_customers WHERE shop_url = ?',
      [shop_url]
    );

    return NextResponse.json({ data: results }, { status: 200 });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ message: 'Failed to fetch customers' }, { status: 500 });
  }
}
