"use client";

// Brand logomark: QR-finder patterns + snowflake/sun hybrid
export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1F7A8C" />
      {/* QR finder pattern top-left */}
      <rect x="6" y="6" width="12" height="12" rx="2" stroke="#48A9A6" strokeWidth="2" fill="none" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="#48A9A6" />
      {/* QR finder pattern top-right */}
      <rect x="22" y="6" width="12" height="12" rx="2" stroke="#48A9A6" strokeWidth="2" fill="none" />
      <rect x="25" y="9" width="6" height="6" rx="1" fill="#48A9A6" />
      {/* QR finder pattern bottom-left */}
      <rect x="6" y="22" width="12" height="12" rx="2" stroke="#48A9A6" strokeWidth="2" fill="none" />
      <rect x="9" y="25" width="6" height="6" rx="1" fill="#48A9A6" />
      {/* Snowflake/sun hybrid bottom-right */}
      <circle cx="28" cy="28" r="3" fill="#E8A44A" />
      <line x1="28" y1="22" x2="28" y2="24" stroke="#E8A44A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="28" y1="32" x2="28" y2="34" stroke="#EFF3F4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="22" y1="28" x2="24" y2="28" stroke="#EFF3F4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="32" y1="28" x2="34" y2="28" stroke="#E8A44A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23.8" y1="23.8" x2="25.2" y2="25.2" stroke="#E8A44A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30.8" y1="30.8" x2="32.2" y2="32.2" stroke="#EFF3F4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23.8" y1="32.2" x2="25.2" y2="30.8" stroke="#EFF3F4" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="30.8" y1="25.2" x2="32.2" y2="23.8" stroke="#E8A44A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Dots between QR patterns */}
      <circle cx="20" cy="10" r="1" fill="#48A9A6" opacity="0.5" />
      <circle cx="20" cy="14" r="1" fill="#48A9A6" opacity="0.5" />
      <circle cx="10" cy="20" r="1" fill="#48A9A6" opacity="0.5" />
      <circle cx="14" cy="20" r="1" fill="#48A9A6" opacity="0.5" />
    </svg>
  );
}

// Wordmark component for consistent branding
export function Wordmark({ className = "text-xl", darkBg = false }: { className?: string; darkBg?: boolean }) {
  return (
    <span className={`font-serif font-bold ${className}`}>
      <span className={darkBg ? "text-white" : "text-navy"}>Refi</span>
      <span className="text-sage">Log</span>
    </span>
  );
}

export function QrIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="3" height="3" />
      <rect x="18" y="18" width="3" height="3" />
      <rect x="14" y="18" width="3" height="3" />
      <rect x="18" y="14" width="3" height="3" />
    </svg>
  );
}
