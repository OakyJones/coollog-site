"use client";

import { useState } from "react";
import { LogoIcon } from "@/components/Icons";

/* ─────────────── Navigation ─────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#fordele", label: "Fordele" },
    { href: "#saadan-virker-det", label: "Sådan virker det" },
    { href: "#white-label", label: "White Label" },
    { href: "#priser", label: "Priser" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-navy-50/60">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5">
          <LogoIcon className="w-9 h-9" />
          <span className="text-xl font-bold text-navy">CoolLog</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-navy-400 hover:text-teal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="px-5 py-2.5 bg-teal text-white text-sm font-semibold rounded-lg hover:bg-teal-600 transition-colors"
          >
            Book demo
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-navy"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-navy-50/60 px-6 py-4 space-y-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="block text-sm font-medium text-navy-400 hover:text-teal"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#kontakt"
            className="block w-full text-center px-5 py-2.5 bg-teal text-white text-sm font-semibold rounded-lg"
            onClick={() => setOpen(false)}
          >
            Book demo
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────── Hero ─────────────── */
function Hero() {
  return (
    <section className="gradient-hero pt-32 pb-20 md:pt-40 md:pb-28 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 -right-32 w-96 h-96 bg-teal/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-mint/15 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-mint rounded-full animate-pulse" />
            <span className="text-mint text-sm font-medium">
              Digital udstyrsjournal til kølefirmaer
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Skrot papirjournalen.
            <br />
            <span className="text-mint">Scan, log, done.</span>
          </h1>

          <p className="text-lg md:text-xl text-teal-200 leading-relaxed mb-10 max-w-2xl">
            CoolLog er den digitale udstyrsjournal der følger anlægget — ikke
            virksomheden. Jeres teknikere scanner en QR-kode og logger eftersyn
            direkte fra mobilen. I jeres eget brand.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#kontakt"
              className="inline-flex items-center justify-center px-8 py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-400 transition-colors text-base"
            >
              Book en gratis demo
            </a>
            <a
              href="#saadan-virker-det"
              className="inline-flex items-center justify-center px-8 py-4 glass text-white font-semibold rounded-xl hover:bg-white/15 transition-colors text-base"
            >
              Se hvordan det virker
            </a>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
          <div className="w-64 h-[500px] bg-white/10 backdrop-blur-sm rounded-[2.5rem] border border-white/20 p-3 shadow-2xl">
            <div className="w-full h-full bg-white rounded-[2rem] p-4 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <LogoIcon className="w-6 h-6" />
                <span className="text-xs font-bold text-navy">CoolLog</span>
              </div>
              <div className="bg-ice rounded-xl p-3 mb-3">
                <p className="text-[10px] font-semibold text-navy mb-1">Anlæg #KL-4821</p>
                <p className="text-[9px] text-navy-400">Carrier 30XA · 12,5 kg R410A</p>
                <p className="text-[9px] text-navy-400">PED Kategori II</p>
              </div>
              <div className="space-y-2 flex-1">
                <div className="bg-teal/5 rounded-lg p-2.5 border-l-2 border-teal">
                  <p className="text-[9px] font-semibold text-teal">Eftersyn</p>
                  <p className="text-[8px] text-navy-400">19. mar 2026 · Tekn. J. Andersen</p>
                </div>
                <div className="bg-mint/5 rounded-lg p-2.5 border-l-2 border-mint">
                  <p className="text-[9px] font-semibold text-mint-700">Lækagekontrol</p>
                  <p className="text-[8px] text-navy-400">15. jan 2026 · Tekn. M. Petersen</p>
                </div>
                <div className="bg-navy/5 rounded-lg p-2.5 border-l-2 border-navy-200">
                  <p className="text-[9px] font-semibold text-navy">Reparation</p>
                  <p className="text-[8px] text-navy-400">02. dec 2025 · Tekn. J. Andersen</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="w-full py-2.5 bg-teal rounded-lg text-center">
                  <span className="text-[10px] font-bold text-white">+ Ny journalpost</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Stats bar ─────────────── */
function Stats() {
  const stats = [
    { value: "100%", label: "Lovpligtigt for anlæg >2,5 kg" },
    { value: "0 kr", label: "App-installation krævet" },
    { value: "< 30 sek", label: "At logge et eftersyn" },
    { value: "24/7", label: "Adgang til historik" },
  ];

  return (
    <section className="bg-ice py-10">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl md:text-3xl font-extrabold text-teal">{s.value}</p>
            <p className="text-sm text-navy-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────── Problem / Solution ─────────────── */
function Problem() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Papirjournalen er et problem
          </h2>
          <p className="text-lg text-navy-400 leading-relaxed">
            Bekendtgørelse 498 kræver at alle køleanlæg over 2,5 kg kølemiddel har
            en udstyrsjournal ved anlægget. I dag er det papir i en plastlomme —
            og det skaber reelle problemer.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Problems */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-wider mb-4">
              Med papir
            </h3>
            {[
              "Journaler forsvinder ved ejerskifte",
              "Ingen overblik over anlægsflåden",
              "Svært at overholde frister for eftersyn",
              "Teknikerne bruger tid på at finde og udfylde blanketter",
              "Tilsynsmyndigheden kræver dokumentation I ikke kan finde",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <p className="text-navy-400 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          {/* Solutions */}
          <div className="space-y-5">
            <h3 className="text-sm font-bold text-teal uppercase tracking-wider mb-4">
              Med CoolLog
            </h3>
            {[
              "Historikken følger anlægget — permanent og digitalt",
              "Dashboard med alle anlæg, status og næste eftersyn",
              "Automatiske påmindelser inden frister udløber",
              "Scan QR → log eftersyn på 30 sekunder fra mobilen",
              "Alt samlet ét sted — klar til tilsyn med ét klik",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 rounded-full bg-mint/15 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-navy-400 text-sm leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Features ─────────────── */
function Features() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <rect x="3" y="3" width="7" height="7" rx="1" />
          <rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" />
          <rect x="14" y="14" width="3" height="3" />
          <rect x="18" y="18" width="3" height="3" />
        </svg>
      ),
      title: "QR-baseret adgang",
      desc: "Hver QR-kode er bundet til anlæggets serienummer. Teknikeren scanner og er i gang — ingen app, ingen licens.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Kører i browseren",
      desc: "Progressive Web App — fungerer på alle telefoner uden installation. Også med kolde fingre og handsker.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      ),
      title: "Anlægsbundet historik",
      desc: "Journalen tilhører anlægget, ikke firmaet. Ved ejerskifte følger al dokumentation automatisk med.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      ),
      title: "Rollebaseret adgang",
      desc: "Aktivt kølefirma, tidligere kølefirma, anlægsejer og tilsynsmyndighed — alle med præcis de rettigheder de har brug for.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
        </svg>
      ),
      title: "Automatiske påmindelser",
      desc: "Systemet husker hvornår næste eftersyn er — og giver besked inden fristen udløber. Aldrig mere glemte kontroller.",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      ),
      title: "Compliance-rapporter",
      desc: "Generér dokumentation klar til Arbejdstilsynet med ét klik. PED-kategorier, inspektionshistorik og certifikater samlet.",
    },
  ];

  return (
    <section id="fordele" className="py-20 md:py-28 bg-ice/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Alt hvad I har brug for
          </h2>
          <p className="text-lg text-navy-400 max-w-2xl mx-auto">
            Bygget specifikt til danske kølefirmaer og den regulatoriske
            virkelighed med PED-kategorier og Bekendtgørelse 498.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-navy-50/40 hover:shadow-md hover:border-teal/30 transition-all group"
            >
              <div className="w-12 h-12 bg-teal/10 rounded-xl flex items-center justify-center text-teal mb-4 group-hover:bg-teal group-hover:text-white transition-colors">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{f.title}</h3>
              <p className="text-sm text-navy-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── How it works ─────────────── */
function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "QR-label monteres",
      desc: "Fysisk QR-kode med unikt ID monteres på køleanlægget og bindes til serienummer og stamdata.",
      color: "bg-teal",
    },
    {
      num: "02",
      title: "Tekniker scanner",
      desc: "Teknikeren scanner QR-koden med sin mobil. Ingen app — det hele åbner direkte i browseren.",
      color: "bg-teal-600",
    },
    {
      num: "03",
      title: "Login med OTP",
      desc: "Teknikeren logger ind med email og engangskode. Sikkert, hurtigt og uden password at huske.",
      color: "bg-navy-400",
    },
    {
      num: "04",
      title: "Log eftersyn",
      desc: "Vælg type (eftersyn, lækagekontrol, reparation), udfyld felter, vedhæft foto — færdig.",
      color: "bg-navy",
    },
  ];

  return (
    <section id="saadan-virker-det" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Sådan virker det
          </h2>
          <p className="text-lg text-navy-400 max-w-2xl mx-auto">
            Fra QR-kode til journalpost på under 30 sekunder.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-teal/30 to-teal/10" />
              )}
              <div className={`w-14 h-14 ${s.color} rounded-2xl flex items-center justify-center mb-5`}>
                <span className="text-white font-bold text-lg">{s.num}</span>
              </div>
              <h3 className="text-lg font-bold text-navy mb-2">{s.title}</h3>
              <p className="text-sm text-navy-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── White Label ─────────────── */
function WhiteLabel() {
  return (
    <section id="white-label" className="py-20 md:py-28 gradient-hero relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Jeres brand.
              <br />
              <span className="text-mint">Vores platform.</span>
            </h2>
            <p className="text-lg text-teal-200 leading-relaxed mb-8">
              CoolLog kører som white label — jeres kunder ser jeres logo, jeres
              farver og jeres domæne. Vi leverer teknologien, I leverer
              kunderelationen.
            </p>

            <div className="space-y-4">
              {[
                "Eget logo og farvepalette",
                "Eget domæne (f.eks. journal.jeresfirma.dk)",
                "Jeres brand på QR-labels",
                "Kunden ser aldrig CoolLog-brandet",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-mint/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-mint" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-teal-100 text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* White label mockup */}
          <div className="flex justify-center">
            <div className="glass rounded-2xl p-8 max-w-sm w-full">
              <div className="bg-white rounded-xl p-5 shadow-lg">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500" />
                  <div>
                    <p className="text-sm font-bold text-navy">Jeres Firma</p>
                    <p className="text-[11px] text-navy-300">journal.jeresfirma.dk</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-100 rounded-full w-3/4" />
                  <div className="h-3 bg-gray-100 rounded-full w-1/2" />
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="h-2.5 bg-blue-200 rounded-full w-2/3 mb-2" />
                    <div className="h-2.5 bg-blue-100 rounded-full w-1/2" />
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <div className="h-2.5 bg-purple-200 rounded-full w-3/4 mb-2" />
                    <div className="h-2.5 bg-purple-100 rounded-full w-1/3" />
                  </div>
                </div>
              </div>
              <p className="text-center text-white/50 text-xs mt-4">
                Powered by CoolLog
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Access model ─────────────── */
function AccessModel() {
  const roles = [
    {
      role: "Aktivt kølefirma",
      icon: "🔧",
      rights: [
        "Redigér stamdata",
        "Fuld adgang til egen historik",
        "Readonly på andres historik",
        "Upload dokumenter",
      ],
    },
    {
      role: "Tidl. kølefirma",
      icon: "📋",
      rights: [
        "Readonly på stamdata",
        "Readonly på egen historik",
        "Ingen adgang til andres data",
        "Kun egne dokumenter",
      ],
    },
    {
      role: "Anlægsejer",
      icon: "🏢",
      rights: [
        "Readonly på alt",
        "Ser ALLE firmaers historik",
        "Adgang til alle dokumenter",
        "Fuldt compliance-overblik",
      ],
    },
    {
      role: "Tilsynsmyndighed",
      icon: "🔍",
      rights: [
        "Readonly audit-adgang",
        "Adgang til al historik",
        "Compliance-rapporter",
        "PED-dokumentation",
      ],
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-ice/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Præcise rettigheder for alle parter
          </h2>
          <p className="text-lg text-navy-400 max-w-2xl mx-auto">
            Når et anlæg skifter kølefirma, bevares al historik. Det nye firma
            logger fremadrettet — ejeren ser alt.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {roles.map((r) => (
            <div
              key={r.role}
              className="bg-white rounded-2xl p-6 shadow-sm border border-navy-50/40"
            >
              <div className="text-3xl mb-3">{r.icon}</div>
              <h3 className="text-base font-bold text-navy mb-4">{r.role}</h3>
              <ul className="space-y-2">
                {r.rights.map((right) => (
                  <li key={right} className="flex items-start gap-2 text-sm text-navy-400">
                    <svg className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                    </svg>
                    {right}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Pricing ─────────────── */
function Pricing() {
  return (
    <section id="priser" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4">
            Simpel, gennemsigtig prissætning
          </h2>
          <p className="text-lg text-navy-400 max-w-2xl mx-auto">
            Betal per anlæg. Ingen skjulte gebyrer, ingen binding.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Simpel */}
          <div className="rounded-2xl border-2 border-navy-50 p-8 hover:border-teal/30 transition-colors">
            <h3 className="text-sm font-bold text-teal uppercase tracking-wider mb-2">
              Simpel
            </h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-extrabold text-navy">12 kr</span>
              <span className="text-navy-300 text-sm">/anlæg/md</span>
            </div>
            <p className="text-sm text-navy-400 mb-6">
              Minimum 499 kr/md. Til jer der allerede har asset management.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Digital udstyrsjournal",
                "Stamdata & anlægshistorik",
                "QR-kode scanning",
                "OTP-login for teknikere",
                "Dokumentupload",
                "Rollebaseret adgang",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-navy-400">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="#kontakt"
              className="block w-full text-center py-3.5 border-2 border-teal text-teal font-semibold rounded-xl hover:bg-teal hover:text-white transition-colors"
            >
              Start gratis pilot
            </a>
          </div>

          {/* Udvidet */}
          <div className="rounded-2xl border-2 border-teal bg-gradient-to-b from-teal/[0.03] to-transparent p-8 relative">
            <div className="absolute -top-3.5 left-8 px-4 py-1 bg-teal text-white text-xs font-bold rounded-full">
              Mest populær
            </div>
            <h3 className="text-sm font-bold text-teal uppercase tracking-wider mb-2">
              Udvidet
            </h3>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="text-4xl font-extrabold text-navy">24 kr</span>
              <span className="text-navy-300 text-sm">/anlæg/md</span>
            </div>
            <p className="text-sm text-navy-400 mb-6">
              Minimum 999 kr/md. Alt-i-én løsning med dashboard og rapporter.
            </p>
            <div className="space-y-3 mb-8">
              {[
                "Alt fra Simpel",
                "Interaktivt dashboard",
                "Automatiske påmindelser",
                "Compliance-rapporter",
                "Eget domæne",
                "White label (logo + farver)",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-teal flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-sm text-navy-400">{item}</span>
                </div>
              ))}
            </div>
            <a
              href="#kontakt"
              className="block w-full text-center py-3.5 bg-teal text-white font-semibold rounded-xl hover:bg-teal-600 transition-colors"
            >
              Start gratis pilot
            </a>
          </div>
        </div>

        <p className="text-center text-sm text-navy-300 mt-8">
          QR-labels: 29 kr/stk. Gratis onboarding for de første 10 anlæg.
        </p>
      </div>
    </section>
  );
}

/* ─────────────── CTA / Contact ─────────────── */
function CTA() {
  return (
    <section id="kontakt" className="py-20 md:py-28 gradient-hero relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-mint/10 rounded-full blur-3xl" />

      <div className="max-w-3xl mx-auto px-6 text-center relative">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Klar til at digitalisere jeres udstyrsjournaler?
        </h2>
        <p className="text-lg text-teal-200 mb-10 max-w-2xl mx-auto leading-relaxed">
          Vi tilbyder en gratis pilot med de første 10 anlæg, så I kan opleve
          CoolLog i praksis — helt uden risiko.
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/15 p-8 max-w-lg mx-auto">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <input
                type="text"
                placeholder="Firmanavn"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-mint/60 focus:ring-1 focus:ring-mint/60 transition-colors"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-mint/60 focus:ring-1 focus:ring-mint/60 transition-colors"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="Telefon"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-mint/60 focus:ring-1 focus:ring-mint/60 transition-colors"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Ca. antal anlæg"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:outline-none focus:border-mint/60 focus:ring-1 focus:ring-mint/60 transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-mint text-navy font-bold rounded-xl hover:bg-mint-400 transition-colors text-base mt-2"
            >
              Book en gratis demo
            </button>
          </form>
          <p className="text-white/40 text-xs mt-4">
            Vi vender tilbage inden for 24 timer.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer() {
  return (
    <footer className="bg-navy-500 py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <LogoIcon className="w-8 h-8" />
            <span className="text-lg font-bold text-white">CoolLog</span>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-teal-200">
              Et produkt fra{" "}
              <span className="font-semibold text-white">HalvfemsProcent</span>
            </p>
            <a
              href="mailto:hej@halvfemsprocent.dk"
              className="text-sm text-mint hover:text-mint-300 transition-colors"
            >
              hej@halvfemsprocent.dk
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-navy-200">
            &copy; {new Date().getFullYear()} HalvfemsProcent. Alle rettigheder forbeholdes.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Page ─────────────── */
export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Stats />
      <Problem />
      <Features />
      <HowItWorks />
      <WhiteLabel />
      <AccessModel />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
