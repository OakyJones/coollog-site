"use client";

/**
 * CoolLog Mascot — Venlig kølemontør i flat design
 * Rund karakter med vinterhue (CL-logo), sikkerhedsbriller,
 * termometer i brystlomme, telefon/QR-scanner.
 * Brand farver: Navy #1A1F3D, Teal #028090, Mint #00C9A7, Ice #E8F4F8
 */

interface MascotProps {
  className?: string;
  /** Show the mascot waving */
  waving?: boolean;
  /** Show phone/QR scanner in hand */
  withPhone?: boolean;
}

export function Mascot({
  className = "w-48 h-48",
  waving = false,
  withPhone = true,
}: MascotProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* === BODY === */}
      {/* Main body circle — teal jumpsuit */}
      <circle cx="100" cy="120" r="52" fill="#028090" />
      {/* Body highlight */}
      <ellipse cx="88" cy="110" rx="30" ry="35" fill="#029BA5" opacity="0.3" />

      {/* Jumpsuit collar / neckline */}
      <path
        d="M78 82 C78 82 88 92 100 92 C112 92 122 82 122 82"
        stroke="#016B77"
        strokeWidth="2"
        fill="none"
      />

      {/* Zipper line */}
      <line x1="100" y1="92" x2="100" y2="155" stroke="#016B77" strokeWidth="1.5" opacity="0.5" />

      {/* Breast pocket */}
      <rect x="107" y="100" width="16" height="14" rx="2" fill="#016B77" opacity="0.4" />
      {/* Pocket flap */}
      <line x1="107" y1="100" x2="123" y2="100" stroke="#016B77" strokeWidth="1.5" />

      {/* === THERMOMETER in pocket === */}
      <g>
        {/* Thermometer body */}
        <rect x="112" y="90" width="4" height="16" rx="2" fill="#E8F4F8" />
        {/* Thermometer bulb */}
        <circle cx="114" cy="92" r="3" fill="#FF6B6B" />
        {/* Mercury line */}
        <rect x="113" y="92" width="2" height="10" rx="1" fill="#FF6B6B" opacity="0.6" />
        {/* Thermometer cap */}
        <rect x="112.5" y="105" width="3" height="2" rx="0.5" fill="#CBD5E1" />
      </g>

      {/* === HEAD === */}
      {/* Head circle — skin tone */}
      <circle cx="100" cy="62" r="30" fill="#FBBF7C" />
      {/* Cheek blush left */}
      <ellipse cx="82" cy="68" rx="6" ry="4" fill="#F9A05E" opacity="0.4" />
      {/* Cheek blush right */}
      <ellipse cx="118" cy="68" rx="6" ry="4" fill="#F9A05E" opacity="0.4" />

      {/* === SAFETY GOGGLES === */}
      {/* Goggle strap */}
      <path
        d="M72 56 C72 56 78 52 100 52 C122 52 128 56 128 56"
        stroke="#94A3B8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Left goggle lens */}
      <ellipse cx="88" cy="57" rx="12" ry="9" fill="#E8F4F8" stroke="#64748B" strokeWidth="2" />
      {/* Left lens shine */}
      <ellipse cx="84" cy="54" rx="4" ry="3" fill="white" opacity="0.6" />
      {/* Right goggle lens */}
      <ellipse cx="112" cy="57" rx="12" ry="9" fill="#E8F4F8" stroke="#64748B" strokeWidth="2" />
      {/* Right lens shine */}
      <ellipse cx="108" cy="54" rx="4" ry="3" fill="white" opacity="0.6" />
      {/* Goggle bridge */}
      <rect x="97" y="54" width="6" height="5" rx="2" fill="#64748B" />

      {/* Eyes behind goggles */}
      <circle cx="88" cy="58" r="3" fill="#1A1F3D" />
      <circle cx="112" cy="58" r="3" fill="#1A1F3D" />
      {/* Eye sparkle */}
      <circle cx="89.5" cy="57" r="1" fill="white" />
      <circle cx="113.5" cy="57" r="1" fill="white" />

      {/* Smile */}
      <path
        d="M90 72 C90 72 95 79 100 79 C105 79 110 72 110 72"
        stroke="#1A1F3D"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* === WINTER HAT (Vinterhue) === */}
      {/* Hat base — navy */}
      <path
        d="M68 50 C68 42 72 30 100 28 C128 30 132 42 132 50 L128 52 C128 52 118 48 100 48 C82 48 72 52 72 52 Z"
        fill="#1A1F3D"
      />
      {/* Hat fold / brim */}
      <path
        d="M70 50 C70 50 80 54 100 54 C120 54 130 50 130 50 C130 50 125 46 100 46 C75 46 70 50 70 50Z"
        fill="#028090"
      />
      {/* Pompom */}
      <circle cx="100" cy="22" r="8" fill="#00C9A7" />
      {/* Pompom texture */}
      <circle cx="97" cy="20" r="2" fill="#00B896" opacity="0.5" />
      <circle cx="103" cy="23" r="2" fill="#00B896" opacity="0.5" />
      <circle cx="100" cy="18" r="1.5" fill="#00DFC0" opacity="0.4" />

      {/* CL logo on hat */}
      <text
        x="100"
        y="42"
        textAnchor="middle"
        fill="#00C9A7"
        fontSize="10"
        fontWeight="800"
        fontFamily="system-ui, sans-serif"
      >
        CL
      </text>

      {/* Hat stripes */}
      <line x1="78" y1="37" x2="122" y2="37" stroke="#028090" strokeWidth="2" opacity="0.4" />
      <line x1="75" y1="42" x2="125" y2="42" stroke="#00C9A7" strokeWidth="1.5" opacity="0.3" />

      {/* === LEFT ARM (waving or resting) === */}
      {waving ? (
        <g>
          {/* Waving arm */}
          <path
            d="M60 105 C50 95 42 78 38 68"
            stroke="#028090"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="38" cy="66" r="8" fill="#FBBF7C" />
          {/* Waving lines */}
          <path d="M26 58 L22 54" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M28 50 L24 46" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M34 46 L32 40" stroke="#00C9A7" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </g>
      ) : (
        <g>
          {/* Resting arm */}
          <path
            d="M60 108 C52 118 50 130 52 140"
            stroke="#028090"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="52" cy="142" r="8" fill="#FBBF7C" />
        </g>
      )}

      {/* === RIGHT ARM with phone === */}
      {withPhone ? (
        <g>
          {/* Arm holding phone */}
          <path
            d="M140 105 C148 100 155 92 158 84"
            stroke="#028090"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Hand */}
          <circle cx="158" cy="82" r="8" fill="#FBBF7C" />

          {/* Phone */}
          <g transform="rotate(-15, 162, 72)">
            <rect x="149" y="55" width="22" height="36" rx="4" fill="#1A1F3D" />
            {/* Screen */}
            <rect x="151" y="59" width="18" height="26" rx="2" fill="#E8F4F8" />
            {/* QR code on screen */}
            <rect x="155" y="63" width="4" height="4" fill="#028090" />
            <rect x="161" y="63" width="4" height="4" fill="#028090" />
            <rect x="155" y="69" width="4" height="4" fill="#028090" />
            <rect x="161" y="69" width="4" height="4" fill="#00C9A7" />
            <rect x="155" y="75" width="4" height="4" fill="#00C9A7" />
            <rect x="161" y="75" width="4" height="4" fill="#028090" />
            {/* Scan line */}
            <line x1="153" y1="72" x2="167" y2="72" stroke="#FF6B6B" strokeWidth="1" opacity="0.8">
              <animate
                attributeName="y1"
                values="63;81;63"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="y2"
                values="63;81;63"
                dur="2s"
                repeatCount="indefinite"
              />
            </line>
          </g>
        </g>
      ) : (
        <g>
          {/* Resting arm */}
          <path
            d="M140 108 C148 118 150 130 148 140"
            stroke="#028090"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="148" cy="142" r="8" fill="#FBBF7C" />
        </g>
      )}

      {/* === FEET === */}
      {/* Left boot */}
      <ellipse cx="84" cy="172" rx="14" ry="7" fill="#1A1F3D" />
      <ellipse cx="82" cy="170" rx="8" ry="3" fill="#2A3060" opacity="0.4" />
      {/* Right boot */}
      <ellipse cx="116" cy="172" rx="14" ry="7" fill="#1A1F3D" />
      <ellipse cx="114" cy="170" rx="8" ry="3" fill="#2A3060" opacity="0.4" />

      {/* Legs */}
      <rect x="80" y="155" width="10" height="18" rx="5" fill="#016B77" />
      <rect x="110" y="155" width="10" height="18" rx="5" fill="#016B77" />
    </svg>
  );
}

