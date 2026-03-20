"use client";

import { useState, useEffect, useCallback } from "react";
import { LogoIcon } from "@/components/Icons";
import { MascotHead } from "@/components/Mascot";

/* ─── Dummy data ─── */
const EQUIPMENT = {
  id: "KL-4821",
  serial: "CR-30XA-2019-04821",
  manufacturer: "Carrier",
  model: "30XA-452",
  refrigerant: "R410A",
  charge_kg: 12.5,
  ped_category: "II",
  location: "Netto Østerbro, Nordre Frihavnsgade 12, 2100 København Ø",
  owner: "Salling Group A/S",
  installation_date: "2019-06-14",
};

const HISTORY = [
  {
    type: "Eftersyn",
    date: "2025-12-02",
    technician: "Jonas Kjær",
    company: "KølePartner ApS",
    notes: "Alt i orden. Kompressor kører fint, ingen lækager fundet.",
    color: "teal",
  },
  {
    type: "Lækagekontrol",
    date: "2025-09-15",
    technician: "Mikkel Petersen",
    company: "KølePartner ApS",
    notes: "Elektronisk lækagesøgning udført. Ingen lækager detekteret.",
    color: "mint",
  },
  {
    type: "Reparation",
    date: "2025-06-20",
    technician: "Jonas Kjær",
    company: "KølePartner ApS",
    notes: "Udskiftet ekspansionsventil. Påfyldt 0,8 kg R410A.",
    refrigerant_added: 0.8,
    color: "navy",
  },
  {
    type: "Eftersyn",
    date: "2025-03-10",
    technician: "Mikkel Petersen",
    company: "KølePartner ApS",
    notes: "Årligt eftersyn gennemført. Driftspunkt OK. Anbefaler udskiftning af ekspansionsventil inden næste eftersyn.",
    color: "teal",
  },
  {
    type: "Lækagekontrol",
    date: "2024-12-01",
    technician: "Anders Nielsen",
    company: "Nordisk Køl A/S",
    notes: "Lækagekontrol iht. F-gasforordningen. Ingen fund.",
    color: "mint",
  },
];

const ENTRY_TYPES = [
  { value: "eftersyn", label: "Eftersyn", icon: "🔍" },
  { value: "laekagekontrol", label: "Lækagekontrol", icon: "💨" },
  { value: "reparation", label: "Reparation", icon: "🔧" },
  { value: "sikkerhedsventil", label: "Sikkerhedsventil", icon: "⚙️" },
  { value: "ibrugtagning", label: "Ibrugtagning", icon: "🚀" },
];

/* ─── Step types ─── */
type Step =
  | "scan"
  | "equipment"
  | "otp-email"
  | "otp-code"
  | "journal"
  | "new-entry"
  | "success";

