"use client";

import { useState, useEffect } from "react";
import { LogoIcon, Wordmark } from "@/components/Icons";
import { useParams, useRouter } from "next/navigation";

const ENTRY_TYPES = [
  { value: "eftersyn", label: "Eftersyn", icon: "🔍" },
  { value: "laekagekontrol", label: "Lækagekontrol", icon: "💨" },
  { value: "reparation", label: "Reparation", icon: "🔧" },
  { value: "sikkerhedsventil", label: "Sikkerhedsventil", icon: "⚙️" },
  { value: "ibrugtagning", label: "Ibrugtagning", icon: "🚀" },
];

export default function NewEntryPage() {
  const params = useParams();
  const router = useRouter();
  const equipmentId = params.equipmentId as string;

  const [equipment, setEquipment] = useState<{ qrCode: string; manufacturer: string; model: string } | null>(null);
  const [entryType, setEntryType] = useState("");
  const [notes, setNotes] = useState("");
  const [addedKg, setAddedKg] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/equipment/${equipmentId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.equipment) setEquipment(data.equipment);
      });
  }, [equipmentId]);

  const handleSubmit = async () => {
    if (!entryType || !notes) return;
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          equipmentId,
          type: entryType,
          notes,
          refrigerantAdded: addedKg || null,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Fejl ved oprettelse");
        return;
      }

      router.push(`/journal/${equipmentId}`);
    } catch {
      setError("Netværksfejl");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <a href="/dashboard" className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <Wordmark className="text-base" />
          </a>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-5">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-navy-50/50 text-navy-400 hover:bg-navy-100 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-extrabold text-navy">Ny journalpost</h2>
            {equipment && (
              <p className="text-xs text-navy-400">
                {equipment.qrCode} · {equipment.manufacturer} {equipment.model}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-5 space-y-5">
          {/* Entry type */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Type</label>
            <div className="grid grid-cols-2 gap-2">
              {ENTRY_TYPES.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setEntryType(t.value)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    entryType === t.value
                      ? "border-teal bg-teal/5 text-teal"
                      : "border-navy-100 text-navy-400 hover:border-navy-200"
                  }`}
                >
                  <span>{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-navy mb-2">Beskrivelse</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Beskriv det udførte arbejde..."
              rows={4}
              className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm resize-none focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
            />
          </div>

          {/* Refrigerant */}
          {(entryType === "reparation" || entryType === "eftersyn") && (
            <div>
              <label className="block text-sm font-medium text-navy mb-2">
                Kølemiddel påfyldt (kg)
                <span className="text-navy-300 font-normal ml-1">— valgfrit</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={addedKg}
                onChange={(e) => setAddedKg(e.target.value)}
                placeholder="0.0"
                className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
              />
            </div>
          )}

          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!entryType || !notes || submitting}
          className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
            !entryType || !notes || submitting
              ? "bg-navy-100 text-navy-300 cursor-not-allowed"
              : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
          }`}
        >
          {submitting ? "Gemmer journalpost..." : "Gem journalpost"}
        </button>
      </div>
    </div>
  );
}
