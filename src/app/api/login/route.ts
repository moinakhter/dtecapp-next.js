import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';
import { cookies } from 'next/headers';
export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Check if user exists
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const user = rows[0] as {
      id: number;
      email: string;
      password_hash: string;
    };

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    // Create JWT
   const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    // Set the token in httpOnly cookie
    const cookieStore = await cookies();
    cookieStore.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    return new Response(JSON.stringify({ token, message: 'Login successful' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
