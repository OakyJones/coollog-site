import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/equipment/[id] — get single equipment by ID or QR code
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Try finding by qrCode first, then by id
  const equipment = await prisma.equipment.findFirst({
    where: { OR: [{ qrCode: id }, { id }] },
    include: {
      owner: true,
      companies: {
        include: { company: true },
        orderBy: { startDate: "desc" },
      },
      entries: {
        include: { user: true, company: true },
        orderBy: { createdAt: "desc" },
        take: 50,
      },
    },
  });

  if (!equipment) {
    return NextResponse.json({ error: "Anlæg ikke fundet" }, { status: 404 });
  }

  return NextResponse.json({ equipment });
}