/** Small mascot head only — for inline use */
export function MascotHead({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Head */}
      <circle cx="40" cy="42" r="24" fill="#FBBF7C" />
      {/* Cheeks */}
      <ellipse cx="26" cy="47" rx="5" ry="3" fill="#F9A05E" opacity="0.4" />
      <ellipse cx="54" cy="47" rx="5" ry="3" fill="#F9A05E" opacity="0.4" />

      {/* Goggles */}
      <path d="M16 36 C16 36 22 33 40 33 C58 33 64 36 64 36" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="32" cy="37" rx="10" ry="7" fill="#E8F4F8" stroke="#64748B" strokeWidth="1.5" />
      <ellipse cx="29" cy="35" rx="3" ry="2" fill="white" opacity="0.6" />
      <ellipse cx="48" cy="37" rx="10" ry="7" fill="#E8F4F8" stroke="#64748B" strokeWidth="1.5" />
      <ellipse cx="45" cy="35" rx="3" ry="2" fill="white" opacity="0.6" />
      <rect x="39" y="35" width="3" height="4" rx="1" fill="#64748B" />

      {/* Eyes */}
      <circle cx="32" cy="38" r="2.5" fill="#1A1F3D" />
      <circle cx="48" cy="38" r="2.5" fill="#1A1F3D" />
      <circle cx="33" cy="37" r="0.8" fill="white" />
      <circle cx="49" cy="37" r="0.8" fill="white" />

      {/* Smile */}
      <path d="M34 50 C34 50 37 55 40 55 C43 55 46 50 46 50" stroke="#1A1F3D" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hat */}
      <path d="M14 32 C14 24 20 12 40 10 C60 12 66 24 66 32 L62 34 C62 34 54 30 40 30 C26 30 18 34 18 34 Z" fill="#1A1F3D" />
      <path d="M16 32 C16 32 24 35 40 35 C56 35 64 32 64 32 C64 32 58 29 40 29 C22 29 16 32 16 32Z" fill="#028090" />
      <circle cx="40" cy="6" r="6" fill="#00C9A7" />
      <circle cx="38" cy="4.5" r="1.5" fill="#00B896" opacity="0.5" />
      <circle cx="43" cy="7" r="1.5" fill="#00B896" opacity="0.5" />
      <text x="40" y="25" textAnchor="middle" fill="#00C9A7" fontSize="8" fontWeight="800" fontFamily="system-ui, sans-serif">CL</text>
    </svg>
  );
}

