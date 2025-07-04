import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';
import AES from 'crypto-js/aes';
 

 
function generateDtecToken(userId: number) {
  const payload = {
    id: userId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days from now
  };

  const encrypted = AES.encrypt(JSON.stringify(payload), process.env.DTEC_TOKEN_SECRET!).toString();
  return encrypted;
}

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, storeUrl, companyName, email, password } = await request.json();

  
    const [user] = await db.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length > 0) {
      return new Response(JSON.stringify({ error: 'Email already registered' }), { status: 400 });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

     
    const [result] = await db.query(
      'INSERT INTO users (first_name, last_name, store_url, company_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [firstName, lastName, storeUrl, companyName, email, hashedPassword, 'shopify']
    );

    const userId = (result as {
      insertId: number;
    }).insertId;

     
    const dtecToken = generateDtecToken(userId);

 
    await db.query(
      'UPDATE users SET dtec_token = ? WHERE id = ?',
      [dtecToken, userId]
    );

    return new Response(JSON.stringify({ message: 'Registration successful', dtecToken }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
