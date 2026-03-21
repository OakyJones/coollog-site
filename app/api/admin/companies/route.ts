import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "superadmin") {
    return NextResponse.json({ error: "Ikke autoriseret" }, { status: 403 });
  }

  const status = req.nextUrl.searchParams.get("status") || "pending";

  const companies = await prisma.company.findMany({
    where: { status },
    include: {
      users: { select: { id: true, name: true, email: true, phone: true, role: true } },
      _count: { select: { equipment: true, entries: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ companies });
}

export async function PATCH(req: NextRequest) {
  const user = await getSession();
  if (!user || user.role !== "superadmin") {
    return NextResponse.json({ error: "Ikke autoriseret" }, { status: 403 });
  }

  const { companyId, action, rejectedNote } = await req.json();

  if (!companyId || !["approve", "reject"].includes(action)) {
    return NextResponse.json({ error: "companyId og action (approve/reject) påkrævet" }, { status: 400 });
  }

  const company = await prisma.company.update({
    where: { id: companyId },
    data: {
      status: action === "approve" ? "approved" : "rejected",
      approvedAt: action === "approve" ? new Date() : undefined,
      approvedBy: user.id,
      rejectedNote: action === "reject" ? rejectedNote : undefined,
    },
  });

  return NextResponse.json({ success: true, company });
}
