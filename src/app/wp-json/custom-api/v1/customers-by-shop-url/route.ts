import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import type { RowDataPacket } from 'mysql2/promise';

interface CountResult extends RowDataPacket {
  total: number;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const shop_url = searchParams.get('shop_url');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '10');
  const offset = (page - 1) * limit;

  if (!shop_url) {
    return NextResponse.json({ message: 'Missing shop_url query param' }, { status: 400 });
  }

  try {
    const [results] = await db.query<RowDataPacket[]>(
      'SELECT * FROM shopify_customers WHERE shop_url = ? LIMIT ? OFFSET ?',
      [shop_url, limit, offset]
    );

    const [countRows] = await db.query<CountResult[]>(
      'SELECT COUNT(*) as total FROM shopify_customers WHERE shop_url = ?',
      [shop_url]
    );

    const total = countRows[0]?.total || 0;

    return NextResponse.json({ data: results, total }, { status: 200 });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ message: 'Failed to fetch customers' }, { status: 500 });
  }
}
