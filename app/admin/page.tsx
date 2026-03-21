"use client";

import { useState, useEffect, useCallback } from "react";
import { LogoIcon } from "@/components/Icons";

type Company = {
  id: string;
  name: string;
  cvr: string | null;
  branchCode: string | null;
  branchText: string | null;
  status: string;
  createdAt: string;
  users: { id: string; name: string; email: string; phone: string | null; role: string }[];
  _count: { equipment: number; entries: number };
};

export default function AdminPage() {
  const [tab, setTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  const fetchCompanies = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/companies?status=${status}`);
      if (res.status === 403) {
        setAuthenticated(false);
        return;
      }
      const data = await res.json();
      setCompanies(data.companies || []);
      setAuthenticated(true);
    } catch {
      setAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompanies(tab);
  }, [tab, fetchCompanies]);

  const handleAction = async (companyId: string, action: "approve" | "reject") => {
    const rejectedNote = action === "reject"
      ? prompt("Begrundelse for afvisning (valgfrit):")
      : undefined;

    setActionLoading(companyId);
    try {
      const res = await fetch("/api/admin/companies", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId, action, rejectedNote }),
      });

      if (res.ok) {
        fetchCompanies(tab);
      }
    } finally {
      setActionLoading(null);
    }
  };

  if (authenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-ice to-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <LogoIcon className="w-12 h-12 mx-auto text-navy" />
          <h1 className="text-xl font-bold text-navy">Ikke autoriseret</h1>
          <p className="text-sm text-navy-400">Du skal være logget ind som superadmin.</p>
          <a href="/login" className="inline-block px-6 py-3 bg-teal text-white rounded-xl font-medium hover:bg-teal-600 transition-colors">
            Log ind
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ice to-white">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-navy-50/60 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LogoIcon className="w-7 h-7" />
            <span className="text-base font-bold text-navy">RefiLog</span>
            <span className="text-xs bg-navy text-white px-2 py-0.5 rounded-full font-medium ml-2">Admin</span>
          </div>
          <a href="/dashboard" className="text-sm text-teal font-medium hover:underline">
            Dashboard →
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-extrabold text-navy mb-6">Firma-godkendelse</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {([
            { key: "pending", label: "Afventer", color: "amber" },
            { key: "approved", label: "Godkendt", color: "mint" },
            { key: "rejected", label: "Afvist", color: "red" },
          ] as const).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                tab === key
                  ? "bg-navy text-white"
                  : "bg-white text-navy-400 border border-navy-100 hover:border-navy-200"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* List */}
        {loading ? (
          <div className="text-center py-12 text-navy-300">Henter firmaer...</div>
        ) : companies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-navy-300">Ingen firmaer med status &quot;{tab}&quot;</p>
          </div>
        ) : (
          <div className="space-y-4">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white rounded-2xl shadow-sm border border-navy-50/40 p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-bold text-navy text-lg">{company.name}</h3>
                      {company.cvr && (
                        <span className="text-xs bg-ice text-navy-400 px-2 py-0.5 rounded-full font-mono">
                          CVR: {company.cvr}
                        </span>
                      )}
                    </div>

                    {company.branchText && (
                      <p className="text-sm text-navy-400 mb-2">
                        Branche: <span className="text-navy">{company.branchText}</span>
                        {company.branchCode && (
                          <span className="text-navy-300 ml-1">({company.branchCode})</span>
                        )}
                      </p>
                    )}

                    <p className="text-xs text-navy-300 mb-4">
                      Registreret: {new Date(company.createdAt).toLocaleDateString("da-DK", {
                        day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </p>

                    {/* Kontaktperson */}
                    {company.users.length > 0 && (
                      <div className="bg-ice rounded-xl p-4">
                        <p className="text-xs font-medium text-navy-400 mb-2">Kontaktperson</p>
                        {company.users.map((user) => (
                          <div key={user.id} className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-teal/10 rounded-full flex items-center justify-center text-xs font-bold text-teal">
                              {user.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-navy">{user.name}</p>
                              <p className="text-xs text-navy-400">
                                {user.email}{user.phone ? ` · ${user.phone}` : ""}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {tab === "pending" && (
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleAction(company.id, "approve")}
                        disabled={actionLoading === company.id}
                        className="px-5 py-2.5 bg-mint text-white rounded-xl text-sm font-bold hover:bg-mint/80 transition-colors disabled:opacity-50"
                      >
                        {actionLoading === company.id ? "..." : "Godkend"}
                      </button>
                      <button
                        onClick={() => handleAction(company.id, "reject")}
                        disabled={actionLoading === company.id}
                        className="px-5 py-2.5 bg-white text-red-500 border border-red-200 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        Afvis
                      </button>
                    </div>
                  )}

                  {tab === "approved" && (
                    <div className="flex items-center gap-2 text-mint">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium">Godkendt</span>
                    </div>
                  )}

                  {tab === "rejected" && (
                    <div className="flex items-center gap-2 text-red-500">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className="text-sm font-medium">Afvist</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
