import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/equipment — list equipment for the user's company
export async function GET(req: NextRequest) {
  const user = await getSession();
  if (!user) {
    return NextResponse.json({ error: "Ikke autoriseret" }, { status: 401 });
  }

  const searchParams = req.nextUrl.searchParams;
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const search = searchParams.get("search") || "";

  const where: Record<string, unknown> = {};

  // If user has a company, filter by that company's equipment
  if (user.companyId && user.role !== "inspector") {
    where.companies = { some: { companyId: user.companyId } };
  }

  if (search) {
    where.OR = [
      { serial: { contains: search } },
      { location: { contains: search } },
      { manufacturer: { contains: search } },
    ];
  }

  const [equipment, total] = await Promise.all([
    prisma.equipment.findMany({
      where,
      include: {
        owner: true,
        companies: { include: { company: true }, where: { active: true } },
        _count: { select: { entries: true } },
      },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.equipment.count({ where }),
  ]);

  return NextResponse.json({
    equipment,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
    },
  });
}
