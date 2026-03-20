"use client";

import { useState, Suspense } from "react";
import { LogoIcon } from "@/components/Icons";
import { MascotHead } from "@/components/Mascot";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-ice to-white" />}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const equipmentId = searchParams.get("equipment");
  const qrCode = searchParams.get("qr");

  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [devCode, setDevCode] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    if (!email.includes("@")) return;
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/auth/otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Fejl ved afsendelse");
        return;
      }

      // In dev mode, show the code
      if (data._dev_code) setDevCode(data._dev_code);
      setStep("code");
    } catch {
      setError("Netværksfejl");
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async () => {
    if (code.length < 6) return;
    setVerifying(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Ugyldig kode");
        return;
      }

      // Redirect to journal or dashboard
      if (equipmentId) {
        router.push(`/journal/${equipmentId}`);
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("Netværksfejl");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center">
          <a href="/" className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <span className="text-base font-bold text-navy">RefiLog</span>
          </a>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8">
        {step === "email" ? (
          <div className="space-y-6">
            <div className="text-center">
              <MascotHead className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-2xl font-extrabold text-navy mb-2">Log ind</h1>
              <p className="text-sm text-navy-400">
                Indtast din email, så sender vi en engangskode.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6">
              <label className="block text-sm font-medium text-navy mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tekniker@kølefirma.dk"
                className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleSendOtp()}
              />

              {error && (
                <p className="text-red-500 text-xs mt-2">{error}</p>
              )}

              <p className="text-[11px] text-navy-300 mt-3">
                Test-brugere: jonas@kolepartner.dk (admin), mikkel@kolepartner.dk (tekniker)
              </p>
            </div>

            <button
              onClick={handleSendOtp}
              disabled={!email.includes("@") || sending}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                !email.includes("@") || sending
                  ? "bg-navy-100 text-navy-300 cursor-not-allowed"
                  : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
              }`}
            >
              {sending ? "Sender kode..." : "Send engangskode"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-extrabold text-navy mb-1">Indtast kode</h2>
              <p className="text-sm text-navy-400">
                Vi har sendt en 6-cifret kode til{" "}
                <span className="font-medium text-navy">{email}</span>
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6">
              {devCode && (
                <div className="bg-ice rounded-xl p-4 mb-5 border border-navy-100/50">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-teal rounded flex items-center justify-center">
                      <LogoIcon className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-medium text-navy">RefiLog</span>
                    <span className="text-[10px] text-navy-300 ml-auto">dev mode</span>
                  </div>
                  <p className="text-xs text-navy-400 mb-1">Din engangskode er:</p>
                  <p className="text-2xl font-mono font-bold text-teal tracking-[0.3em] text-center">
                    {devCode}
                  </p>
                </div>
              )}

              <label className="block text-sm font-medium text-navy mb-2">Engangskode</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="123456"
                maxLength={6}
                className="w-full px-4 py-3 bg-ice rounded-xl border border-navy-100 text-navy text-lg font-mono text-center tracking-[0.3em] focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
                onKeyDown={(e) => e.key === "Enter" && handleVerify()}
              />

              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>

            <button
              onClick={handleVerify}
              disabled={code.length < 6 || verifying}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${
                code.length < 6 || verifying
                  ? "bg-navy-100 text-navy-300 cursor-not-allowed"
                  : "bg-teal text-white hover:bg-teal-600 shadow-lg shadow-teal/25"
              }`}
            >
              {verifying ? "Verificerer..." : "Log ind"}
            </button>

            <button
              onClick={() => { setStep("email"); setCode(""); setError(""); }}
              className="w-full text-center text-sm text-navy-400 hover:text-teal"
            >
              ← Prøv en anden email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
