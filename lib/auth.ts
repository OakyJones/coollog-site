import { prisma } from "./prisma";
import { cookies } from "next/headers";
import crypto from "crypto";

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function generateToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function createOtp(userId: string): Promise<string> {
  const code = generateOtp();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  await prisma.otpCode.create({
    data: { code, userId, expiresAt },
  });

  return code;
}

export async function verifyOtp(
  email: string,
  code: string
): Promise<{ token: string; userId: string } | null> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const otp = await prisma.otpCode.findFirst({
    where: {
      userId: user.id,
      code,
      used: false,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp) return null;

  // Mark OTP as used
  await prisma.otpCode.update({
    where: { id: otp.id },
    data: { used: true },
  });

  // Create session
  const token = generateToken();
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  await prisma.session.create({
    data: { token, userId: user.id, expiresAt },
  });

  return { token, userId: user.id };
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session_token")?.value;
  if (!token) return null;

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: { include: { company: true } } },
  });

  if (!session || session.expiresAt < new Date()) return null;

  return session.user;
}
