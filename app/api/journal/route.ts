import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// POST /api/journal — create a new journal entry
export async function POST(req: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 });
  }

  if (!user.companyId) {
    return NextResponse.json({ error: "Ingen virksomhed tilknyttet" }, { status: 403 });
  }

  const { equipmentId, type, notes, refrigerantAdded, photoUrl } = await req.json();

  if (!equipmentId || !type || !notes) {
    return NextResponse.json(
      { error: "equipmentId, type og notes er påkrævet" },
      { status: 400 }
    );
  }

  // Verify equipment exists
  const equipment = await prisma.equipment.findUnique({
    where: { id: equipmentId },
  });

  if (!equipment) {
    return NextResponse.json({ error: "Anlæg ikke fundet" }, { status: 404 });
  }

  const entry = await prisma.journalEntry.create({
    data: {
      equipmentId,
      userId: user.id,
      companyId: user.companyId,
      type,
      notes,
      refrigerantAdded: refrigerantAdded ? parseFloat(refrigerantAdded) : null,
      photoUrl,
    },
    include: { user: true, company: true },
  });

  // Update nextInspection if this was an eftersyn
  if (type === "eftersyn") {
    const nextDate = new Date();
    nextDate.setFullYear(nextDate.getFullYear() + 1);
    await prisma.equipment.update({
      where: { id: equipmentId },
      data: { nextInspection: nextDate },
    });
  }

  return NextResponse.json({ entry }, { status: 201 });
}
