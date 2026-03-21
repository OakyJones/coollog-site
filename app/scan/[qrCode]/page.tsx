"use client";

import { useState, useEffect } from "react";
import { LogoIcon, Wordmark } from "@/components/Icons";
import { MascotHead } from "@/components/Mascot";
import { useParams, useRouter } from "next/navigation";

interface EquipmentData {
  id: string;
  qrCode: string;
  serial: string;
  manufacturer: string;
  model: string;
  refrigerant: string;
  chargeKg: number;
  pedCategory: string;
  location: string;
  address: string;
  installationDate: string;
  nextInspection: string | null;
  status: string;
  owner: { name: string } | null;
  companies: { company: { name: string }; active: boolean }[];
  entries: { id: string; type: string; createdAt: string }[];
}

export default function ScanPage() {
  const params = useParams();
  const router = useRouter();
  const qrCode = params.qrCode as string;
  const [equipment, setEquipment] = useState<EquipmentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/equipment/${qrCode}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setEquipment(data.equipment);
      })
      .catch(() => setError("Kunne ikke hente anlægsdata"))
      .finally(() => setLoading(false));
  }, [qrCode]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ice to-white flex items-center justify-center">
        <div className="text-center">
          <MascotHead className="w-16 h-16 mx-auto mb-4 animate-pulse" />
          <p className="text-navy-400 text-sm">Finder anlæg...</p>
        </div>
      </div>
    );
  }

  if (error || !equipment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ice to-white flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <MascotHead className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h1 className="text-xl font-bold text-navy mb-2">Anlæg ikke fundet</h1>
          <p className="text-sm text-navy-400 mb-6">
            QR-koden &quot;{qrCode}&quot; matcher ikke et registreret anlæg.
          </p>
          <a href="/" className="text-teal text-sm hover:underline">
            ← Til forsiden
          </a>
        </div>
      </div>
    );
  }

  const isOverdue =
    equipment.nextInspection &&
    new Date(equipment.nextInspection) < new Date();
  const activeCompany = equipment.companies.find((c) => c.active);

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <Wordmark className="text-base" />
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div>
          <h2 className="text-xl font-extrabold text-navy mb-1">Anlæg fundet</h2>
          <p className="text-sm text-navy-400">
            QR-kode matchet til serienummer
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 overflow-hidden">
          <div className="bg-teal/5 px-5 py-4 border-b border-navy-50/40">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-bold text-navy">{equipment.qrCode}</p>
                <p className="text-xs text-navy-400 font-mono">{equipment.serial}</p>
              </div>
              <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-full">
                PED Kat. {equipment.pedCategory}
              </span>
            </div>
          </div>

          <div className="px-5 py-4 space-y-3">
            {[
              ["Fabrikant", `${equipment.manufacturer} ${equipment.model}`],
              ["Kølemiddel", `${equipment.refrigerant} · ${equipment.chargeKg} kg`],
              ["Placering", `${equipment.location}${equipment.address ? `, ${equipment.address}` : ""}`],
              ["Ejer", equipment.owner?.name || "—"],
              ["Kølefirma", activeCompany?.company.name || "—"],
              ["Installeret", new Date(equipment.installationDate).toLocaleDateString("da-DK")],
              ["Journalposter", `${equipment.entries.length} poster`],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-start gap-4">
                <span className="text-xs text-navy-300 flex-shrink-0 min-w-[90px]">{label}</span>
                <span className="text-sm text-navy text-right">{value}</span>
              </div>
            ))}
          </div>

          {isOverdue && (
            <div className="mx-5 mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
              <div className="flex items-center gap-2">
                <span className="text-amber-500 text-sm">⚠️</span>
                <div>
                  <p className="text-xs font-semibold text-amber-700">Næste eftersyn forfaldent</p>
                  <p className="text-[11px] text-amber-600">
                    Planlagt: {new Date(equipment.nextInspection!).toLocaleDateString("da-DK")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => router.push(`/login?equipment=${equipment.id}&qr=${qrCode}`)}
          className="w-full py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal-600 transition-colors shadow-lg shadow-teal/25"
        >
          Log ind for at se journal
        </button>

        <p className="text-center text-[11px] text-navy-300">
          Login kræves for at se historik og logge eftersyn
        </p>
      </div>
    </div>
  );
}
