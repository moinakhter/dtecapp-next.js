import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const HS_SECRET = process.env.HS_SECRET;

import path from "path";

import crypto from "crypto";
import fs from "fs";



function decryptPayload(encryptedBase64: string): unknown {
  const privateKeyPath = path.join(process.cwd(), "keys", "private.pem");
const privateKeyPem = fs.readFileSync(privateKeyPath, "utf8");
  const encryptedBuffer = Buffer.from(encryptedBase64, "base64");

  const decryptedBuffer = crypto.privateDecrypt(
    {
      key: privateKeyPem,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    encryptedBuffer
  );
 

  const decryptedJson = decryptedBuffer.toString("utf8");
  return JSON.parse(decryptedJson);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const apiRes = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Test-Request": "true",
      },
      body: JSON.stringify({
        username: body.email,
        password: body.password,
        is_web: true,
      }),
    });

    const resJson = await apiRes.json();

    if (resJson.token) {
      try {
        const { payload } = await jwtVerify(
          resJson.token,
          new TextEncoder().encode(HS_SECRET)
        );

        if (typeof payload.encrypted_data !== "string") {
          throw new Error("Invalid encrypted_data type");
        }
        const decryptedData = (await decryptPayload(
          payload.encrypted_data
        )) as {
          user: unknown;
          store: unknown;
          token: string;
          expires_at: string;
        };

        (await cookies()).set("auth_token", resJson.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });

        return NextResponse.json({
          message: "Login successful!",
          data: decryptedData,
          raw_token: resJson.token,
        });
      } catch (err) {
        console.error("Decryption failed:", err);
        return NextResponse.json(
          { error: "Invalid or undecryptable token." },
          { status: 400 }
        );
      }
    }

    if (resJson.errors) {
      return NextResponse.json({ error: resJson.errors }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Unknown login error." },
      { status: 400 }
    );
  } catch (err) {
    console.error("Internal error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
