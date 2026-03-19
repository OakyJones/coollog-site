"use client";

import { useState, useEffect } from "react";

/**
 * Animated 4-step process showing the CoolLog mascot
 * performing a QR scan → OTP login → logging an inspection.
 * Auto-advances every 3s with manual controls.
 */

const STEPS = [
  {
    label: "Finder QR-kode",
    sublabel: "Monteret på køleanlægget",
  },
  {
    label: "Scanner QR",
    sublabel: "Åbner i mobil-browseren",
  },
  {
    label: "Logger ind med OTP",
    sublabel: "Email + engangskode",
  },
  {
    label: "Logger eftersyn",
    sublabel: "Færdig på 30 sekunder",
  },
];

export function ProcessAnimation() {
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setStep((s) => (s + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <div className="relative">
      {/* Main animation stage */}
      <div
        className="relative bg-gradient-to-b from-ice to-white rounded-3xl border border-navy-50/40 overflow-hidden"
        style={{ height: 380 }}
        onClick={() => setPaused(!paused)}
        role="button"
        tabIndex={0}
        aria-label={paused ? "Afspil animation" : "Pause animation"}
      >
        {/* Scene background elements */}
        <SceneBackground step={step} />

        {/* The mascot character */}
        <AnimatedMascot step={step} />

        {/* Phone / UI overlay */}
        <PhoneOverlay step={step} />

        {/* QR code on the "equipment" */}
        <EquipmentQR step={step} />

        {/* Floating success indicators */}
        {step === 3 && <SuccessParticles />}
      </div>

      {/* Step indicator + label */}
      <div className="mt-6 flex flex-col items-center">
        {/* Progress dots */}
        <div className="flex gap-2 mb-3">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => { setStep(i); setPaused(true); }}
              className={`transition-all duration-300 rounded-full ${
                i === step
                  ? "w-8 h-2.5 bg-teal"
                  : i < step
                    ? "w-2.5 h-2.5 bg-mint/50"
                    : "w-2.5 h-2.5 bg-navy-100"
              }`}
              aria-label={`Trin ${i + 1}`}
            />
          ))}
        </div>

        {/* Labels with slide transition */}
        <div className="text-center h-14 flex flex-col justify-center">
          <p
            key={step}
            className="text-lg font-bold text-navy animate-fadeIn"
          >
            {STEPS[step].label}
          </p>
          <p
            key={`sub-${step}`}
            className="text-sm text-navy-400 animate-fadeIn"
          >
            {STEPS[step].sublabel}
          </p>
        </div>

        {paused && (
          <p className="text-xs text-navy-300 mt-1">Klik for at fortsætte</p>
        )}
      </div>
    </div>
  );
}

