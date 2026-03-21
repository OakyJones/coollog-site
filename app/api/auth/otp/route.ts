import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOtp } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Ugyldig email" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: "Bruger ikke fundet" }, { status: 404 });
  }

  const code = await createOtp(user.id);

  // In production: send via email. For MVP: log it and return success
  console.log(`[OTP] ${email}: ${code}`);

  return NextResponse.json({
    success: true,
    message: "OTP sendt til din email",
    // MVP: return code until email service is configured (remove when SMTP is set up!)
    _dev_code: code,
  });
}
