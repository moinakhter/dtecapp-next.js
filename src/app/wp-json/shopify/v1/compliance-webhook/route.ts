import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const hmacHeader = req.headers.get('x-shopify-hmac-sha256');
  const topic = req.headers.get('x-shopify-topic');

  let rawBody: string;
  try {
    rawBody = await req.text();
  } catch {
    return NextResponse.json({ error: 'Failed to read request body' }, { status: 400 });
  }

  interface ShopifyWebhookPayload {
    shop_id?: number;
    shop_domain?: string;
    customer?: {
      id?: number;
      email?: string;
    };
  }
  let payload: ShopifyWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const shop_id: number | null = payload.shop_id ?? null;
  const shop_domain: string | null = payload.shop_domain ?? null;
  let customer_id: number | null = payload.customer?.id ?? null;
  let customer_email: string | null = payload.customer?.email ?? null;

  let webhook_type: string;

  switch (topic) {
    case 'customers/data_request':
      webhook_type = 'customers_data_request';
      break;
    case 'customers/redact':
      webhook_type = 'customers_redact';
      break;
    case 'shop/redact':
      webhook_type = 'shop_redact';
      customer_id = null;
      customer_email = null;
      break;
    default:
      return NextResponse.json({ error: 'Unknown topic' }, { status: 400 });
  }

  
  console.log({
    webhook_type,
    shop_id,
    shop_domain,
    customer_id,
    customer_email,
    hmacHeader,
  });

  return NextResponse.json({ success: 'Webhook processed' }, { status: 200 });
}
