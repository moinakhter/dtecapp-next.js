// src/app/wp-json/custom-api/v1/add-customer/route.ts
import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Body = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  shop_url: string;
  phone: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body;
 ;

    const { id, email, first_name, last_name, shop_url, phone } = body;

    if (!email || !shop_url) {
      return NextResponse.json({ message: 'Email and Shop URL are required' }, { status: 400 });
    }

    const [rows] = await db.query(
      'SELECT COUNT(*) AS count FROM shopify_customers WHERE email = ? OR shop_url = ?',
      [email, shop_url]
    ) as unknown as [{ count: number }];

 

    if (rows.count > 0) {
      return NextResponse.json({ message: 'Email or Shop URL already exists' }, { status: 200 });
    }

    await db.query(
      `INSERT INTO shopify_customers
        (customer_id, email, first_name, last_name, shop_url, phone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, email, first_name, last_name, shop_url, phone]
    );

    return NextResponse.json({ message: 'Customer added successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /add-customer error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
