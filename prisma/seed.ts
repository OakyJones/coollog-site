import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // ─── Owner ───
  const owner = await prisma.owner.create({
    data: {
      name: "Salling Group A/S",
      cvr: "26714708",
      email: "drift@sallinggroup.com",
      phone: "+45 87 30 30 00",
    },
  });

  const owner2 = await prisma.owner.create({
    data: {
      name: "Region Hovedstaden",
      cvr: "29190623",
      email: "teknisk@regionh.dk",
    },
  });

  // ─── Companies ───
  const kp = await prisma.company.create({
    data: {
      name: "KølePartner ApS",
      cvr: "12345678",
      branchCode: "432200",
      branchText: "VVS- og blikkenslagerforretninger",
      domain: "journal.kolepartner.dk",
      color: "#028090",
      status: "approved",
      approvedAt: new Date(),
    },
  });

  const nk = await prisma.company.create({
    data: {
      name: "Nordisk Køl A/S",
      cvr: "87654321",
      branchCode: "432200",
      branchText: "VVS- og blikkenslagerforretninger",
      domain: "journal.nordiskkol.dk",
      color: "#2563EB",
      status: "approved",
      approvedAt: new Date(),
    },
  });

  // ─── Users ───
  const jonas = await prisma.user.create({
    data: {
      email: "jonas@kolepartner.dk",
      name: "Jonas Kjær",
      phone: "+45 20 12 34 56",
      role: "admin",
      companyId: kp.id,
    },
  });

  const jonasReal = await prisma.user.create({
    data: {
      email: "jonas@kjaerfam.dk",
      name: "Jonas Kjær",
      role: "superadmin",
    },
  });

  const mikkel = await prisma.user.create({
    data: {
      email: "mikkel@kolepartner.dk",
      name: "Mikkel Petersen",
      phone: "+45 20 65 43 21",
      role: "technician",
      companyId: kp.id,
    },
  });

  const anders = await prisma.user.create({
    data: {
      email: "anders@nordiskkol.dk",
      name: "Anders Nielsen",
      role: "technician",
      companyId: nk.id,
    },
  });

  const ownerUser = await prisma.user.create({
    data: {
      email: "drift@sallinggroup.com",
      name: "Lars Salling",
      role: "owner",
    },
  });

  const inspectorUser = await prisma.user.create({
    data: {
      email: "tilsyn@at.dk",
      name: "Karen Tilsyn",
      role: "inspector",
    },
  });

  // ─── Equipment ───
  const eq1 = await prisma.equipment.create({
    data: {
      qrCode: "KL-4821",
      serial: "CR-30XA-2019-04821",
      manufacturer: "Carrier",
      model: "30XA-452",
      refrigerant: "R410A",
      chargeKg: 12.5,
      pedCategory: "II",
      location: "Netto Østerbro",
      address: "Nordre Frihavnsgade 12, 2100 København Ø",
      ownerId: owner.id,
      installationDate: new Date("2019-06-14"),
      nextInspection: new Date("2026-03-02"),
    },
  });

  const eq2 = await prisma.equipment.create({
    data: {
      qrCode: "KL-7392",
      serial: "DK-AQ500-2020-07392",
      manufacturer: "Daikin",
      model: "AQ500-HT",
      refrigerant: "R134a",
      chargeKg: 8.2,
      pedCategory: "I",
      location: "Bilka Ishøj",
      address: "Ishøj Storcenter 50, 2635 Ishøj",
      ownerId: owner.id,
      installationDate: new Date("2020-03-22"),
      nextInspection: new Date("2026-06-15"),
    },
  });

  const eq3 = await prisma.equipment.create({
    data: {
      qrCode: "KL-1058",
      serial: "BT-ZR380-2018-01058",
      manufacturer: "Bitzer",
      model: "ZR380-TFD",
      refrigerant: "R407C",
      chargeKg: 45.0,
      pedCategory: "III",
      location: "Rigshospitalet, Kølecentral",
      address: "Blegdamsvej 9, 2100 København Ø",
      ownerId: owner2.id,
      installationDate: new Date("2018-01-10"),
      nextInspection: new Date("2026-04-20"),
    },
  });

  const eq4 = await prisma.equipment.create({
    data: {
      qrCode: "KL-5590",
      serial: "CR-30RB-2021-05590",
      manufacturer: "Carrier",
      model: "30RB-252",
      refrigerant: "R32",
      chargeKg: 5.8,
      pedCategory: "I",
      location: "Føtex Nørrebro",
      address: "Nørrebrogade 180, 2200 København N",
      ownerId: owner.id,
      installationDate: new Date("2021-09-05"),
      nextInspection: new Date("2026-09-05"),
    },
  });

  // ─── Equipment-Company links ───
  await prisma.equipmentCompany.createMany({
    data: [
      { equipmentId: eq1.id, companyId: kp.id, active: true },
      { equipmentId: eq2.id, companyId: kp.id, active: true },
      { equipmentId: eq3.id, companyId: kp.id, active: true },
      { equipmentId: eq4.id, companyId: kp.id, active: true },
      {
        equipmentId: eq1.id,
        companyId: nk.id,
        active: false,
        startDate: new Date("2019-06-14"),
        endDate: new Date("2024-06-01"),
      },
    ],
  });

  // ─── Journal Entries ───
  const entries = [
    {
      equipmentId: eq1.id, userId: jonas.id, companyId: kp.id,
      type: "eftersyn",
      notes: "Alt i orden. Kompressor kører fint, ingen lækager fundet.",
      createdAt: new Date("2025-12-02"),
    },
    {
      equipmentId: eq1.id, userId: mikkel.id, companyId: kp.id,
      type: "laekagekontrol",
      notes: "Elektronisk lækagesøgning udført. Ingen lækager detekteret.",
      createdAt: new Date("2025-09-15"),
    },
    {
      equipmentId: eq1.id, userId: jonas.id, companyId: kp.id,
      type: "reparation",
      notes: "Udskiftet ekspansionsventil. Påfyldt 0,8 kg R410A.",
      refrigerantAdded: 0.8,
      createdAt: new Date("2025-06-20"),
    },
    {
      equipmentId: eq1.id, userId: mikkel.id, companyId: kp.id,
      type: "eftersyn",
      notes: "Årligt eftersyn gennemført. Driftspunkt OK. Anbefaler udskiftning af ekspansionsventil inden næste eftersyn.",
      createdAt: new Date("2025-03-10"),
    },
    {
      equipmentId: eq1.id, userId: anders.id, companyId: nk.id,
      type: "laekagekontrol",
      notes: "Lækagekontrol iht. F-gasforordningen. Ingen fund.",
      createdAt: new Date("2024-12-01"),
    },
    {
      equipmentId: eq2.id, userId: mikkel.id, companyId: kp.id,
      type: "eftersyn",
      notes: "Årligt eftersyn. Alle parametre indenfor normalområdet.",
      createdAt: new Date("2025-11-20"),
    },
    {
      equipmentId: eq2.id, userId: jonas.id, companyId: kp.id,
      type: "laekagekontrol",
      notes: "Lækagekontrol gennemført. Ingen lækager.",
      createdAt: new Date("2025-05-08"),
    },
    {
      equipmentId: eq3.id, userId: jonas.id, companyId: kp.id,
      type: "eftersyn",
      notes: "Stort eftersyn på kølecentral. Kompressor 1 & 2 OK. Kondensator rengjort.",
      createdAt: new Date("2025-10-12"),
    },
    {
      equipmentId: eq3.id, userId: mikkel.id, companyId: kp.id,
      type: "reparation",
      notes: "Udskiftet ventilator på kondensator. Påfyldt 2,1 kg R407C.",
      refrigerantAdded: 2.1,
      createdAt: new Date("2025-07-03"),
    },
    {
      equipmentId: eq4.id, userId: mikkel.id, companyId: kp.id,
      type: "ibrugtagning",
      notes: "Anlæg ibrugtaget. Alle parametre kontrolleret og godkendt.",
      createdAt: new Date("2021-09-05"),
    },
  ];

  for (const entry of entries) {
    await prisma.journalEntry.create({ data: entry });
  }

  // ─── Reminders ───
  await prisma.reminder.createMany({
    data: [
      { equipmentId: eq1.id, type: "inspection_due", dueDate: new Date("2026-03-02") },
      { equipmentId: eq3.id, type: "inspection_due", dueDate: new Date("2026-04-20") },
    ],
  });

  console.log("Seed complete!");
  console.log(`  Companies: 2`);
  console.log(`  Users: 5`);
  console.log(`  Equipment: 4`);
  console.log(`  Journal entries: ${entries.length}`);
  console.log(`\n  Test login: jonas@kolepartner.dk (admin)`);
  console.log(`  Test login: mikkel@kolepartner.dk (technician)`);
  console.log(`  Test login: drift@sallinggroup.com (owner)`);
  console.log(`  Test login: tilsyn@at.dk (inspector)`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
