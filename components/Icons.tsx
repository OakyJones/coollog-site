"use client";

export function LogoIcon({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="10" fill="#028090" />
      <path
        d="M12 14C12 12.8954 12.8954 12 14 12H22C23.1046 12 24 12.8954 24 14V20H14C12.8954 20 12 19.1046 12 18V14Z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M16 20H26C27.1046 20 28 20.8954 28 22V26C28 27.1046 27.1046 28 26 28H18C16.8954 28 16 27.1046 16 26V20Z"
        fill="#00C9A7"
      />
      <rect x="18" y="16" width="2" height="8" rx="1" fill="white" />
      <rect x="22" y="18" width="2" height="6" rx="1" fill="white" opacity="0.7" />
    </svg>
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