/* ─── Main demo component ─── */
export default function DemoPage() {
  const [step, setStep] = useState<Step>("scan");
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [entryType, setEntryType] = useState("");
  const [notes, setNotes] = useState("");
  const [addedKg, setAddedKg] = useState("");
  const [newEntry, setNewEntry] = useState<typeof HISTORY[0] | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [otpSending, setOtpSending] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Simulated QR scan animation
  const handleScan = useCallback(() => {
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setStep("equipment"), 300);
          return 100;
        }
        return p + 4;
      });
    }, 40);
  }, []);

  // Simulated OTP send
  const handleSendOtp = useCallback(() => {
    if (!email.includes("@")) return;
    setOtpSending(true);
    setTimeout(() => {
      setOtpSending(false);
      setStep("otp-code");
    }, 1500);
  }, [email]);

  // Simulated OTP verify
  const handleVerifyOtp = useCallback(() => {
    if (otpCode.length < 4) return;
    setOtpVerifying(true);
    setTimeout(() => {
      setOtpVerifying(false);
      setStep("journal");
    }, 1200);
  }, [otpCode]);

  // Submit new entry
  const handleSubmitEntry = useCallback(() => {
    if (!entryType || !notes) return;
    setSubmitting(true);
    const entry = {
      type: ENTRY_TYPES.find((t) => t.value === entryType)?.label || entryType,
      date: new Date().toISOString().slice(0, 10),
      technician: "Demo Tekniker",
      company: "KølePartner ApS",
      notes,
      refrigerant_added: addedKg ? parseFloat(addedKg) : undefined,
      color: entryType === "eftersyn" ? "teal" : entryType === "laekagekontrol" ? "mint" : "navy",
    };
    setTimeout(() => {
      setNewEntry(entry as typeof HISTORY[0]);
      setSubmitting(false);
      setStep("success");
    }, 1800);
  }, [entryType, notes, addedKg]);

  // Reset demo
  const resetDemo = () => {
    setStep("scan");
    setEmail("");
    setOtpCode("");
    setEntryType("");
    setNotes("");
    setAddedKg("");
    setNewEntry(null);
    setScanProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <span className="text-base font-bold text-navy">CoolLog</span>
            <span className="text-[10px] bg-mint/15 text-teal font-semibold px-2 py-0.5 rounded-full">
              DEMO
            </span>
          </a>
          <button
            onClick={resetDemo}
            className="text-xs text-navy-300 hover:text-teal transition-colors"
          >
            Start forfra
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="max-w-lg mx-auto px-4 pt-4">
        <DemoProgress step={step} />
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-4 py-6">
        {step === "scan" && (
          <ScanStep onScan={handleScan} progress={scanProgress} />
        )}
        {step === "equipment" && (
          <EquipmentStep onContinue={() => setStep("otp-email")} />
        )}
        {step === "otp-email" && (
          <OtpEmailStep
            email={email}
            setEmail={setEmail}
            onSend={handleSendOtp}
            sending={otpSending}
          />
        )}
        {step === "otp-code" && (
          <OtpCodeStep
            code={otpCode}
            setCode={setOtpCode}
            email={email}
            onVerify={handleVerifyOtp}
            verifying={otpVerifying}
          />
        )}
        {step === "journal" && (
          <JournalStep
            onNewEntry={() => setStep("new-entry")}
            newEntry={newEntry}
          />
        )}
        {step === "new-entry" && (
          <NewEntryStep
            entryType={entryType}
            setEntryType={setEntryType}
            notes={notes}
            setNotes={setNotes}
            addedKg={addedKg}
            setAddedKg={setAddedKg}
            onSubmit={handleSubmitEntry}
            onBack={() => setStep("journal")}
            submitting={submitting}
          />
        )}
        {step === "success" && (
          <SuccessStep onViewJournal={() => setStep("journal")} onReset={resetDemo} />
        )}
      </div>

      {/* Demo disclaimer */}
      <div className="max-w-lg mx-auto px-4 pb-8">
        <div className="text-center text-[11px] text-navy-300 bg-navy/5 rounded-lg p-3">
          Dette er en interaktiv demo med fiktive data. Ingen data gemmes.
          <br />
          <a href="/" className="text-teal hover:underline">
            ← Tilbage til coollog.dk
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Progress indicator ─── */
function DemoProgress({ step }: { step: Step }) {
  const steps = ["scan", "equipment", "otp-email", "journal", "new-entry", "success"];
  const labels = ["QR", "Anlæg", "Login", "Journal", "Log", "✓"];
  const currentIdx = steps.indexOf(step === "otp-code" ? "otp-email" : step);

  return (
    <div className="flex items-center gap-1">
      {labels.map((label, i) => (
        <div key={label} className="flex items-center flex-1">
          <div
            className={`w-full h-1.5 rounded-full transition-all duration-500 ${
              i <= currentIdx ? "bg-teal" : "bg-navy-100"
            }`}
          />
        </div>
      ))}
    </div>
  );
}

/* ─── Step 1: QR Scan ─── */
function ScanStep({ onScan, progress }: { onScan: () => void; progress: number }) {
  const scanning = progress > 0 && progress < 100;
  const done = progress >= 100;

  return (
    <div className="text-center space-y-6">
      <div className="pt-4">
        <MascotHead className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-extrabold text-navy mb-2">
          Velkommen til CoolLog Demo
        </h1>
        <p className="text-sm text-navy-400">
          Prøv hele teknikeroplevelsen — fra QR-scanning til logget eftersyn.
        </p>
      </div>

      {/* QR Scanner simulation */}
      <div className="relative mx-auto w-64 h-64 bg-navy rounded-2xl overflow-hidden">
        {/* Camera feed simulation */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-400/50 to-navy/80" />

        {/* Grid overlay */}
        <div className="absolute inset-4 border-2 border-white/20 rounded-lg">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-mint rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-mint rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-mint rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-mint rounded-br-lg" />
        </div>

        {/* QR code in center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-lg p-2 shadow-xl">
          <div className="grid grid-cols-7 gap-[2px] w-full h-full">
            {[1,1,1,0,1,1,1, 1,0,1,0,1,0,1, 1,1,1,0,1,1,1, 0,0,0,0,0,0,0, 1,0,1,1,0,1,0, 1,0,0,1,1,0,1, 1,1,0,0,1,1,1].map((v, i) => (
              <div
                key={i}
                className={`rounded-[1px] ${v ? "bg-navy" : "bg-transparent"}`}
              />
            ))}
          </div>
          <p className="text-[6px] text-navy-300 text-center mt-0.5 font-mono">
            KL-4821
          </p>
        </div>

        {/* Scan line */}
        {scanning && (
          <div
            className="absolute left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent"
            style={{
              top: `${16 + (progress % 50) * 1.3}%`,
              transition: "top 0.1s linear",
            }}
          />
        )}

        {/* Progress overlay */}
        {scanning && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-mint rounded-full transition-all duration-100"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[10px] text-white/60 text-center mt-1">
              Scanner QR-kode...
            </p>
          </div>
        )}

        {/* Done overlay */}
        {done && (
          <div className="absolute inset-0 bg-navy/80 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-mint rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-mint text-sm font-semibold">Fundet!</p>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={onScan}
        disabled={scanning || done}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
          scanning || done
            ? "bg-navy-100 text-navy-300 cursor-not-allowed"
            : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
        }`}
      >
        {done ? "Fundet! Indlæser..." : scanning ? "Scanner..." : "Simulér QR-scanning"}
      </button>
    </div>
  );
}

/* ─── Step 2: Equipment info ─── */
function EquipmentStep({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div>
        <h2 className="text-xl font-extrabold text-navy mb-1">Anlæg fundet</h2>
        <p className="text-sm text-navy-400">QR-kode matchet til serienummer</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 overflow-hidden">
        {/* Header */}
        <div className="bg-teal/5 px-5 py-4 border-b border-navy-50/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-bold text-navy">{EQUIPMENT.id}</p>
              <p className="text-xs text-navy-400 font-mono">{EQUIPMENT.serial}</p>
            </div>
            <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-full">
              PED Kat. {EQUIPMENT.ped_category}
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="px-5 py-4 space-y-3">
          {[
            ["Fabrikant", `${EQUIPMENT.manufacturer} ${EQUIPMENT.model}`],
            ["Kølemiddel", `${EQUIPMENT.refrigerant} · ${EQUIPMENT.charge_kg} kg`],
            ["Placering", EQUIPMENT.location],
            ["Ejer", EQUIPMENT.owner],
            ["Installeret", formatDate(EQUIPMENT.installation_date)],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-start gap-4">
              <span className="text-xs text-navy-300 flex-shrink-0 min-w-[80px]">
                {label}
              </span>
              <span className="text-sm text-navy text-right">{value}</span>
            </div>
          ))}
        </div>

        {/* Next inspection */}
        <div className="mx-5 mb-4 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-amber-500 text-sm">⚠️</span>
            <div>
              <p className="text-xs font-semibold text-amber-700">
                Næste eftersyn forfaldent
              </p>
              <p className="text-[11px] text-amber-600">
                Planlagt: 2. marts 2026 · 18 dage overskredet
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={onContinue}
        className="w-full py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal-600 transition-colors shadow-lg shadow-teal/25"
      >
        Log ind for at se journal
      </button>

      <p className="text-center text-[11px] text-navy-300">
        Login kræves for at se historik og logge eftersyn
      </p>
    </div>
  );
}

/* ─── Step 3a: OTP Email ─── */
function OtpEmailStep({
  email,
  setEmail,
  onSend,
  sending,
}: {
  email: string;
  setEmail: (e: string) => void;
  onSend: () => void;
  sending: boolean;
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-extrabold text-navy mb-1">Log ind</h2>
        <p className="text-sm text-navy-400">
          Indtast din email, så sender vi en engangskode.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6">
        <label className="block text-sm font-medium text-navy mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tekniker@kølefirma.dk"
          className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <p className="text-[11px] text-navy-300 mt-2">
          I demoen virker enhver email-adresse.
        </p>
      </div>

      <button
        onClick={onSend}
        disabled={!email.includes("@") || sending}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
          !email.includes("@") || sending
            ? "bg-navy-100 text-navy-300 cursor-not-allowed"
            : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
        }`}
      >
        {sending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Sender kode...
          </span>
        ) : (
          "Send engangskode"
        )}
      </button>
    </div>
  );
}

