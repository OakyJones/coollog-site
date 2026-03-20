"use client";

import { useState, useEffect } from "react";
import { LogoIcon } from "@/components/Icons";
import { useParams, useRouter } from "next/navigation";

interface Entry {
  id: string;
  type: string;
  notes: string;
  refrigerantAdded: number | null;
  createdAt: string;
  user: { name: string };
  company: { name: string };
}

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
  nextInspection: string | null;
  owner: { name: string } | null;
  entries: Entry[];
}

const typeColors: Record<string, string> = {
  eftersyn: "teal",
  laekagekontrol: "mint",
  reparation: "navy",
  sikkerhedsventil: "navy",
  ibrugtagning: "teal",
};

const typeLabels: Record<string, string> = {
  eftersyn: "Eftersyn",
  laekagekontrol: "Lækagekontrol",
  reparation: "Reparation",
  sikkerhedsventil: "Sikkerhedsventil",
  ibrugtagning: "Ibrugtagning",
};

export default function JournalPage() {
  const params = useParams();
  const router = useRouter();
  const equipmentId = params.equipmentId as string;

  const [equipment, setEquipment] = useState<EquipmentData | null>(null);
  const [user, setUser] = useState<{ name: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`/api/equipment/${equipmentId}`).then((r) => r.json()),
      fetch("/api/auth/session").then((r) => r.json()),
    ])
      .then(([eqData, sessionData]) => {
        if (eqData.equipment) setEquipment(eqData.equipment);
        if (sessionData.authenticated) setUser(sessionData.user);
        else router.push(`/login?equipment=${equipmentId}`);
      })
      .finally(() => setLoading(false));
  }, [equipmentId, router]);

  if (loading || !equipment) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ice to-white flex items-center justify-center">
        <p className="text-navy-400 text-sm animate-pulse">Indlæser journal...</p>
      </div>
    );
  }

  const isOverdue =
    equipment.nextInspection && new Date(equipment.nextInspection) < new Date();

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/dashboard" className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <span className="text-base font-bold text-navy">RefiLog</span>
          </a>
          {user && (
            <span className="text-xs text-navy-300">{user.name}</span>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        {/* Equipment header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-navy">{equipment.qrCode}</h2>
            <p className="text-xs text-navy-400">
              {equipment.manufacturer} {equipment.model} · {equipment.refrigerant}
            </p>
          </div>
          <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-full">
            PED {equipment.pedCategory}
          </span>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 border border-navy-50/40 text-center">
            <p className="text-lg font-bold text-teal">{equipment.entries.length}</p>
            <p className="text-[10px] text-navy-400">Journalposter</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-navy-50/40 text-center">
            <p className="text-lg font-bold text-navy">{equipment.chargeKg} kg</p>
            <p className="text-[10px] text-navy-400">{equipment.refrigerant}</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-navy-50/40 text-center">
            <p className={`text-lg font-bold ${isOverdue ? "text-amber-500" : "text-teal"}`}>
              {isOverdue ? "!" : "✓"}
            </p>
            <p className="text-[10px] text-navy-400">
              {isOverdue ? "Forfaldent" : "OK"}
            </p>
          </div>
        </div>

        {isOverdue && (
          <div className="px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
            <div className="flex items-center gap-2">
              <span className="text-amber-500 text-sm">⚠️</span>
              <div>
                <p className="text-xs font-semibold text-amber-700">Eftersyn forfaldent</p>
                <p className="text-[11px] text-amber-600">
                  Planlagt: {new Date(equipment.nextInspection!).toLocaleDateString("da-DK")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Journal entries */}
        <div>
          <h3 className="text-sm font-bold text-navy mb-3">Historik</h3>
          <div className="space-y-3">
            {equipment.entries.map((entry) => {
              const color = typeColors[entry.type] || "teal";
              return (
                <div
                  key={entry.id}
                  className="bg-white rounded-xl border border-navy-50/40 overflow-hidden"
                >
                  <div
                    className={`px-4 py-3 ${
                      color === "teal"
                        ? "border-l-teal bg-teal/[0.03]"
                        : color === "mint"
                          ? "border-l-mint bg-mint/[0.03]"
                          : "border-l-navy bg-navy/[0.02]"
                    }`}
                    style={{ borderLeftWidth: 3 }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-bold ${
                          color === "teal"
                            ? "text-teal"
                            : color === "mint"
                              ? "text-mint-700"
                              : "text-navy"
                        }`}
                      >
                        {typeLabels[entry.type] || entry.type}
                      </span>
                      <span className="text-[10px] text-navy-300">
                        {new Date(entry.createdAt).toLocaleDateString("da-DK", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <p className="text-[11px] text-navy-400 mb-1">{entry.notes}</p>
                    <div className="flex items-center gap-3 text-[10px] text-navy-300">
                      <span>{entry.user.name}</span>
                      <span>·</span>
                      <span>{entry.company.name}</span>
                      {entry.refrigerantAdded && (
                        <>
                          <span>·</span>
                          <span className="text-teal font-medium">
                            +{entry.refrigerantAdded} kg
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* New entry button — only for technicians/admins */}
        {user && (user.role === "technician" || user.role === "admin") && (
          <button
            onClick={() => router.push(`/journal/${equipmentId}/new`)}
            className="w-full py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal-600 transition-colors shadow-lg shadow-teal/25 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" d="M12 4v16m8-8H4" />
            </svg>
            Ny journalpost
          </button>
        )}
      </div>
    </div>
  );
}