/* ─── Scene background ─── */
function SceneBackground({ step }: { step: number }) {
  return (
    <>
      {/* Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-navy-50/40 to-transparent" />

      {/* Coolant pipe decoration */}
      <div className="absolute top-6 left-8 right-8 flex gap-4 opacity-20">
        <div className="h-3 flex-1 bg-teal rounded-full" />
        <div className="h-3 w-3 bg-mint rounded-full" />
        <div className="h-3 flex-1 bg-teal-600 rounded-full" />
      </div>

      {/* Frost/cold particles based on step */}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-mint/30 rounded-full"
          style={{
            left: `${20 + i * 20}%`,
            top: `${15 + (i % 3) * 10}%`,
            animation: `float ${2 + i * 0.5}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}

      {/* Step-based ambient glow */}
      <div
        className="absolute rounded-full blur-3xl transition-all duration-1000"
        style={{
          width: 200,
          height: 200,
          background: step === 3 ? "rgba(0,201,167,0.15)" : "rgba(2,128,144,0.1)",
          left: step < 2 ? "15%" : "55%",
          top: "30%",
        }}
      />
    </>
  );
}

/* ─── Animated mascot ─── */
function AnimatedMascot({ step }: { step: number }) {
  // Mascot position changes per step
  const positions = [
    { x: 60, y: 80 },   // 0: walking toward equipment
    { x: 130, y: 80 },  // 1: at equipment, scanning
    { x: 180, y: 80 },  // 2: stepped back, looking at phone
    { x: 180, y: 70 },  // 3: celebrating!
  ];

  const pos = positions[step];

  return (
    <g
      className="transition-all duration-700 ease-in-out"
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
      }}
    >
      <svg
        width="120"
        height="160"
        viewBox="0 0 200 200"
        className="absolute transition-all duration-700"
        style={{
          left: pos.x,
          top: pos.y,
          transform: step === 3 ? "translateY(-8px)" : "translateY(0)",
        }}
        fill="none"
      >
        {/* Body */}
        <circle cx="100" cy="120" r="42" fill="#028090" />
        <ellipse cx="90" cy="112" rx="24" ry="28" fill="#029BA5" opacity="0.3" />

        {/* Collar */}
        <path d="M82 88 C82 88 90 96 100 96 C110 96 118 88 118 88" stroke="#016B77" strokeWidth="1.5" fill="none" />
        {/* Zipper */}
        <line x1="100" y1="96" x2="100" y2="148" stroke="#016B77" strokeWidth="1" opacity="0.4" />

        {/* Pocket + thermometer */}
        <rect x="108" y="104" width="13" height="11" rx="2" fill="#016B77" opacity="0.35" />
        <rect x="112" y="96" width="3" height="13" rx="1.5" fill="#E8F4F8" />
        <circle cx="113.5" cy="97.5" r="2.5" fill="#FF6B6B" />
        <rect x="112.5" y="97.5" width="2" height="8" rx="1" fill="#FF6B6B" opacity="0.5" />

        {/* Head */}
        <circle cx="100" cy="62" r="26" fill="#FBBF7C" />
        <ellipse cx="84" cy="67" rx="5" ry="3.5" fill="#F9A05E" opacity="0.4" />
        <ellipse cx="116" cy="67" rx="5" ry="3.5" fill="#F9A05E" opacity="0.4" />

        {/* Goggles */}
        <path d="M76 55 C76 55 82 52 100 52 C118 52 124 55 124 55" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        <ellipse cx="90" cy="56" rx="10" ry="8" fill="#E8F4F8" stroke="#64748B" strokeWidth="1.5" />
        <ellipse cx="87" cy="54" rx="3.5" ry="2.5" fill="white" opacity="0.5" />
        <ellipse cx="110" cy="56" rx="10" ry="8" fill="#E8F4F8" stroke="#64748B" strokeWidth="1.5" />
        <ellipse cx="107" cy="54" rx="3.5" ry="2.5" fill="white" opacity="0.5" />
        <rect x="98" y="54" width="4" height="4" rx="1.5" fill="#64748B" />

        {/* Eyes - change based on step */}
        {step === 3 ? (
          /* Happy squint eyes */
          <>
            <path d="M85 57 C87 54 93 54 95 57" stroke="#1A1F3D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M105 57 C107 54 113 54 115 57" stroke="#1A1F3D" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        ) : (
          /* Normal eyes - looking toward phone on steps 1-2 */
          <>
            <circle cx={step >= 1 ? 92 : 90} cy="57" r="2.5" fill="#1A1F3D" />
            <circle cx={step >= 1 ? 112 : 110} cy="57" r="2.5" fill="#1A1F3D" />
            <circle cx={step >= 1 ? 93 : 91} cy="56" r="0.8" fill="white" />
            <circle cx={step >= 1 ? 113 : 111} cy="56" r="0.8" fill="white" />
          </>
        )}

        {/* Mouth */}
        {step === 3 ? (
          <path d="M90 70 C90 70 95 78 100 78 C105 78 110 70 110 70" stroke="#1A1F3D" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : step >= 1 ? (
          <path d="M93 71 C93 71 96 75 100 75 C104 75 107 71 107 71" stroke="#1A1F3D" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : (
          <circle cx="100" cy="72" r="3" fill="#1A1F3D" opacity="0.7" />
        )}

        {/* Hat */}
        <path d="M72 48 C72 42 78 30 100 28 C122 30 128 42 128 48 L124 50 C124 50 116 47 100 47 C84 47 76 50 76 50 Z" fill="#1A1F3D" />
        <path d="M74 48 C74 48 82 51 100 51 C118 51 126 48 126 48 C126 48 120 45 100 45 C80 45 74 48 74 48Z" fill="#028090" />
        <circle cx="100" cy="22" r="7" fill="#00C9A7" />
        <text x="100" y="41" textAnchor="middle" fill="#00C9A7" fontSize="9" fontWeight="800" fontFamily="system-ui, sans-serif">CL</text>

        {/* Left arm - waving on step 3, otherwise resting/pointing */}
        {step === 3 ? (
          <g>
            <path d="M66 106 C56 96 48 80 44 70" stroke="#028090" strokeWidth="10" strokeLinecap="round" fill="none">
              <animate attributeName="d" values="M66 106 C56 96 48 80 44 70;M66 106 C56 96 44 76 40 66;M66 106 C56 96 48 80 44 70" dur="0.6s" repeatCount="indefinite" />
            </path>
            <circle cx="44" cy="68" r="7" fill="#FBBF7C">
              <animate attributeName="cy" values="68;62;68" dur="0.6s" repeatCount="indefinite" />
            </circle>
          </g>
        ) : (
          <g>
            <path d="M66 108 C58 116 56 128 57 136" stroke="#028090" strokeWidth="10" strokeLinecap="round" fill="none" />
            <circle cx="57" cy="138" r="7" fill="#FBBF7C" />
          </g>
        )}

        {/* Right arm - holding phone */}
        <path
          d={step >= 1
            ? "M134 104 C140 96 146 88 148 82"
            : "M134 108 C142 116 144 128 143 136"
          }
          stroke="#028090"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-500"
        />

        {step >= 1 ? (
          <g>
            <circle cx="148" cy="80" r="7" fill="#FBBF7C" />
            {/* Phone in hand */}
            <g transform="rotate(-12, 152, 70)">
              <rect x="140" y="56" width="20" height="32" rx="3" fill="#1A1F3D" />
              <rect x="142" y="59" width="16" height="24" rx="2" fill="#E8F4F8" />

              {step === 1 && (
                /* QR scanning view */
                <>
                  <rect x="145" y="62" width="4" height="4" fill="#028090" />
                  <rect x="150" y="62" width="4" height="4" fill="#028090" />
                  <rect x="145" y="67" width="4" height="4" fill="#028090" />
                  <rect x="150" y="67" width="4" height="4" fill="#00C9A7" />
                  <rect x="145" y="72" width="4" height="4" fill="#00C9A7" />
                  <rect x="150" y="72" width="4" height="4" fill="#028090" />
                  {/* Scan line */}
                  <line x1="143" y1="68" x2="157" y2="68" stroke="#FF6B6B" strokeWidth="1" opacity="0.8">
                    <animate attributeName="y1" values="60;80;60" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="y2" values="60;80;60" dur="1.5s" repeatCount="indefinite" />
                  </line>
                </>
              )}

              {step === 2 && (
                /* OTP login screen */
                <>
                  <rect x="144" y="61" width="12" height="2" rx="1" fill="#028090" opacity="0.6" />
                  <rect x="144" y="65" width="12" height="4" rx="1.5" fill="white" stroke="#CBD5E1" strokeWidth="0.5" />
                  <text x="150" y="68.5" textAnchor="middle" fill="#028090" fontSize="3" fontFamily="system-ui">
                    ••••••
                  </text>
                  <rect x="144" y="72" width="12" height="4" rx="1.5" fill="#028090" />
                  <text x="150" y="75" textAnchor="middle" fill="white" fontSize="2.5" fontWeight="600" fontFamily="system-ui">
                    LOG IND
                  </text>
                  {/* Typing indicator */}
                  <circle cx="147" cy="67" r="0.5" fill="#028090">
                    <animate attributeName="opacity" values="1;0;1" dur="0.8s" repeatCount="indefinite" />
                  </circle>
                </>
              )}

              {step === 3 && (
                /* Success / logged screen */
                <>
                  <circle cx="150" cy="67" r="6" fill="#00C9A7" opacity="0.15" />
                  <circle cx="150" cy="67" r="4" fill="#00C9A7" opacity="0.3" />
                  <path d="M147 67 L149 69 L153 65" stroke="#00C9A7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                  <rect x="144" y="75" width="12" height="1.5" rx="0.75" fill="#028090" opacity="0.3" />
                  <rect x="144" y="78" width="8" height="1.5" rx="0.75" fill="#028090" opacity="0.2" />
                </>
              )}
            </g>
          </g>
        ) : (
          <circle cx="143" cy="138" r="7" fill="#FBBF7C" />
        )}

        {/* Feet */}
        <ellipse cx="88" cy="164" rx="12" ry="6" fill="#1A1F3D" />
        <ellipse cx="112" cy="164" rx="12" ry="6" fill="#1A1F3D" />
        <rect x="83" y="150" width="9" height="15" rx="4.5" fill="#016B77" />
        <rect x="108" y="150" width="9" height="15" rx="4.5" fill="#016B77" />

        {/* Bobbing animation for celebration */}
        {step === 3 && (
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0,0; 0,-6; 0,0"
            dur="0.5s"
            repeatCount="3"
          />
        )}
      </svg>
    </g>
  );
}

/* ─── Equipment with QR code ─── */
function EquipmentQR({ step }: { step: number }) {
  return (
    <div
      className="absolute transition-all duration-500"
      style={{ right: "15%", top: "20%", opacity: step <= 1 ? 1 : 0.3 }}
    >
      {/* Equipment box */}
      <div className="relative">
        <div className="w-28 h-36 bg-gradient-to-b from-gray-200 to-gray-300 rounded-lg shadow-md border border-gray-300">
          {/* Vents */}
          <div className="mt-3 mx-3 space-y-1.5">
            <div className="h-1 bg-gray-400/30 rounded-full" />
            <div className="h-1 bg-gray-400/30 rounded-full" />
            <div className="h-1 bg-gray-400/30 rounded-full" />
          </div>

          {/* Display panel */}
          <div className="mx-3 mt-3 h-8 bg-navy/80 rounded flex items-center justify-center">
            <span className="text-mint text-[8px] font-mono">-18.5°C</span>
          </div>

          {/* QR label */}
          <div
            className={`mx-3 mt-2 p-1.5 bg-white rounded border-2 transition-all duration-300 ${
              step === 1 ? "border-mint shadow-lg shadow-mint/30 scale-105" : "border-gray-200"
            }`}
          >
            {/* Mini QR pattern */}
            <div className="grid grid-cols-5 gap-[1px]">
              {[1,1,1,0,1, 1,0,1,1,0, 0,1,0,1,1, 1,0,1,0,1, 1,1,0,1,1].map((v, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-[1px] ${v ? "bg-navy" : "bg-transparent"}`}
                />
              ))}
            </div>
            <p className="text-[5px] text-navy-300 text-center mt-0.5 font-mono">KL-4821</p>
          </div>

          {/* Scan beam effect */}
          {step === 1 && (
            <div
              className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none"
            >
              <div
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-mint to-transparent"
                style={{
                  animation: "scanBeam 1.5s ease-in-out infinite",
                }}
              />
            </div>
          )}
        </div>

        {/* Equipment label */}
        <div className="mt-1.5 text-center">
          <p className="text-[9px] font-medium text-navy-400">Carrier 30XA</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Phone overlay for steps 2+ ─── */
