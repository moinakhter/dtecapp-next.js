import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, storeUrl, companyName, email, password } = await request.json();

    // Check if user exists
    const [user] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length > 0) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    await db.query(
      'INSERT INTO users (first_name, last_name, store_url, company_name, email, password_hash) VALUES (?, ?, ?, ?, ?, ?)',
      [firstName, lastName, storeUrl, companyName, email, hashedPassword]
    );

    return new Response(JSON.stringify({ message: 'Registration successful' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
