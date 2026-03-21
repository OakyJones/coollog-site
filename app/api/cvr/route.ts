import { NextRequest, NextResponse } from "next/server";

// Branchekoder der indikerer køle/VVS/teknik-firmaer
const APPROVED_BRANCHES = [
  "432200", // VVS- og blikkenslagerforretninger
  "432900", // Anden bygningsinstallationsvirksomhed
  "711210", // Rådgivende ingeniørvirksomhed inden for byggeri og anlægsarbejder
  "711220", // Rådgivende ingeniørvirksomhed inden for produktions- og maskinteknik
  "332000", // Installation af industrimaskiner og -udstyr
  "282500", // Fremstilling af køle- og ventilationsanlæg (undtagen til husholdningsbrug)
  "433900", // Anden bygningsfærdiggørelse
];

export async function GET(req: NextRequest) {
  const cvr = req.nextUrl.searchParams.get("cvr");

  if (!cvr || !/^\d{8}$/.test(cvr)) {
    return NextResponse.json({ error: "Ugyldigt CVR-nummer (8 cifre)" }, { status: 400 });
  }

  try {
    // cvrapi.dk — gratis, ingen API-nøgle
    const res = await fetch(`https://cvrapi.dk/api?search=${cvr}&country=dk`, {
      headers: { "User-Agent": "RefiLog - jonas@kjaerfam.dk" },
    });

    if (!res.ok) {
      // Firma ikke fundet i cvrapi.dk — returner "manual" flag
      // Brugeren kan stadig registrere, men skal udfylde manuelt og afvente godkendelse
      return NextResponse.json({
        cvr,
        name: null,
        notFound: true,
        autoApproved: false,
        message: "CVR ikke fundet automatisk. Udfyld oplysninger manuelt.",
      });
    }

    const data = await res.json();

    const result = {
      cvr: data.vat?.toString(),
      name: data.name,
      address: data.address,
      city: data.city,
      zip: data.zipcode,
      branchCode: data.industrycode?.toString(),
      branchText: data.industrydesc,
      phone: data.phone,
      email: data.email,
      notFound: false,
      autoApproved: APPROVED_BRANCHES.includes(data.industrycode?.toString()),
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("CVR lookup error:", error);
    // Ved netværksfejl: tillad manuel registrering
    return NextResponse.json({
      cvr,
      name: null,
      notFound: true,
      autoApproved: false,
      message: "CVR-opslag fejlede. Udfyld oplysninger manuelt.",
    });
  }
}
