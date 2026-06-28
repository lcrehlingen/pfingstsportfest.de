"use client";

import { useState, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import GlassCard from "@/components/GlassCard";
import CompetitionResultsModal from "@/components/CompetitionResultsModal";

interface ResultItem {
  filename: string;
  date: number;
  edition: number;
  competitionId?: number | null;
}

interface ResultLinkItem {
  name: string;
  link: string;
  color: string;
}

interface ResultsTableProps {
  results: ResultItem[];
  daysAwayEvent: number;
  liveResultsLink: string;
  resultLinks: ResultLinkItem[];
}

interface SelectedCompetition {
  id: number;
  name: string;
}

export default function ResultsTable({
  results,
  daysAwayEvent,
  liveResultsLink,
  resultLinks,
}: ResultsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedComp, setSelectedComp] = useState<SelectedCompetition | null>(null);

  // Synchronize browser history events for opening/closing the Results modal
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // If back button is clicked and we are currently displaying competition results, close it
      if (!e.state || !e.state.modal || !e.state.modal.startsWith("results-")) {
        setSelectedComp(null);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const handleOpenComp = (id: number, name: string) => {
    window.history.pushState({ modal: `results-${id}` }, "");
    setSelectedComp({ id, name });
  };

  const handleCloseComp = () => {
    if (window.history.state && window.history.state.modal === `results-${selectedComp?.id}`) {
      window.history.back();
    }
    setSelectedComp(null);
  };

  const filteredResults = results.filter((result) => {
    const year = new Date(result.date).getFullYear().toString();
    const edition = result.edition.toString();
    const query = searchQuery.toLowerCase();

    return (
      year.includes(query) ||
      edition.includes(query) ||
      `${edition}. pfingstsportfest`.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6 w-full text-white">
      
      {/* Live / Meet Season Active Dashboard */}
      {daysAwayEvent < 21 && (
        <div className="flex flex-col gap-4 p-5 bg-gradient-to-r from-red-950/40 to-tourOrange/15 border border-red-500/30 rounded-2xl backdrop-blur-md animate-pulse shadow-glow-orange">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-ping"></span>
            <span className="text-xs font-black uppercase tracking-widest text-red-400">Live-Saison Aktiv</span>
          </div>
          
          <h3 className="text-xl font-bold font-wa-headline text-white leading-tight">
            Wettkampf-Zentrale & Live-Berichterstattung
          </h3>
          <p className="text-sm text-gray-300 max-w-xl">
            Das Pfingstsportfest läuft oder steht unmittelbar bevor! Nutzen Sie die folgenden Live-Kanäle, um Entscheidungen, Ergebnisse und Streams in Echtzeit zu verfolgen.
          </p>

          <div className="flex flex-wrap gap-3 mt-1">
            {daysAwayEvent < 2 &&
              resultLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-tourOrange hover:bg-tourLightOrange text-white px-4 py-2.5 text-center text-sm font-bold transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-tourOrange/20 shrink-0"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  {link.name}
                </a>
              ))}
          </div>

          {/* Embedded live result frame */}
          <div className="w-full mt-3 rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            <div className="flex items-center justify-between p-3 border-b border-white/5 bg-white/5 text-xs text-gray-300">
              <span className="font-semibold">laportal.net Live-Ergebnisse Embed</span>
              <a href={liveResultsLink} target="_blank" rel="noopener noreferrer" className="hover:text-tourLightOrange underline">In neuem Tab öffnen ↗</a>
            </div>
            <iframe
              src={liveResultsLink}
              className="w-full h-[600px] border-none bg-white"
              title="laportal Live-Ergebnisse"
            />
          </div>
        </div>
      )}

      {/* Control Panel: Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
        <div className="flex flex-col gap-1">
          <h3 className="font-wa-headline text-lg font-bold text-white">Archivierte Ergebnislisten</h3>
          <p className="text-xs text-gray-400">Durchsuchen Sie alle Resultate vergangener Austragungen seit dem Jahr 2000.</p>
        </div>

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Jahr oder Austragung (z.B. 60)..."
        />
      </div>

      {/* Results View */}
      <div className="flex justify-between items-center text-xs text-gray-400 px-1">
        <span>Kategorie: <strong className="text-white">Ergebnisliste</strong></span>
        <span>{filteredResults.length} von {results.length} Listen</span>
      </div>

      {/* Grid Table View */}
      {filteredResults.length > 0 ? (
        <>
          {/* 1. Desktop Table */}
          <div className="hidden md:block overflow-hidden bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs shadow-xl">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-tourLightOrange">
                  <th className="py-4 px-6">Jahr</th>
                  <th className="py-4 px-6">Austragung</th>
                  <th className="py-4 px-6 text-right">Dokumente / Links</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredResults.map((result, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-white/5 transition duration-200 group"
                    >
                      <td className="py-4 px-6 font-mono text-lg font-bold text-[#C1FB6E]">
                        {new Date(result.date).getFullYear()}
                      </td>
                      <td className="py-4 px-6 text-base font-extrabold text-white group-hover:text-tourLightOrange transition-all duration-300">
                        {result.edition}. Internationales Pfingstsportfest
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="inline-flex items-center gap-2">
                          {result.competitionId ? (
                            /* Interactive live results from World Athletics */
                            <button
                              onClick={() => handleOpenComp(result.competitionId!, `${result.edition}. Internationales Pfingstsportfest Rehlingen`)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-black uppercase rounded-lg bg-tourOrange/15 border border-tourOrange/35 text-tourLightOrange hover:bg-tourOrange hover:text-white transition duration-300 shrink-0 cursor-pointer shadow-sm"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                              </svg>
                              Interaktive Ergebnisse
                            </button>
                          ) : (
                            /* Historical static PDF result files */
                            <a
                              href={`/results/${result.filename}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition duration-300 shrink-0"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                              </svg>
                              Ergebnisse (PDF)
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* 2. Mobile Responsive Card List */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredResults.map((result, index) => {
              const year = new Date(result.date).getFullYear();
              return (
                <GlassCard
                  key={index}
                  className="flex flex-col gap-4 group"
                  hoverable={false}
                >
                  {/* Colored Left Accent Border */}
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tourLightOrange"></div>

                  <div className="pl-2 flex justify-between items-start gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-xl font-black text-white leading-tight group-hover:text-tourLightOrange transition-all duration-300">
                        {result.edition}. Pfingstsportfest
                      </span>
                      <span className="text-xs text-gray-400">Internationales Meeting</span>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-[#C1FB6E]/10 border border-[#C1FB6E]/20 text-xs text-[#C1FB6E] font-extrabold tracking-wide font-mono">
                      {year}
                    </span>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="pl-2 flex flex-col sm:flex-row gap-2.5 border-t border-white/5 pt-4 mt-1">
                    {result.competitionId ? (
                      /* Interactive results from World Athletics */
                      <button
                        onClick={() => handleOpenComp(result.competitionId!, `${result.edition}. Pfingstsportfest Rehlingen`)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-tourOrange hover:bg-tourLightOrange text-white py-3 text-center text-sm font-bold transition-all duration-300 cursor-pointer"
                      >
                        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        Interaktive Ergebnisse
                      </button>
                    ) : (
                      /* Historical PDF file link */
                      <a
                        href={`/results/${result.filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 py-3 text-center text-sm font-bold transition-all duration-300"
                      >
                        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        Ergebnisse (PDF)
                      </a>
                    )}
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </>
      ) : (
        <EmptyState
          searchQuery={searchQuery}
          onReset={() => setSearchQuery("")}
          title="Keine Ergebnisse gefunden"
          description={
            <p>
              Es wurden keine Austragungen für &quot;<strong className="text-white">{searchQuery}</strong>&quot; im Archiv gefunden.
            </p>
          }
          resetButtonText="Suche zurücksetzen"
        />
      )}

      {/* Interactive Official World Athletics Results Overlay Panel */}
      {selectedComp && (
        <CompetitionResultsModal
          competitionId={selectedComp.id}
          competitionName={selectedComp.name}
          onClose={handleCloseComp}
        />
      )}

    </div>
  );
}
