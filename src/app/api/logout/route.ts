import { cookies } from 'next/headers';
 
export async function POST() {
  const cookieStore = await cookies();

  // Clear the cookie
  cookieStore.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0 // Expire the cookie immediately
  });

  return new Response(JSON.stringify({ message: 'Logged out successfully' }), { status: 200 });
}
