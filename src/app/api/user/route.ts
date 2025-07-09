// /app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import path from "path";
import fs from "fs";
import crypto from "crypto";

const HS_SECRET = 'DT_yMVYb0viQLBEBpKtgaCD2h9P9gM7Tf1F';
const privateKeyPath = path.join(process.cwd(), 'keys', 'private.pem');
const privateKeyPem = fs.readFileSync(privateKeyPath, 'utf8');

type DecryptedPayload = {
  user: {
    username: string;
    email: string;
  };
  store: {
    company_name: string;
    store_url: string;
    access_token: string;
    expiry: string;
    is_expired: boolean;
  };
};

function decryptPayload(encryptedBase64: string): DecryptedPayload {
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(encryptedBase64, 'base64')
  );
  return JSON.parse(decrypted.toString("utf8"));
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(HS_SECRET));

    if (!payload.encrypted_data || typeof payload.encrypted_data !== "string") {
      throw new Error("Invalid token payload");
    }

    const data = decryptPayload(payload.encrypted_data);
    const userData = {
      username: data.user.username,
      email: data.user.email,
      company: data.store.company_name,
      storeUrl: data.store.store_url,
      dtecToken: data.store.access_token,
      tokenExpiry: data.store.expiry,
      expired: data.store.is_expired,
    };

    return NextResponse.json(userData);
  } catch (err) {
    console.error("Token decode error", err);
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }
}
