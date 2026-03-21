"use client";

import { useState } from "react";
import { LogoIcon } from "@/components/Icons";
import { MascotHead } from "@/components/Mascot";

type CvrResult = {
  cvr: string;
  name: string | null;
  address: string;
  city: string;
  zip: string;
  branchCode: string;
  branchText: string;
  phone: string;
  email: string;
  notFound: boolean;
  autoApproved: boolean;
};

export default function RegisterPage() {
  const [step, setStep] = useState<"cvr" | "confirm" | "done">("cvr");
  const [cvr, setCvr] = useState("");
  const [cvrData, setCvrData] = useState<CvrResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Manuelt firmanavn (når CVR ikke findes)
  const [manualCompanyName, setManualCompanyName] = useState("");

  // Kontaktoplysninger
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Resultat
  const [result, setResult] = useState<{ autoApproved: boolean; message: string } | null>(null);

  const handleCvrLookup = async () => {
    if (cvr.length !== 8) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/cvr?cvr=${cvr}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "CVR-opslag fejlede");
        return;
      }

      setCvrData(data);
      setStep("confirm");
    } catch {
      setError("Netværksfejl");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!contactName || !contactEmail) {
      setError("Navn og email er påkrævet");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvr: cvrData?.cvr,
          companyName: cvrData?.name || manualCompanyName,
          branchCode: cvrData?.branchCode,
          branchText: cvrData?.branchText,
          contactName,
          contactEmail,
          contactPhone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registrering fejlede");
        return;
      }

      setResult({ autoApproved: data.autoApproved, message: data.message });
      setStep("done");
    } catch {
      setError("Netværksfejl");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <span className="text-base font-bold text-navy">RefiLog</span>
          </a>
          <a href="/login" className="text-sm text-teal font-medium hover:underline">
            Log ind
          </a>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        {/* Steg 1: CVR-opslag */}
        {step === "cvr" && (
          <div className="space-y-6">
            <div className="text-center">
              <MascotHead className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-2xl font-extrabold text-navy mb-2">Registrer dit kølefirma</h1>
              <p className="text-sm text-navy-400">
                Indtast dit CVR-nummer, så henter vi oplysningerne fra CVR-registret.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6">
              <label className="block text-sm font-medium text-navy mb-2">CVR-nummer</label>
              <input
                type="text"
                value={cvr}
                onChange={(e) => setCvr(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="12345678"
                maxLength={8}
                className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-lg font-mono text-center tracking-[0.2em] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleCvrLookup()}
              />

              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>

            <button
              onClick={handleCvrLookup}
              disabled={cvr.length !== 8 || loading}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                cvr.length !== 8 || loading
                  ? "bg-navy-100 text-navy-300 cursor-not-allowed"
                  : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
              }`}
            >
              {loading ? "Slår op..." : "Slå CVR op"}
            </button>

            <p className="text-center text-xs text-navy-300">
              Allerede registreret?{" "}
              <a href="/login" className="text-teal hover:underline">Log ind her</a>
            </p>
          </div>
        )}

        {/* Steg 2: Bekræft og udfyld */}
        {step === "confirm" && cvrData && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-navy mb-1">Bekræft oplysninger</h2>
              <p className="text-sm text-navy-400">
                Vi fandt dit firma. Udfyld kontaktoplysninger for at fuldføre.
              </p>
            </div>

            {/* Firmaoplysninger fra CVR */}
            <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6">
              {cvrData.notFound ? (
                <>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2 mb-4">
                    <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-navy">
                      CVR {cvrData.cvr} blev ikke fundet automatisk. Udfyld firmanavn manuelt — registreringen afventer manuel godkendelse.
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-navy-400 mb-1">Firmanavn *</label>
                    <input
                      type="text"
                      value={manualCompanyName}
                      onChange={(e) => setManualCompanyName(e.target.value)}
                      placeholder="Mit Kølefirma ApS"
                      className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-ice rounded-xl flex items-center justify-center">
                      <svg className="w-5 h-5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-navy">{cvrData.name}</p>
                      <p className="text-xs text-navy-400">CVR: {cvrData.cvr}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-navy-400">Adresse</span>
                      <span className="text-navy text-right">{cvrData.address}, {cvrData.zip} {cvrData.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-navy-400">Branche</span>
                      <span className="text-navy text-right">{cvrData.branchText || "Ukendt"}</span>
                    </div>
                  </div>

                  {cvrData.autoApproved && (
                    <div className="mt-4 bg-mint/10 border border-mint/30 rounded-xl px-4 py-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-mint flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-xs text-navy">
                        <span className="font-semibold">Automatisk godkendelse!</span> Din branchekode matcher — dit firma aktiveres med det samme.
                      </p>
                    </div>
                  )}

                  {!cvrData.autoApproved && (
                    <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-amber-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-navy">
                        <span className="font-semibold">Manuel godkendelse.</span> Din branchekode kræver at vi verificerer dit firma. Det tager typisk under 24 timer.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Kontaktoplysninger */}
            <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6 space-y-4">
              <h3 className="font-bold text-navy text-sm">Din kontaktperson (admin)</h3>

              <div>
                <label className="block text-xs font-medium text-navy-400 mb-1">Fulde navn *</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="Anders Hansen"
                  className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-400 mb-1">Email *</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="anders@kølefirma.dk"
                  className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-navy-400 mb-1">Telefon</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+45 12 34 56 78"
                  className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
                />
              </div>

              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>

            <button
              onClick={handleRegister}
              disabled={!contactName || !contactEmail.includes("@") || submitting || (cvrData?.notFound && !manualCompanyName)}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                !contactName || !contactEmail.includes("@") || submitting || (cvrData?.notFound && !manualCompanyName)
                  ? "bg-navy-100 text-navy-300 cursor-not-allowed"
                  : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
              }`}
            >
              {submitting ? "Registrerer..." : "Opret firma"}
            </button>

            <button
              onClick={() => { setStep("cvr"); setError(""); }}
              className="w-full text-center text-sm text-navy-400 hover:text-teal"
            >
              ← Prøv et andet CVR
            </button>
          </div>
        )}

        {/* Steg 3: Færdig */}
        {step === "done" && result && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-mint/10 rounded-full flex items-center justify-center">
                {result.autoApproved ? (
                  <svg className="w-10 h-10 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-10 h-10 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>
              <h1 className="text-2xl font-extrabold text-navy mb-2">
                {result.autoApproved ? "Du er klar!" : "Afventer godkendelse"}
              </h1>
              <p className="text-sm text-navy-400 max-w-sm mx-auto">
                {result.message}
              </p>
            </div>

            {result.autoApproved ? (
              <a
                href="/login"
                className="block w-full py-4 rounded-xl font-bold text-base text-center bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25 transition-all"
              >
                Log ind nu
              </a>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6 text-center">
                <p className="text-sm text-navy-400">
                  Vi sender en email til <span className="font-medium text-navy">{contactEmail}</span> når dit firma er godkendt.
                </p>
              </div>
            )}

            <a
              href="/"
              className="block w-full text-center text-sm text-navy-400 hover:text-teal"
            >
              ← Til forsiden
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
