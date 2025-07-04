import { cookies } from "next/headers";
 
import { db } from "@/lib/db";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  email: string;
}

export async function GET() {
  try {
 
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
    } catch {
      return new Response(JSON.stringify({ error: "Invalid token" }), { status: 401 });
    }

    const [rows] = await db.query<RowDataPacket[]>("SELECT * FROM users WHERE id = ?", [decoded.id]);
    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const user = rows[0];

    return new Response(
      JSON.stringify({
        username: user.first_name + " " + user.last_name,
        email: user.email,
        company: user.company_name,
        storeUrl: user.store_url,
        tokenExpiry: "2025-11-23 15:03:20", // Example expiry, can be dynamic
        expired: false,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
