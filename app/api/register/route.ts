import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Branchekoder der auto-godkendes
const AUTO_APPROVE_BRANCHES = [
  "432200", "432900", "711210", "711220", "332000", "282500", "433900",
];

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cvr, companyName, branchCode, branchText, contactName, contactEmail, contactPhone } = body;

  // Validering
  if (!cvr || !companyName || !contactName || !contactEmail) {
    return NextResponse.json(
      { error: "CVR, firmanavn, kontaktnavn og email er påkrævet" },
      { status: 400 }
    );
  }

  if (!/^\d{8}$/.test(cvr)) {
    return NextResponse.json({ error: "Ugyldigt CVR-nummer" }, { status: 400 });
  }

  if (!contactEmail.includes("@")) {
    return NextResponse.json({ error: "Ugyldig email" }, { status: 400 });
  }

  // Tjek om CVR allerede er registreret
  const existing = await prisma.company.findUnique({ where: { cvr } });
  if (existing) {
    if (existing.status === "rejected") {
      return NextResponse.json(
        { error: "Dette CVR-nummer er blevet afvist. Kontakt support." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Dette CVR-nummer er allerede registreret" },
      { status: 409 }
    );
  }

  // Tjek om email allerede er i brug
  const existingUser = await prisma.user.findUnique({ where: { email: contactEmail } });
  if (existingUser) {
    return NextResponse.json(
      { error: "Denne email er allerede registreret" },
      { status: 409 }
    );
  }

  // Auto-godkend hvis branchekoden matcher
  const autoApproved = AUTO_APPROVE_BRANCHES.includes(branchCode);

  // Opret firma
  const company = await prisma.company.create({
    data: {
      name: companyName,
      cvr,
      branchCode,
      branchText,
      status: autoApproved ? "approved" : "pending",
      approvedAt: autoApproved ? new Date() : undefined,
    },
  });

  // Opret admin-bruger
  const user = await prisma.user.create({
    data: {
      email: contactEmail,
      name: contactName,
      phone: contactPhone || undefined,
      role: "admin",
      companyId: company.id,
    },
  });

  return NextResponse.json({
    success: true,
    companyId: company.id,
    status: company.status,
    autoApproved,
    message: autoApproved
      ? "Dit firma er godkendt! Du kan nu logge ind."
      : "Din registrering er modtaget og afventer godkendelse. Du får besked på email.",
  });
}