function PhoneOverlay({ step }: { step: number }) {
  if (step < 2) return null;

  return (
    <div
      className="absolute left-6 bottom-6 animate-fadeIn"
    >
      {/* Speech bubble from mascot */}
      <div className="bg-white rounded-xl shadow-lg p-3 max-w-[160px] relative">
        <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white rotate-45 shadow-lg" />
        {step === 2 ? (
          <>
            <p className="text-[10px] font-bold text-navy mb-1">OTP sendt!</p>
            <p className="text-[9px] text-navy-400">Tjek din email for engangskoden...</p>
            <div className="mt-2 flex gap-1">
              {[1,2,3,4,5,6].map((i) => (
                <div key={i} className="w-4 h-5 border border-teal/30 rounded bg-ice flex items-center justify-center">
                  <span className="text-[8px] font-mono text-teal font-bold">
                    {i <= 4 ? "•" : ""}
                  </span>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-3.5 h-3.5 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-[10px] font-bold text-mint">Eftersyn logget!</p>
            </div>
            <p className="text-[9px] text-navy-400">KL-4821 · Carrier 30XA</p>
            <p className="text-[8px] text-navy-300 mt-1">Næste eftersyn: 19. sep 2026</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Success particles ─── */
function SuccessParticles() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? "#00C9A7" : "#028090",
            left: `${30 + Math.random() * 40}%`,
            top: `${20 + Math.random() * 40}%`,
            animation: `confetti ${1 + Math.random()}s ease-out forwards`,
            animationDelay: `${i * 0.1}s`,
            opacity: 0,
          }}
        />
      ))}
    </>
  );
}

/* ─── CSS Animations (injected via style tag) ─── */
export function ProcessAnimationStyles() {
  return (
    <style>{`
      @keyframes float {
        0% { transform: translateY(0px); }
        100% { transform: translateY(-8px); }
      }
      @keyframes fadeIn {
        0% { opacity: 0; transform: translateY(8px); }
        100% { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeIn {
        animation: fadeIn 0.4s ease-out;
      }
      @keyframes scanBeam {
        0%, 100% { top: 20%; }
        50% { top: 80%; }
      }
      @keyframes confetti {
        0% { opacity: 1; transform: scale(0) translateY(0); }
        50% { opacity: 1; transform: scale(1.2) translateY(-20px); }
        100% { opacity: 0; transform: scale(0.8) translateY(-40px); }
      }
    `}</style>
  );
}