/* ─── Step 3b: OTP Code ─── */
function OtpCodeStep({
  code,
  setCode,
  email,
  onVerify,
  verifying,
}: {
  code: string;
  setCode: (c: string) => void;
  email: string;
  onVerify: () => void;
  verifying: boolean;
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-extrabold text-navy mb-1">Indtast kode</h2>
        <p className="text-sm text-navy-400">
          Vi har sendt en 6-cifret kode til{" "}
          <span className="font-medium text-navy">{email}</span>
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6">
        {/* Simulated email notification */}
        <div className="bg-ice rounded-xl p-4 mb-5 border border-navy-100/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 bg-teal rounded flex items-center justify-center">
              <LogoIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-medium text-navy">CoolLog</span>
            <span className="text-[10px] text-navy-300 ml-auto">lige nu</span>
          </div>
          <p className="text-xs text-navy-400 mb-1">Din engangskode er:</p>
          <p className="text-2xl font-mono font-bold text-teal tracking-[0.3em] text-center">
            847291
          </p>
          <p className="text-[10px] text-navy-300 text-center mt-1">
            Koden udløber om 10 minutter
          </p>
        </div>

        <label className="block text-sm font-medium text-navy mb-2">
          Engangskode
        </label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          placeholder="847291"
          maxLength={6}
          className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-lg font-mono text-center tracking-[0.3em] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
          onKeyDown={(e) => e.key === "Enter" && onVerify()}
        />
        <p className="text-[11px] text-navy-300 mt-2">
          I demoen virker enhver kode med 4+ cifre.
        </p>
      </div>

      <button
        onClick={onVerify}
        disabled={code.length < 4 || verifying}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
          code.length < 4 || verifying
            ? "bg-navy-100 text-navy-300 cursor-not-allowed"
            : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
        }`}
      >
        {verifying ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Verificerer...
          </span>
        ) : (
          "Log ind"
        )}
      </button>
    </div>
  );
}

/* ─── Step 4: Journal view ─── */
function JournalStep({
  onNewEntry,
  newEntry,
}: {
  onNewEntry: () => void;
  newEntry: typeof HISTORY[0] | null;
}) {
  const allEntries = newEntry ? [newEntry, ...HISTORY] : HISTORY;

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Equipment header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-navy">{EQUIPMENT.id}</h2>
          <p className="text-xs text-navy-400">
            {EQUIPMENT.manufacturer} {EQUIPMENT.model} · {EQUIPMENT.refrigerant}
          </p>
        </div>
        <span className="px-3 py-1 bg-teal/10 text-teal text-xs font-bold rounded-full">
          PED {EQUIPMENT.ped_category}
        </span>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-3 border border-navy-50/40 text-center">
          <p className="text-lg font-bold text-teal">{allEntries.length}</p>
          <p className="text-[10px] text-navy-400">Journalposter</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-navy-50/40 text-center">
          <p className="text-lg font-bold text-navy">{EQUIPMENT.charge_kg} kg</p>
          <p className="text-[10px] text-navy-400">{EQUIPMENT.refrigerant}</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-navy-50/40 text-center">
          <p className="text-lg font-bold text-amber-500">!</p>
          <p className="text-[10px] text-navy-400">Forfaldent</p>
        </div>
      </div>

      {/* Journal entries */}
      <div>
        <h3 className="text-sm font-bold text-navy mb-3">Historik</h3>
        <div className="space-y-3">
          {allEntries.map((entry, i) => (
            <div
              key={`${entry.date}-${i}`}
              className={`bg-white rounded-xl border overflow-hidden transition-all ${
                i === 0 && newEntry
                  ? "border-mint shadow-md shadow-mint/10"
                  : "border-navy-50/40"
              }`}
            >
              <div
                className={`px-4 py-3 border-l-3 ${
                  entry.color === "teal"
                    ? "border-l-teal bg-teal/[0.03]"
                    : entry.color === "mint"
                      ? "border-l-mint bg-mint/[0.03]"
                      : "border-l-navy bg-navy/[0.02]"
                }`}
                style={{ borderLeftWidth: 3 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span
                    className={`text-xs font-bold ${
                      entry.color === "teal"
                        ? "text-teal"
                        : entry.color === "mint"
                          ? "text-mint-700"
                          : "text-navy"
                    }`}
                  >
                    {entry.type}
                    {i === 0 && newEntry && (
                      <span className="ml-1.5 text-[10px] bg-mint/15 text-mint-700 px-1.5 py-0.5 rounded-full">
                        NY
                      </span>
                    )}
                  </span>
                  <span className="text-[10px] text-navy-300">
                    {formatDate(entry.date)}
                  </span>
                </div>
                <p className="text-[11px] text-navy-400 mb-1">{entry.notes}</p>
                <div className="flex items-center gap-3 text-[10px] text-navy-300">
                  <span>{entry.technician}</span>
                  <span>·</span>
                  <span>{entry.company}</span>
                  {entry.refrigerant_added && (
                    <>
                      <span>·</span>
                      <span className="text-teal font-medium">
                        +{entry.refrigerant_added} kg
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New entry button */}
      <button
        onClick={onNewEntry}
        className="w-full py-4 bg-teal text-white font-bold rounded-xl hover:bg-teal-600 transition-colors shadow-lg shadow-teal/25 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" d="M12 4v16m8-8H4" />
        </svg>
        Ny journalpost
      </button>
    </div>
  );
}

/* ─── Step 5: New entry form ─── */
function NewEntryStep({
  entryType,
  setEntryType,
  notes,
  setNotes,
  addedKg,
  setAddedKg,
  onSubmit,
  onBack,
  submitting,
}: {
  entryType: string;
  setEntryType: (t: string) => void;
  notes: string;
  setNotes: (n: string) => void;
  addedKg: string;
  setAddedKg: (k: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  submitting: boolean;
}) {
  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-navy-50/50 text-navy-400 hover:bg-navy-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h2 className="text-xl font-extrabold text-navy">Ny journalpost</h2>
          <p className="text-xs text-navy-400">{EQUIPMENT.id} · {EQUIPMENT.manufacturer} {EQUIPMENT.model}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-5 space-y-5">
        {/* Entry type selection */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            Type
          </label>
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
          <label className="block text-sm font-medium text-navy mb-2">
            Beskrivelse
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Beskriv det udførte arbejde..."
            rows={4}
            className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm resize-none focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
          />
        </div>

        {/* Refrigerant added (conditional) */}
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

        {/* Photo upload simulation */}
        <div>
          <label className="block text-sm font-medium text-navy mb-2">
            Foto
            <span className="text-navy-300 font-normal ml-1">— valgfrit</span>
          </label>
          <div className="border-2 border-dashed border-navy-100 rounded-xl p-6 text-center hover:border-teal/30 transition-colors cursor-pointer">
            <svg className="w-8 h-8 mx-auto text-navy-200 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
            </svg>
            <p className="text-xs text-navy-300">
              Tryk for at tage foto
            </p>
            <p className="text-[10px] text-navy-200 mt-0.5">
              (Deaktiveret i demo)
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onSubmit}
        disabled={!entryType || !notes || submitting}
        className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
          !entryType || !notes || submitting
            ? "bg-navy-100 text-navy-300 cursor-not-allowed"
            : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
        }`}
      >
        {submitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Gemmer journalpost...
          </span>
        ) : (
          "Gem journalpost"
        )}
      </button>
    </div>
  );
}

