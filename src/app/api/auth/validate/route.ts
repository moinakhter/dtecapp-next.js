// Example: /api/auth/validate

import { cookies } from 'next/headers';
 
import { jwtVerify } from 'jose';

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return new Response(JSON.stringify({ authenticated: false }), { status: 200 });
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    return new Response(JSON.stringify({ authenticated: true }), { status: 200 });
  } catch {
    return new Response(JSON.stringify({ authenticated: false }), { status: 200 });
  }
}
