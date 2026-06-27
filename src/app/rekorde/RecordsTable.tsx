"use client";

import { useState, useEffect } from "react";
import { RecordItem, COUNTRY_MAP, filterRecords } from "@/utils/records";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import GlassCard from "@/components/GlassCard";
import AthleteModal from "@/components/AthleteModal";

interface RecordsTableProps {
  recordsM: RecordItem[];
  recordsW: RecordItem[];
}

interface SelectedAthleteInfo {
  name: string;
  id?: number | null;
}

export default function RecordsTable({ recordsM, recordsW }: RecordsTableProps) {
  const [activeTab, setActiveTab] = useState<"m" | "w">("m");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAthlete, setSelectedAthlete] = useState<SelectedAthleteInfo | null>(null);

  // Synchronize browser history events for opening/closing the Athlete modal on the records page
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      // If back button is clicked and we are currently displaying an athlete profile, close it
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

  const currentRecords = activeTab === "m" ? recordsM : recordsW;

  const filteredRecords = filterRecords(currentRecords, searchQuery);

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
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 border cursor-pointer ${
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
            className={`flex-1 sm:flex-none px-6 py-3 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 border cursor-pointer ${
              activeTab === "w"
                ? "bg-tourLightOrange text-white border-tourLightOrange shadow-lg shadow-tourLightOrange/25"
                : "bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10"
            }`}
          >
            Frauen
          </button>
        </div>

        {/* Search Input */}
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Disziplin, Name, Land, Jahr..."
        />

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
                      {record.athleteId ? (
                        <button
                          onClick={() => handleOpenAthlete(record.Name, record.athleteId!)}
                          className="hover:underline cursor-pointer text-left focus:outline-hidden focus:text-tourLightOrange transition-colors duration-300"
                        >
                          {record.Name}
                        </button>
                      ) : (
                        record.Name
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/10 border border-white/5 text-xs text-gray-300 font-bold tracking-wide">
                        {COUNTRY_MAP[record.Land] || record.Land}
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
              <GlassCard
                key={index}
                className="flex flex-col gap-4 group"
                hoverable={false}
              >
                {/* Colored Left Accent Border */}
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tourLightOrange"></div>

                <div className="pl-2 flex justify-between items-start gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-extrabold uppercase tracking-widest text-tourLightOrange">
                      {record.Disziplin}
                    </span>
                    <h4 className="text-xl font-black text-white leading-tight group-hover:text-tourLightOrange transition-all duration-300">
                      {record.athleteId ? (
                        <button
                          onClick={() => handleOpenAthlete(record.Name, record.athleteId!)}
                          className="hover:underline cursor-pointer text-left focus:outline-hidden focus:text-tourLightOrange transition-colors duration-300"
                        >
                          {record.Name}
                        </button>
                      ) : (
                        record.Name
                      )}
                    </h4>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/10 border border-white/5 text-xs text-gray-300 font-bold tracking-wide">
                    {COUNTRY_MAP[record.Land] || record.Land}
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
              </GlassCard>
            ))}
          </div>
        </>
      ) : (
        <EmptyState
          searchQuery={searchQuery}
          onReset={() => setSearchQuery("")}
          title="Keine Rekorde gefunden"
          description={
            <p>
              Es wurden keine Einträge für &quot;
              <strong className="text-white">{searchQuery}</strong>
              &quot; in der Kategorie {activeTab === "m" ? "Männer" : "Frauen"} gefunden.
            </p>
          }
          resetButtonText="Filter zurücksetzen"
        />
      )}

      {/* Interactive Athlete In-Depth Profile Modal overlay */}
      {selectedAthlete && selectedAthlete.id && (
        <AthleteModal
          athleteName={selectedAthlete.name}
          athleteId={selectedAthlete.id}
          onClose={handleCloseAthlete}
        />
      )}

    </div>
  );
}