/* ─── Step 6: Success ─── */
function SuccessStep({
  onViewJournal,
  onReset,
}: {
  onViewJournal: () => void;
  onReset: () => void;
}) {
  return (
    <div className="text-center space-y-6 animate-fadeIn py-8">
      <div className="w-20 h-20 bg-mint rounded-full flex items-center justify-center mx-auto shadow-lg shadow-mint/25">
        <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-extrabold text-navy mb-2">
          Journalpost gemt!
        </h2>
        <p className="text-sm text-navy-400 max-w-xs mx-auto">
          Eftersynet er registreret på anlæg {EQUIPMENT.id} og er nu synligt for
          anlægsejer og tilsynsmyndighed.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-navy-50/40 p-5 text-left max-w-xs mx-auto">
        <p className="text-xs font-bold text-navy mb-2">Kvittering</p>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-navy-300">Anlæg</span>
            <span className="text-navy font-medium">{EQUIPMENT.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy-300">Tidspunkt</span>
            <span className="text-navy font-medium">
              {new Date().toLocaleString("da-DK", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy-300">Tekniker</span>
            <span className="text-navy font-medium">Demo Tekniker</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy-300">Firma</span>
            <span className="text-navy font-medium">KølePartner ApS</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 max-w-xs mx-auto">
        <button
          onClick={onViewJournal}
          className="w-full py-3.5 bg-teal text-white font-bold rounded-xl hover:bg-teal-600 transition-colors"
        >
          Se journal
        </button>
        <button
          onClick={onReset}
          className="w-full py-3.5 border-2 border-navy-100 text-navy-400 font-semibold rounded-xl hover:border-teal/30 hover:text-teal transition-colors"
        >
          Prøv demoen igen
        </button>
        <a
          href="/#kontakt"
          className="block w-full py-3.5 bg-mint text-navy font-bold rounded-xl hover:bg-mint-400 transition-colors text-center"
        >
          Vil I prøve CoolLog? Book demo
        </a>
      </div>
    </div>
  );
}

/* ─── Utility ─── */
function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("da-DK", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
