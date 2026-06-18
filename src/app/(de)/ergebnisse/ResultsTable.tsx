"use client";

import { useState } from "react";

interface ResultItem {
  filename: string;
  date: number;
  edition: number;
}

interface ResultLinkItem {
  name: string;
  link: string;
  color: string;
}

interface PhotoFinishItem {
  edition: number;
  link: string;
}

interface ResultsTableProps {
  results: ResultItem[];
  daysAwayEvent: number;
  liveResultsLink: string;
  resultLinks: ResultLinkItem[];
  photofinish: PhotoFinishItem[];
}

export default function ResultsTable({
  results,
  daysAwayEvent,
  liveResultsLink,
  resultLinks,
  photofinish,
}: ResultsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");

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
        <div className="flex flex-col gap-4 p-5 bg-gradient-to-r from-red-950/40 to-tourOrange/15 border border-red-500/20 rounded-2xl backdrop-blur-xs animate-pulse">
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
        <div className="relative w-full sm:max-w-xs shrink-0">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Jahr oder Austragung (z.B. 60)..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 hover:border-white/20 focus:border-tourLightOrange rounded-xl text-sm font-medium text-white placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-tourLightOrange/20 transition duration-300"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-white transition"
              aria-label="Search löschen"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          )}
        </div>
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
                  const pFinish = photofinish.find((pf) => pf.edition === result.edition);
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
                          {/* PDF results link */}
                          <a
                            href={`/results/${result.filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase rounded-lg bg-tourOrange/10 border border-tourOrange/30 text-tourLightOrange hover:bg-tourOrange hover:text-white transition duration-300 shrink-0"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                            Ergebnisse (PDF)
                          </a>
                          
                          {/* Optional Photofinish link */}
                          {pFinish && (
                            <a
                              href={pFinish.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-black uppercase rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500 hover:text-white transition duration-300 shrink-0"
                            >
                              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
                              </svg>
                              Zielfoto (Photofinish)
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
              const pFinish = photofinish.find((pf) => pf.edition === result.edition);
              const year = new Date(result.date).getFullYear();
              return (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden backdrop-blur-xs group"
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
                    <a
                      href={`/results/${result.filename}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-tourOrange hover:bg-tourLightOrange text-white py-3 text-center text-sm font-bold transition-all duration-300"
                    >
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                      </svg>
                      Ergebnisse (PDF)
                    </a>
                    
                    {pFinish && (
                      <a
                        href={pFinish.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white py-3 text-center text-sm font-bold transition-all duration-300"
                      >
                        <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"></path>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"></path>
                        </svg>
                        Photofinish
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        /* Empty Search State */
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs gap-4 animate-fadeIn">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-gray-400 border border-white/10">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="flex flex-col gap-1 max-w-sm">
            <h3 className="font-wa-headline text-lg font-bold text-white">Keine Ergebnisse gefunden</h3>
            <p className="text-sm text-gray-400">
              Es wurden keine Austragungen für &quot;<strong className="text-white">{searchQuery}</strong>&quot; im Archiv gefunden.
            </p>
          </div>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 px-4 py-2 text-xs font-bold text-tourDarkBlue bg-white hover:bg-gray-100 rounded-xl transition duration-300"
          >
            Suche zurücksetzen
          </button>
        </div>
      )}

    </div>
  );
}
