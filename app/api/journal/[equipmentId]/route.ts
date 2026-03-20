import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/journal/[equipmentId] — get journal entries for equipment
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ equipmentId: string }> }
) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 });
  }

  const { equipmentId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const type = searchParams.get("type");

  const where: Record<string, unknown> = { equipmentId };
  if (type) where.type = type;

  const [entries, total] = await Promise.all([
    prisma.journalEntry.findMany({
      where,
      include: { user: true, company: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.journalEntry.count({ where }),
  ]);

  return NextResponse.json({
    entries,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  });
}