/** Mascot peeking from the side — for decorative corners */
export function MascotPeek({ className = "w-32", side = "right" }: { className?: string; side?: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 100 120"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: side === "left" ? "scaleX(-1)" : undefined }}
    >
      {/* Body peeking */}
      <ellipse cx="80" cy="90" rx="35" ry="40" fill="#028090" />

      {/* Head */}
      <circle cx="65" cy="45" r="25" fill="#FBBF7C" />

      {/* Cheeks */}
      <ellipse cx="52" cy="50" rx="4" ry="3" fill="#F9A05E" opacity="0.4" />

      {/* Goggles */}
      <path d="M42 40 C42 40 48 37 65 37 C82 37 88 40 88 40" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="56" cy="41" rx="9" ry="7" fill="#E8F4F8" stroke="#64748B" strokeWidth="1.5" />
      <ellipse cx="53" cy="39" rx="3" ry="2" fill="white" opacity="0.5" />
      <ellipse cx="74" cy="41" rx="9" ry="7" fill="#E8F4F8" stroke="#64748B" strokeWidth="1.5" />
      <ellipse cx="71" cy="39" rx="3" ry="2" fill="white" opacity="0.5" />
      <rect x="63" y="39" width="3" height="3" rx="1" fill="#64748B" />

      {/* Eyes */}
      <circle cx="56" cy="42" r="2.5" fill="#1A1F3D" />
      <circle cx="74" cy="42" r="2.5" fill="#1A1F3D" />
      <circle cx="57" cy="41" r="0.8" fill="white" />
      <circle cx="75" cy="41" r="0.8" fill="white" />

      {/* Smile */}
      <path d="M58 53 C58 53 62 57 65 57 C68 57 72 53 72 53" stroke="#1A1F3D" strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Hat */}
      <path d="M38 36 C38 30 44 18 65 16 C86 18 92 30 92 36 L88 38 C88 38 80 35 65 35 C50 35 42 38 42 38 Z" fill="#1A1F3D" />
      <path d="M40 36 C40 36 48 39 65 39 C82 39 90 36 90 36 C90 36 84 33 65 33 C46 33 40 36 40 36Z" fill="#028090" />
      <circle cx="65" cy="11" r="6" fill="#00C9A7" />
      <text x="65" y="29" textAnchor="middle" fill="#00C9A7" fontSize="7" fontWeight="800" fontFamily="system-ui, sans-serif">CL</text>

      {/* Waving hand */}
      <circle cx="38" cy="70" r="7" fill="#FBBF7C" />
      <path d="M50 72 C44 68 40 70 38 70" stroke="#028090" strokeWidth="8" strokeLinecap="round" fill="none" />
    </svg>
  );
}
