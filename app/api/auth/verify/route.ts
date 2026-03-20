import { NextRequest, NextResponse } from "next/server";
import { verifyOtp } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email, code } = await req.json();

  if (!email || !code) {
    return NextResponse.json({ error: "Email og kode kræves" }, { status: 400 });
  }

  const result = await verifyOtp(email, code);
  if (!result) {
    return NextResponse.json({ error: "Ugyldig eller udløbet kode" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true, userId: result.userId });
  response.cookies.set("session_token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 24 * 60 * 60, // 24h
    path: "/",
  });

  return response;
}
