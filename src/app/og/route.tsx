// app/og/route.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';  

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get('title') || 'Dtec';
  const locale = searchParams.get('locale') || 'en';

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '1200px',
          height: '630px',
          backgroundColor: '#0A0A0A',
          color: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 60,
          fontWeight: 'bold',
        }}
      >
        {title} – {locale.toUpperCase()}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
