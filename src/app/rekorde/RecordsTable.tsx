"use client";

import { useState } from "react";

interface RecordItem {
  Disziplin: string;
  Name: string;
  Land: string;
  Jahr: string;
  Leistung: string;
}

interface RecordsTableProps {
  recordsM: RecordItem[];
  recordsW: RecordItem[];
}

export default function RecordsTable({ recordsM, recordsW }: RecordsTableProps) {
  const [activeTab, setActiveTab] = useState<"m" | "w">("m");
  const [searchQuery, setSearchQuery] = useState("");

  const currentRecords = activeTab === "m" ? recordsM : recordsW;

  const filteredRecords = currentRecords.filter((record) => {
    const query = searchQuery.toLowerCase();
    return (
      record.Disziplin.toLowerCase().includes(query) ||
      record.Name.toLowerCase().includes(query) ||
      record.Land.toLowerCase().includes(query) ||
      record.Jahr.toLowerCase().includes(query) ||
      record.Leistung.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col gap-6 w-full text-white">
      
      {/* Control Panel: Search & Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
        
        {/* Gender Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => {
              setActiveTab("m");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 border ${
              activeTab === "m"
                ? "bg-tourLightOrange text-white border-tourLightOrange shadow-lg shadow-tourLightOrange/25"
                : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10"
            }`}
          >
            Männer
          </button>
          <button
            onClick={() => {
              setActiveTab("w");
              setSearchQuery("");
            }}
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 border ${
              activeTab === "w"
                ? "bg-tourLightOrange text-white border-tourLightOrange shadow-lg shadow-tourLightOrange/25"
                : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10"
            }`}
          >
            Frauen
          </button>
        </div>

        {/* Search Bar */}
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
            placeholder="Disziplin, Name, Land, Jahr..."
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

      {/* Results Status */}
      <div className="flex justify-between items-center text-xs text-gray-400 px-1">
        <span>Kategorie: <strong className="text-white">{activeTab === "m" ? "Männer" : "Frauen"}</strong></span>
        <span>{filteredRecords.length} von {currentRecords.length} Rekorden</span>
      </div>

      {/* Database View */}
      {filteredRecords.length > 0 ? (
        <>
          {/* 1. Desktop Table View */}
          <div className="hidden md:block overflow-hidden bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs shadow-xl">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/5 text-xs font-bold uppercase tracking-wider text-tourLightOrange">
                  <th className="py-4 px-6">Disziplin</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Land</th>
                  <th className="py-4 px-6 text-right">Leistung</th>
                  <th className="py-4 px-6 text-right">Jahr</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 font-medium">
                {filteredRecords.map((record, index) => (
                  <tr
                    key={index}
                    className="hover:bg-white/5 transition duration-200 group"
                  >
                    <td className="py-4 px-6 font-bold text-gray-300 text-base">
                      {record.Disziplin}
                    </td>
                    <td className="py-4 px-6 text-lg font-extrabold text-white group-hover:text-tourLightOrange transition-all duration-300">
                      {record.Name}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 border border-white/5 text-xs text-gray-300 font-bold tracking-wide">
                        {record.Land}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right font-black text-base text-[#C1FB6E]">
                      {record.Leistung}
                    </td>
                    <td className="py-4 px-6 text-right text-gray-300 font-mono">
                      {record.Jahr}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 2. Mobile Responsive Card List */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {filteredRecords.map((record, index) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden backdrop-blur-xs group"
              >
                {/* Colored Left Accent Border */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tourLightOrange"></div>

                <div className="pl-2 flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-tourLightOrange">
                      {record.Disziplin}
                    </span>
                    <h4 className="text-xl font-black text-white leading-tight group-hover:text-tourLightOrange transition-all duration-300">
                      {record.Name}
                    </h4>
                  </div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-white/10 border border-white/5 text-xs text-gray-300 font-bold tracking-wide">
                    {record.Land}
                  </span>
                </div>

                <div className="pl-2 flex justify-between items-end border-t border-white/5 pt-3 mt-1">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Jahr</span>
                    <span className="text-sm font-mono text-gray-200">{record.Jahr}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 uppercase font-semibold">Stadionrekord</span>
                    <span className="text-xl font-black text-[#C1FB6E] tracking-tight">{record.Leistung}</span>
                  </div>
                </div>
              </div>
            ))}
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
            <h3 className="font-wa-headline text-lg font-bold text-white">Keine Rekorde gefunden</h3>
            <p className="text-sm text-gray-400">
              Es wurden keine Einträge für &quot;<strong className="text-white">{searchQuery}</strong>&quot; in der Kategorie {activeTab === "m" ? "Männer" : "Frauen"} gefunden.
            </p>
          </div>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-2 px-4 py-2 text-xs font-bold text-tourDarkBlue bg-white hover:bg-gray-100 rounded-xl transition duration-300"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}

    </div>
  );
}
