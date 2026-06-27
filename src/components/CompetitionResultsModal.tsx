"use client";

import { useState, useEffect } from "react";
import GlassCard from "./GlassCard";
import AthleteModal from "./AthleteModal";
import EmptyState from "./EmptyState";
import { COUNTRY_MAP } from "@/utils/records";
import { WORLD_ATHLETICS_API } from "@/utils/constants";

interface Athlete {
  id: number;
  firstname: string;
  lastname: string;
  birthdate: string | null;
  country: string;
  sex: "M" | "W" | "X" | null;
}

interface ResultRow {
  place: number | null;
  mark: string;
  wind: number | null;
  country: string;
  athletes: Athlete[];
}

interface Race {
  race: string;
  raceId: number;
  results: ResultRow[];
}

interface EventItem {
  eventId: number;
  sex: "M" | "W" | "X" | null;
  discipline: string;
  disciplineCode: string;
  category?: string | null;
  isTechnical: boolean;
  races: Race[];
}

interface CompetitionResultsResponse {
  events: EventItem[];
}

interface CompetitionResultsModalProps {
  competitionId: number;
  competitionName: string;
  onClose: () => void;
}

export default function CompetitionResultsModal({
  competitionId,
  competitionName,
  onClose,
}: CompetitionResultsModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  // Use unique compound key "eventId-idx" to support duplicate events with same eventId
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedAthlete, setSelectedAthlete] = useState<{ name: string; id: number } | null>(null);
  const [genderFilter, setGenderFilter] = useState<"all" | "M" | "W">("all");

  useEffect(() => {
    let active = true;

    async function fetchResults() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${WORLD_ATHLETICS_API}/competitions/${competitionId}/results`
        );
        if (!res.ok) {
          throw new Error("Fehler beim Abrufen der World Athletics Ergebnisse.");
        }
        const data: CompetitionResultsResponse = await res.json();

        if (active) {
          // Filter out events that don't have races or results
          const validEvents = (data.events || []).filter(
            (e) => e.races && e.races.some((r) => r.results && r.results.length > 0)
          );

          // Determine the main competition category by finding the most frequent event category (mode)
          const categoryCounts: Record<string, number> = {};
          validEvents.forEach((e) => {
            if (e.category) {
              categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
            }
          });

          let mainCategory = "";
          let maxCount = 0;
          Object.entries(categoryCounts).forEach(([cat, count]) => {
            if (count > maxCount) {
              maxCount = count;
              mainCategory = cat;
            }
          });

          // Filter events to only keep those matching the main competition category
          const filteredByMainCategory = validEvents.filter(
            (e) => e.category === mainCategory
          );

          // Sort events alphabetically by discipline name, then by sex (M first, then W)
          const sortedEvents = filteredByMainCategory.sort((a, b) => {
            const nameA = a.discipline.toLowerCase();
            const nameB = b.discipline.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;

            const sexA = a.sex || "";
            const sexB = b.sex || "";
            if (sexA === "M" && sexB === "W") return -1;
            if (sexA === "W" && sexB === "M") return 1;
            return 0;
          });

          setEvents(sortedEvents);
          if (sortedEvents.length > 0) {
            setSelectedEventId(`${sortedEvents[0].eventId}-0`);
          }
          setLoading(false);
        }
      } catch (err: any) {
        if (active) {
          console.error(err);
          setError(err.message || "Unerwarteter Fehler beim Laden der Live-Ergebnisse.");
          setLoading(false);
        }
      }
    }

    fetchResults();

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
  }, [competitionId, onClose]);

  // Synchronize browser history events for opening/closing the nested Athlete modal
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // If back button is clicked and we are currently displaying an athlete, close it
      if (!e.state || !e.state.modal || !e.state.modal.startsWith("athlete-")) {
        setSelectedAthlete(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleOpenAthlete = (name: string, id: number) => {
    window.history.pushState({ modal: `athlete-${id}` }, "");
    setSelectedAthlete({ name, id });
  };

  const handleCloseAthlete = () => {
    if (window.history.state && window.history.state.modal === `athlete-${selectedAthlete?.id}`) {
      window.history.back();
    }
    setSelectedAthlete(null);
  };

  // Preserving absolute indexes when filtering by gender
  const filteredEventsWithIndexes = events
    .map((ev, idx) => ({ ev, key: `${ev.eventId}-${idx}` }))
    .filter(({ ev }) => {
      if (genderFilter === "all") return true;
      return ev.sex === genderFilter;
    });

  // Synchronize activeEvent selection when gender tab filter changes
  useEffect(() => {
    if (filteredEventsWithIndexes.length > 0) {
      const isStillVisible = filteredEventsWithIndexes.some(({ key }) => key === selectedEventId);
      if (!isStillVisible) {
        setSelectedEventId(filteredEventsWithIndexes[0].key);
      }
    } else {
      setSelectedEventId(null);
    }
  }, [genderFilter, events]);

  // Find selected event using unique compound key
  const activeEventIndex = selectedEventId ? parseInt(selectedEventId.split("-")[1]) : -1;
  const activeEvent = selectedEventId ? events[activeEventIndex] : undefined;

  // Dynamically check if at least one result in the active event carries a valid wind reading
  const showWindColumn = activeEvent
    ? activeEvent.races.some((race) =>
        race.results.some((row) => row.wind !== null && row.wind !== undefined)
      )
    : false;

  const getGenderLabel = (sex: "M" | "W" | "X" | null) => {
    if (sex === "M") return "Männer";
    if (sex === "W") return "Frauen";
    return "";
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      {/* Click shield backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      {/* Main Panel */}
      <GlassCard
        className="relative w-full max-w-4xl h-[85vh] overflow-hidden bg-tourDarkBlue/95 border border-white/10 p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col gap-6 z-10 animate-zoomIn"
        hoverable={false}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/5 transition duration-300 cursor-pointer"
          aria-label="Schließen"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Header Header Info block */}
        <div className="flex flex-col gap-1 pr-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-tourLightOrange bg-tourLightOrange/10 border border-tourLightOrange/20 max-w-fit">
            📊 World Athletics Offizielle Ergebnisse
          </span>
          <h2 className="font-wa-headline text-2xl md:text-3xl font-extrabold text-white leading-tight tracking-tight mt-1.5 line-clamp-1">
            {competitionName}
          </h2>
        </div>

        {loading ? (
          /* Loading State */
          <div className="flex flex-col items-center justify-center flex-1 gap-4">
            <div className="h-10 w-10 border-4 border-tourLightOrange border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm font-bold text-gray-300">Synchronisiere mit World Athletics Datenbank...</span>
          </div>
        ) : error ? (
          /* Unified Error State using EmptyState */
          <div className="flex-1 flex flex-col justify-center">
            <EmptyState
              searchQuery=""
              onReset={onClose}
              title="Ergebnisse nicht geladen"
              description={error}
              resetButtonText="Schließen"
            />
          </div>
        ) : events.length === 0 ? (
          /* Unified Empty State using EmptyState */
          <div className="flex-1 flex flex-col justify-center">
            <EmptyState
              searchQuery=""
              onReset={onClose}
              title="Keine Ergebnisse vorhanden"
              description="Es wurden keine offiziellen Ergebnisse für diese Austragung im Live-Portal gefunden."
              resetButtonText="Schließen"
            />
          </div>
        ) : (
          /* Main Interactive Layout: Sidebar + Data Table */
          <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden min-h-0">
            
            {/* Sidebar Event Selector */}
            <div className="w-full md:w-64 flex flex-col gap-2.5 shrink-0 border-r border-white/10 pr-2 overflow-y-auto max-h-[200px] md:max-h-full">
              <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest px-2 mb-0.5 hidden md:block">Disziplinen</span>
              
              {/* Gender Segment Tab Switch */}
              <div className="flex bg-white/5 border border-white/5 rounded-xl p-0.5 gap-1 shrink-0 select-none">
                {(["all", "M", "W"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setGenderFilter(tab)}
                    className={`flex-1 text-center text-[10px] md:text-xs py-2 rounded-lg font-extrabold tracking-wide transition-all duration-300 cursor-pointer border border-transparent ${
                      genderFilter === tab
                        ? "bg-tourLightOrange text-white border-white/5 shadow-sm font-black"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {tab === "all" ? "Alle" : tab === "M" ? "Männer" : "Frauen"}
                  </button>
                ))}
              </div>

              <div className="flex flex-row md:flex-col gap-1.5 pb-2 md:pb-0 overflow-x-auto md:overflow-x-visible shrink-0 md:shrink">
                {events.map((ev, idx) => {
                  const genderSuffix = getGenderLabel(ev.sex);
                  const isVisible = genderFilter === "all" || ev.sex === genderFilter;
                  if (!isVisible) return null;

                  const compoundKey = `${ev.eventId}-${idx}`;
                  const isSelected = compoundKey === selectedEventId;

                  // Detect visual duplicates to append "Lauf 1", "Lauf 2"
                  const hasDuplicate = events.some((other, otherIdx) => 
                    otherIdx !== idx && 
                    other.discipline === ev.discipline && 
                    other.sex === ev.sex
                  );

                  let displayName = ev.discipline;
                  if (genderSuffix && genderFilter === "all") {
                    displayName += ` (${genderSuffix})`;
                  }

                  if (hasDuplicate) {
                    const group = events.filter((other) => other.discipline === ev.discipline && other.sex === ev.sex);
                    const duplicateIdx = group.indexOf(ev) + 1;
                    displayName += ` - Lauf ${duplicateIdx}`;
                  }

                  return (
                    <button
                      key={compoundKey}
                      onClick={() => setSelectedEventId(compoundKey)}
                      className={`text-left text-xs md:text-sm px-3.5 py-2.5 rounded-xl font-bold transition-all duration-300 shrink-0 border select-none cursor-pointer ${
                        isSelected
                          ? "bg-tourLightOrange text-white border-tourLightOrange shadow-md"
                          : "bg-white/5 text-gray-300 border-white/5 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {displayName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Results Table Panel */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto min-h-0 pr-1">
              {activeEvent ? (
                <div className="flex flex-col gap-6 animate-fadeIn">
                  {activeEvent.races.map((raceItem, raceIdx) => (
                    <div key={raceIdx} className="flex flex-col gap-3">
                      
                      {/* Race Headline */}
                      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-2">
                        <h4 className="font-wa-headline font-bold text-lg text-white">
                          {raceItem.race || "Rennen"}
                        </h4>
                        <div className="flex items-center gap-2.5">
                          {activeEvent.category && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-sm bg-[#C1FB6E]/10 border border-[#C1FB6E]/20 text-[10px] text-[#C1FB6E] font-extrabold tracking-wide">
                              WA-Kategorie {activeEvent.category}
                            </span>
                          )}
                          <span className="text-xs text-gray-400 font-semibold uppercase">
                            Kategorie: {activeEvent.discipline} ({getGenderLabel(activeEvent.sex)})
                          </span>
                        </div>
                      </div>

                      {/* Performance Table */}
                      <div className="overflow-hidden bg-white/5 border border-white/5 rounded-2xl shadow-lg">
                        <table className="w-full border-collapse text-left text-sm">
                          <thead>
                            <tr className="border-b border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-tourLightOrange">
                              <th className="py-3 px-4 w-12 text-center">Pl.</th>
                              <th className="py-3 px-4">Name</th>
                              <th className="py-3 px-4 w-20">Land</th>
                              <th className="py-3 px-4 w-24 text-right">Leistung</th>
                              {showWindColumn && (
                                <th className="py-3 px-4 w-20 text-right">Wind</th>
                              )}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 font-medium">
                            {raceItem.results.map((row, rowIdx) => {
                              const athlete = row.athletes && row.athletes[0];
                              const athleteName = athlete
                                ? `${athlete.firstname} ${athlete.lastname}`
                                : "Unbekannt";
                              
                              return (
                                <tr key={rowIdx} className="hover:bg-white/5 transition duration-200">
                                  <td className="py-3 px-4 text-center font-mono font-bold text-gray-300">
                                    {row.place && row.place >= 0 ? row.place : "-"}
                                  </td>
                                  <td className="py-3 px-4 text-sm font-extrabold text-white">
                                    {athlete ? (
                                      <button
                                        onClick={() => handleOpenAthlete(athleteName, athlete.id)}
                                        className="hover:underline cursor-pointer text-left focus:outline-hidden focus:text-tourLightOrange transition"
                                      >
                                        {athleteName}
                                      </button>
                                    ) : (
                                      athleteName
                                    )}
                                  </td>
                                  <td className="py-3 px-4">
                                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-sm bg-white/10 text-[10px] text-gray-300 font-bold">
                                      {row.country || COUNTRY_MAP[row.country]}
                                    </span>
                                  </td>
                                  <td className="py-3 px-4 text-right font-black text-sm text-[#C1FB6E]">
                                    {row.mark || "-"}
                                  </td>
                                  {showWindColumn && (
                                    <td className="py-3 px-4 text-right text-xs font-mono text-gray-300">
                                      {row.place !== null && row.place >= 0 && row.wind !== null && row.wind !== undefined
                                        ? `${row.wind > 0 ? "+" : ""}${row.wind}`
                                        : "-"}
                                    </td>
                                  )}
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                    </div>
                  ))}
                </div>
              ) : (
                /* No discipline matches the selected gender tab */
                <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
                  <span className="text-3xl">⏱️</span>
                  <h4 className="font-wa-headline text-lg font-bold text-white mt-3">Keine Disziplinen</h4>
                  <p className="text-xs text-gray-400 mt-1 max-w-xs">
                    Für diesen Geschlechterfilter sind in dieser Austragung keine Ergebnisse verzeichnet.
                  </p>
                </div>
              )}
            </div>

          </div>
        )}
      </GlassCard>

      {/* Interactive Athlete Steckbrief inside results view */}
      {selectedAthlete && (
        <AthleteModal
          athleteName={selectedAthlete.name}
          athleteId={selectedAthlete.id}
          onClose={handleCloseAthlete}
        />
      )}
    </div>
  );
}
