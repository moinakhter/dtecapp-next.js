import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const HS_SECRET = 'DT_yMVYb0viQLBEBpKtgaCD2h9P9gM7Tf1F';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const apiRes = await fetch(`${process.env.API_URL}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Test-Request': 'true' },
      body: JSON.stringify({
        first_name: body.firstName,
        last_name: body.lastName,
        company_name: body.companyName,
        store_url: body.storeUrl,
        username: body.email,
        password: body.password,
        is_web: true,
      }),
    });

    const resJson = await apiRes.json();

  if (resJson.token) {
  return NextResponse.json({ message: 'Registration successful!', token: resJson.token }, { status: 200 });
}


    if (resJson.token) {
      try {
        const { payload } = await jwtVerify(resJson.token, new TextEncoder().encode(HS_SECRET));

        if (payload.status === true) {
          return NextResponse.json({ message: 'Registration successful!' }, { status: 200 });
        }

        return NextResponse.json({ error: payload.message || 'Registration failed.' }, { status: 400 });
      } catch (err) {
        console.error('JWT verify error', err);
        return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 400 });
      }
    }

    if (resJson.errors) {
      return NextResponse.json({ error: resJson.errors }, { status: 400 });
    }

    return NextResponse.json({ error: 'Unknown registration error.' }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
