import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, shop_url } = body;

    if (!email || !shop_url) {
      return NextResponse.json(
        { message: "Email and Shop URL are required" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      "DELETE FROM shopify_customers WHERE email = ? AND shop_url = ?",
      [email, shop_url]
    ) as unknown as [{ affectedRows: number }];

    return NextResponse.json(
      {
        message: result.affectedRows > 0
          ? "Customer deleted successfully"
          : "Customer not found",
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Delete Error:", err);
    return NextResponse.json(
      { message: "Failed to delete customer" },
      { status: 500 }
    );
  }
}
