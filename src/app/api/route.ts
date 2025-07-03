import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { firstName, lastName, storeUrl, companyName, email, password } = req.body;
  if (!(firstName && lastName && storeUrl && email && password)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // 1. Save user info to DB/session (optional)
  // 2. Initialize Shopify OAuth
  const shop = new URL(storeUrl).host;
  const state = Date.now().toString(); // generate & store properly
  const installUrl = `https://${shop}/admin/oauth/authorize?client_id=${process.env.SHOPIFY_API_KEY}&scope=read_products,write_orders&state=${state}&redirect_uri=${process.env.HOST}/api/shopify/callback`;

  // Store form + state in session/db for callback
  // ...

  res.status(200).json({ installUrl });
}
