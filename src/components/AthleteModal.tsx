"use client";

import { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import EmptyState from "./EmptyState";
import { COUNTRY_MAP } from "@/utils/records";
import { WORLD_ATHLETICS_API } from "@/utils/constants";

interface Performance {
  date: string | null;
  discipline: string;
  disciplineCode: string;
  mark: string;
  wind: number | null;
  location: {
    city: string;
    country: string;
    indoor: boolean;
  };
  records: string[];
}

interface WorldRanking {
  eventGroup: string;
  place: number;
}

interface HonourResult {
  date: string | null;
  discipline: string;
  disciplineCode: string;
  mark: string;
  location: {
    stadium: string;
    city: string;
    country: string;
    indoor: boolean;
  };
  competition: string;
  place: number;
}

interface Honour {
  category: string;
  results: HonourResult[];
}

interface AthleteProfile {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string | null;
  country: string;
  sex: "M" | "W" | "X" | null;
  personalbests: Performance[];
  seasonsbests: Performance[];
  currentWorldRankings?: WorldRanking[];
  honours?: Honour[];
}

interface AthleteModalProps {
  athleteName: string;
  athleteId: number;
  onClose: () => void;
}

export default function AthleteModal({ athleteName, athleteId, onClose }: AthleteModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<AthleteProfile | null>(null);
  const [activeSection, setActiveTab] = useState<"pb" | "sb" | "rankings" | "honours">("pb");

  useEffect(() => {
    let active = true;

    async function fetchAthlete() {
      try {
        setLoading(true);
        setError(null);

        // Fetch full athlete profile directly using the required ID and centralized constant
        const profileRes = await fetch(
          `${WORLD_ATHLETICS_API}/athletes/${athleteId}`
        );
        if (!profileRes.ok) {
          throw new Error("Fehler beim Abrufen des Athletenprofils aus der Datenbank.");
        }
        const profileData = await profileRes.json();

        if (active) {
          setProfile(profileData);
          setLoading(false);
        }
      } catch (err: any) {
        if (active) {
          console.error(err);
          setError(err.message || "Ein unerwarteter Fehler ist aufgetreten.");
          setLoading(false);
        }
      }
    }

    fetchAthlete();

    // Escape key listener to close modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      active = false;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [athleteId, onClose]);

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Unbekannt";
    try {
      return new Date(dateStr).toLocaleDateString("de-DE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getYear = (dateStr: string | null) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).getFullYear().toString();
    } catch {
      return "";
    }
  };

  // Helper to format place as ordinal string (e.g. 1st, 2nd, 3rd, or 1. Platz, 2. Platz)
  const formatPlace = (place: number) => {
    return `${place}. Platz`;
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Modal Backdrop Click Shield */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      {/* Main Modal Card */}
      <GlassCard
        className="relative w-full max-w-2xl max-h-[92vh] md:max-h-[85vh] overflow-hidden bg-tourDarkBlue/95 border border-white/10 p-4 sm:p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col gap-4 sm:gap-6 z-10 animate-zoomIn"
        hoverable={false}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition duration-300 cursor-pointer z-20"
          aria-label="Schließen"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="h-10 w-10 border-4 border-tourLightOrange border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-bold text-gray-300">Suche Spuren in der World Athletics Datenbank...</span>
          </div>
        ) : error ? (
          /* Unified Error State using EmptyState */
          <EmptyState
            searchQuery=""
            onReset={onClose}
            title="Profil nicht verfügbar"
            description={error}
            resetButtonText="Schließen"
          />
        ) : (
          /* Profile Details Content */
          profile && (
            <div className="flex flex-col gap-4 sm:gap-6 w-full text-white overflow-hidden min-h-0">
              
              {/* Header profile metadata - added pr-10 to avoid close button overlap on mobile */}
              <div className="flex flex-col gap-2.5 pr-10 md:pr-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-tourLightOrange bg-tourLightOrange/10 border border-tourLightOrange/20 max-w-fit">
                  ⚡ Athleten-Steckbrief
                </span>
                
                <h2 className="font-wa-headline text-3xl md:text-4xl font-extrabold text-white leading-tight tracking-tight">
                  {profile.firstname} <span className="text-tourLightOrange">{profile.lastname}</span>
                </h2>

                <div className="flex flex-wrap items-center gap-3 mt-1.5">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/10 border border-white/5 text-xs text-gray-300 font-bold tracking-wide">
                    🏳️ {COUNTRY_MAP[profile.country] || profile.country}
                  </span>
                  {profile.birthdate && (
                    <span className="text-xs text-gray-400 font-medium">
                      Geboren am: <strong className="text-gray-200">{formatDate(profile.birthdate)}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Tab Navigation row */}
              <div className="flex items-center gap-1 border-b border-white/10 pb-1 mt-2 font-semibold overflow-x-auto select-none scrollbar-none">
                <button
                  onClick={() => setActiveTab("pb")}
                  className={`px-4 py-2.5 text-xs md:text-sm tracking-wide transition border-b-2 shrink-0 cursor-pointer ${
                    activeSection === "pb"
                      ? "border-tourLightOrange text-tourLightOrange font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Bestleistungen (PB)
                </button>
                
                <button
                  onClick={() => setActiveTab("sb")}
                  className={`px-4 py-2.5 text-xs md:text-sm tracking-wide transition border-b-2 shrink-0 cursor-pointer ${
                    activeSection === "sb"
                      ? "border-tourLightOrange text-tourLightOrange font-bold"
                      : "border-transparent text-gray-400 hover:text-white"
                  }`}
                >
                  Saisonbestleistungen
                </button>

                {profile.currentWorldRankings && profile.currentWorldRankings.length > 0 && (
                  <button
                    onClick={() => setActiveTab("rankings")}
                    className={`px-4 py-2.5 text-xs md:text-sm tracking-wide transition border-b-2 shrink-0 cursor-pointer ${
                      activeSection === "rankings"
                        ? "border-tourLightOrange text-tourLightOrange font-bold"
                        : "border-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    Weltrangliste
                  </button>
                )}

                {profile.honours && profile.honours.length > 0 && (
                  <button
                    onClick={() => setActiveTab("honours")}
                    className={`px-4 py-2.5 text-xs md:text-sm tracking-wide transition border-b-2 shrink-0 cursor-pointer ${
                      activeSection === "honours"
                        ? "border-tourLightOrange text-tourLightOrange font-bold"
                        : "border-transparent text-gray-400 hover:text-white"
                    }`}
                  >
                    Medaillen & Erfolge
                  </button>
                )}
              </div>

              {/* Tab Content Panels */}
              <div className="flex-1 overflow-y-auto pr-1.5 min-h-37.5">
                
                {/* 1. Personal Bests */}
                {activeSection === "pb" && (
                  profile.personalbests && profile.personalbests.length > 0 ? (
                    <ul className="divide-y divide-white/5 animate-fadeIn">
                      {profile.personalbests.map((pb, idx) => (
                        <li key={idx} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-white">{pb.discipline}</span>
                            <span className="text-xs text-gray-400">
                              {pb.location.city} ({pb.location.country}) {pb.location.indoor && "🏠"}
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-0.5 shrink-0 font-mono">
                            <span className="text-sm font-black text-[#C1FB6E]">{pb.mark} {pb.wind ? `(${pb.wind > 0 ? "+" : ""}${pb.wind} m/s)` : ""}</span>
                            <span className="text-[10px] text-gray-400">{formatDate(pb.date)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">Keine Bestleistungen eingetragen.</p>
                  )
                )}

                {/* 2. Season Bests */}
                {activeSection === "sb" && (
                  profile.seasonsbests && profile.seasonsbests.length > 0 ? (
                    <ul className="divide-y divide-white/5 animate-fadeIn">
                      {profile.seasonsbests.map((sb, idx) => (
                        <li key={idx} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-sm font-bold text-white">{sb.discipline}</span>
                            <span className="text-xs text-gray-400">
                              {sb.location.city} ({sb.location.country}) {sb.location.indoor && "🏠"}
                            </span>
                          </div>
                          <div className="flex flex-col items-end gap-0.5 shrink-0 font-mono">
                            <span className="text-sm font-black text-[#C1FB6E]">{sb.mark} {sb.wind ? `(${sb.wind > 0 ? "+" : ""}${sb.wind} m/s)` : ""}</span>
                            <span className="text-[10px] text-gray-400">{formatDate(sb.date)}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-400 py-4 text-center">Keine Saisonbestleistungen im Portal vermerkt.</p>
                  )
                )}

                {/* 3. World Rankings */}
                {activeSection === "rankings" && (
                  profile.currentWorldRankings && profile.currentWorldRankings.length > 0 ? (
                    <div className="flex flex-col gap-4 py-2 animate-fadeIn">
                      <p className="text-xs text-gray-400">Aktuelle, offizielle Positionen im World Athletics Ranking-System:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {profile.currentWorldRankings.map((rank, idx) => (
                          <div 
                            key={idx}
                            className="p-4 bg-white/5 border border-white/5 rounded-2xl flex justify-between items-center gap-4"
                          >
                            <span className="text-sm font-bold text-gray-200">{rank.eventGroup}</span>
                            <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-[#C1FB6E]/10 border border-[#C1FB6E]/20 text-sm text-[#C1FB6E] font-black font-mono">
                              #{rank.place}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}

                {/* 4. Honours & Medals */}
                {activeSection === "honours" && (
                  profile.honours && profile.honours.length > 0 ? (
                    <div className="flex flex-col gap-5 py-1 animate-fadeIn">
                      {profile.honours.map((honour, idx) => (
                        <div key={idx} className="flex flex-col gap-2.5">
                          <h4 className="font-wa-headline text-xs font-black tracking-widest text-tourLightOrange uppercase border-b border-white/5 pb-1">
                            🏆 {honour.category}
                          </h4>
                          <ul className="divide-y divide-white/5 pl-2">
                            {honour.results.map((res, rIdx) => (
                              <li key={rIdx} className="py-2.5 flex justify-between items-center gap-4">
                                <div className="flex flex-col gap-0.5">
                                  <span className="text-xs font-black uppercase text-gray-400 tracking-wider">
                                    {formatPlace(res.place)} — {res.discipline}
                                  </span>
                                  <span className="text-sm font-bold text-white">{res.competition}</span>
                                  <span className="text-xs text-gray-400">
                                    {res.location.city} ({res.location.country})
                                  </span>
                                </div>
                                <div className="flex flex-col items-end gap-0.5 shrink-0 font-mono text-right">
                                  <span className="text-sm font-extrabold text-[#C1FB6E]">{res.mark}</span>
                                  <span className="text-[10px] text-gray-400">{getYear(res.date)}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null
                )}

              </div>

              {/* Portal Notice / Footer */}
              <div className="text-[11px] text-gray-400 border-t border-white/5 pt-4 flex flex-wrap justify-between items-center gap-3 font-medium select-none">
                <span>Profil-ID: {profile.id}</span>
                <a
                  href={`https://worldathletics.org/athletes/ath/${profile.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-tourLightOrange hover:underline font-bold"
                >
                  Profil auf worldathletics.org ansehen ↗
                </a>
              </div>

            </div>
          )
        )}
      </GlassCard>
    </div>
  );
}
