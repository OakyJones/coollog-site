"use client";

import { useState, useEffect } from "react";
import { LogoIcon, Wordmark } from "@/components/Icons";
import { MascotHead } from "@/components/Mascot";
import { useRouter } from "next/navigation";

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  company: { id: string; name: string } | null;
}

interface EquipmentItem {
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
  status: string;
  owner: { name: string } | null;
  _count: { entries: number };
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/session").then((r) => r.json()),
      fetch("/api/equipment").then((r) => r.json()),
    ])
      .then(([sessionData, eqData]) => {
        if (!sessionData.authenticated) {
          router.push("/login");
          return;
        }
        setUser(sessionData.user);
        if (eqData.equipment) setEquipment(eqData.equipment);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ice to-white flex items-center justify-center">
        <p className="text-navy-400 text-sm animate-pulse">Indlæser dashboard...</p>
      </div>
    );
  }

  if (!user) return null;

  const overdue = equipment.filter(
    (e) => e.nextInspection && new Date(e.nextInspection) < new Date()
  );
  const upcoming = equipment.filter(
    (e) =>
      e.nextInspection &&
      new Date(e.nextInspection) >= new Date() &&
      new Date(e.nextInspection) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  );
  const totalEntries = equipment.reduce((sum, e) => sum + e._count.entries, 0);
  const totalCharge = equipment.reduce((sum, e) => sum + e.chargeKg, 0);

  const filtered = search
    ? equipment.filter(
        (e) =>
          e.qrCode.toLowerCase().includes(search.toLowerCase()) ||
          e.location.toLowerCase().includes(search.toLowerCase()) ||
          e.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
          e.serial.toLowerCase().includes(search.toLowerCase())
      )
    : equipment;

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      {/* Top bar */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <Wordmark className="text-base" />
            {user.company && (
              <span className="text-[10px] bg-teal/10 text-teal font-semibold px-2 py-0.5 rounded-full ml-1">
                {user.company.name}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-navy-400 hidden sm:block">{user.name}</span>
            <span className="text-[10px] bg-navy/5 text-navy-400 px-2 py-0.5 rounded-full capitalize">
              {user.role}
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-navy-300 hover:text-red-400 transition-colors"
            >
              Log ud
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        {/* Welcome */}
        <div className="flex items-center gap-3">
          <MascotHead className="w-12 h-12" />
          <div>
            <h1 className="text-2xl font-extrabold text-navy">Dashboard</h1>
            <p className="text-sm text-navy-400">
              Overblik over alle anlæg
              {user.company ? ` for ${user.company.name}` : ""}
            </p>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-4 border border-navy-50/40">
            <p className="text-2xl font-extrabold text-teal">{equipment.length}</p>
            <p className="text-xs text-navy-400">Anlæg</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-navy-50/40">
            <p className="text-2xl font-extrabold text-navy">{totalEntries}</p>
            <p className="text-xs text-navy-400">Journalposter</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-navy-50/40">
            <p className="text-2xl font-extrabold text-navy">{totalCharge.toFixed(1)} kg</p>
            <p className="text-xs text-navy-400">Kølemiddel total</p>
          </div>
          <div className="bg-white rounded-xl p-4 border border-navy-50/40">
            <p className={`text-2xl font-extrabold ${overdue.length > 0 ? "text-amber-500" : "text-teal"}`}>
              {overdue.length}
            </p>
            <p className="text-xs text-navy-400">Forfaldne eftersyn</p>
          </div>
        </div>

        {/* Alerts */}
        {overdue.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <p className="text-sm font-bold text-amber-700 mb-2">
              ⚠️ {overdue.length} anlæg har forfaldent eftersyn
            </p>
            <div className="space-y-1">
              {overdue.map((e) => (
                <button
                  key={e.id}
                  onClick={() => router.push(`/journal/${e.id}`)}
                  className="block w-full text-left text-xs text-amber-600 hover:text-amber-800 transition-colors"
                >
                  {e.qrCode} — {e.location} — planlagt{" "}
                  {new Date(e.nextInspection!).toLocaleDateString("da-DK")}
                </button>
              ))}
            </div>
          </div>
        )}

        {upcoming.length > 0 && (
          <div className="bg-teal/5 border border-teal/20 rounded-xl p-4">
            <p className="text-sm font-bold text-teal mb-2">
              {upcoming.length} anlæg har eftersyn inden 30 dage
            </p>
            <div className="space-y-1">
              {upcoming.map((e) => (
                <button
                  key={e.id}
                  onClick={() => router.push(`/journal/${e.id}`)}
                  className="block w-full text-left text-xs text-teal-700 hover:text-teal-900 transition-colors"
                >
                  {e.qrCode} — {e.location} — planlagt{" "}
                  {new Date(e.nextInspection!).toLocaleDateString("da-DK")}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søg anlæg (QR-kode, placering, fabrikant, serienummer)..."
            className="w-full px-4 py-3 bg-white rounded-xl border border-navy-100 text-navy text-sm focus:outline-none focus:border-teal focus:ring-1 focus:ring-teal transition-colors"
          />
        </div>

        {/* Equipment list */}
        <div className="space-y-3">
          {filtered.map((e) => {
            const isOverdue = e.nextInspection && new Date(e.nextInspection) < new Date();
            return (
              <button
                key={e.id}
                onClick={() => router.push(`/journal/${e.id}`)}
                className="w-full text-left bg-white rounded-xl border border-navy-50/40 p-4 hover:border-teal/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base font-bold text-navy">{e.qrCode}</span>
                      <span className="px-2 py-0.5 bg-teal/10 text-teal text-[10px] font-bold rounded-full">
                        PED {e.pedCategory}
                      </span>
                      {isOverdue && (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full">
                          Forfaldent
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-navy-400">
                      {e.manufacturer} {e.model} · {e.refrigerant} {e.chargeKg} kg
                    </p>
                    <p className="text-xs text-navy-300 mt-0.5">{e.location}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-sm font-bold text-teal">{e._count.entries}</p>
                    <p className="text-[10px] text-navy-300">poster</p>
                  </div>
                </div>
                {e.nextInspection && (
                  <p className="text-[10px] text-navy-300 mt-2">
                    Næste eftersyn: {new Date(e.nextInspection).toLocaleDateString("da-DK")}
                  </p>
                )}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-navy-400">Ingen anlæg fundet</p>
          </div>
        )}
      </div>
    </div>
  );
}
