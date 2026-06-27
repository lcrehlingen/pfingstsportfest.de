"use client";

import { useState, useMemo, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import GlassCard from "@/components/GlassCard";

interface PerformanceRankingItem {
  place: string;
  competitionId: string;
  competition: string;
  country: string;
  startDate: string;
  endDate: string;
  partScore: string;
  participationScorePlace: string;
  resultScore: string;
  resultScorePlace: string;
  competitionScore: string;
  competitionUrl: string;
}

interface RankingTableProps {
  data: PerformanceRankingItem[];
}

export default function RankingTable({ data }: RankingTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortQuery] = useState<
    "year-desc" | "year-asc" | "place-asc" | "score-desc" | "part-desc" | "result-desc"
  >("year-desc");
  const [chartMetric, setChartMetric] = useState<"score" | "place">("score");
  const [showInfo, setShowInfo] = useState(true);

  // Process data to calculate years and editions
  const rawItems = useMemo(() => {
    return data.map((item) => {
      const year = parseInt(item.startDate.split(" ").pop() || "0");
      let edition: number | null = null;
      if (year >= 2021) {
        edition = year - 1965;
      } else if (year >= 2001) {
        edition = year - 1964;
      }
      return {
        ...item,
        year,
        edition,
      };
    });
  }, [data]);

  // Filter out the current calendar year to ignore unfinalized placings/data
  const itemsWithDetails = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return rawItems.filter((item) => item.year !== currentYear);
  }, [rawItems]);

  // Dynamically find the latest available year to set as the default
  const latestAvailableYear = useMemo(() => {
    if (itemsWithDetails.length === 0) return null;
    return Math.max(...itemsWithDetails.map((i) => i.year));
  }, [itemsWithDetails]);

  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Initialize selectedYear dynamically once data is available
  useEffect(() => {
    if (latestAvailableYear && selectedYear === null) {
      setSelectedYear(latestAvailableYear);
    }
  }, [latestAvailableYear, selectedYear]);

  // Synchronize browser history events for selected year if needed
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.year) {
        setSelectedYear(e.state.year);
      }
    };
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // Find historical milestones dynamically
  const stats = useMemo(() => {
    if (itemsWithDetails.length === 0) return null;

    let bestPlace = itemsWithDetails[0];
    let bestScore = itemsWithDetails[0];
    let bestPartScore = itemsWithDetails[0];
    let bestResultScore = itemsWithDetails[0];

    itemsWithDetails.forEach((item) => {
      if (parseInt(item.place) < parseInt(bestPlace.place)) {
        bestPlace = item;
      }
      if (parseInt(item.competitionScore) > parseInt(bestScore.competitionScore)) {
        bestScore = item;
      }
      if (parseInt(item.partScore) > parseInt(bestPartScore.partScore)) {
        bestPartScore = item;
      }
      if (parseInt(item.resultScore) > parseInt(bestResultScore.resultScore)) {
        bestResultScore = item;
      }
    });

    return {
      bestPlace,
      bestScore,
      bestPartScore,
      bestResultScore,
    };
  }, [itemsWithDetails]);

  // Selected item for detail focus card
  const selectedItem = useMemo(() => {
    if (!selectedYear) return null;
    return itemsWithDetails.find((item) => item.year === selectedYear) || null;
  }, [itemsWithDetails, selectedYear]);

  // Sort chart data ascending by year for a chronological progression
  const chartData = useMemo(() => {
    return [...itemsWithDetails].sort((a, b) => a.year - b.year);
  }, [itemsWithDetails]);

  // Chart scaling calculations
  const chartBounds = useMemo(() => {
    if (chartData.length === 0) return { maxScore: 0, minScore: 0, maxPlace: 0, minPlace: 0 };
    const scores = chartData.map((i) => parseInt(i.competitionScore));
    const places = chartData.map((i) => parseInt(i.place));
    return {
      maxScore: Math.max(...scores),
      minScore: Math.min(...scores),
      maxPlace: Math.max(...places),
      minPlace: Math.min(...places),
    };
  }, [chartData]);

  // Filter and sort for the main table display
  const filteredAndSortedItems = useMemo(() => {
    const query = searchQuery.toLowerCase();
    const filtered = itemsWithDetails.filter((item) => {
      return (
        item.year.toString().includes(query) ||
        (item.edition && `${item.edition}. pfingstsportfest`.toLowerCase().includes(query)) ||
        (item.edition && `${item.edition}.`.toLowerCase().includes(query)) ||
        item.competition.toLowerCase().includes(query)
      );
    });

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "year-desc":
          return b.year - a.year;
        case "year-asc":
          return a.year - b.year;
        case "place-asc":
          return parseInt(a.place) - parseInt(b.place);
        case "score-desc":
          return parseInt(b.competitionScore) - parseInt(a.competitionScore);
        case "part-desc":
          return parseInt(b.partScore) - parseInt(a.partScore);
        case "result-desc":
          return parseInt(b.resultScore) - parseInt(a.resultScore);
        default:
          return b.year - a.year;
      }
    });
  }, [itemsWithDetails, searchQuery, sortBy]);

  const handleSelectYear = (year: number) => {
    window.history.replaceState({ year }, "");
    setSelectedYear(year);
  };

  const formatPoints = (pointsStr: string) => {
    const points = parseInt(pointsStr);
    if (isNaN(points)) return pointsStr;
    return new Intl.NumberFormat("de-DE").format(points);
  };

  return (
    <div className="flex flex-col gap-8 w-full text-white">
      {/* 1. Metric Dashboard (Dynamic Milestones) */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 bg-linear-to-b from-white/10 to-white/5 border border-tourLightOrange/40 rounded-2xl backdrop-blur-xs relative overflow-hidden shadow-lg shadow-tourOrange/10 group hover:border-tourLightOrange hover:shadow-tourOrange/20 transition-all duration-300">
            <div className="absolute top-0 right-0 w-20 h-20 bg-tourLightOrange/5 rounded-full blur-xl pointer-events-none"></div>
            <span className="text-xs font-semibold text-tourLightOrange uppercase tracking-wider block">
              🏆 Beste Platzierung
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-extrabold text-white">
                {stats.bestPlace.place}.
              </span>
              <span className="text-sm font-bold text-gray-300">Platz</span>
            </div>
            <span className="text-xs text-gray-400 mt-2 block">
              Historischer Weltrang im Jahr {stats.bestPlace.year} ({stats.bestPlace.edition}. Edition)
            </span>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs relative overflow-hidden hover:border-white/20 transition-all duration-300">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              📈 Höchste Gesamtpunkte
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-[#C1FB6E]">
                {formatPoints(stats.bestScore.competitionScore)}
              </span>
              <span className="text-xs text-[#C1FB6E] font-bold">Pkt.</span>
            </div>
            <span className="text-xs text-gray-400 mt-3 block">
              Aufgestellt im Jahr {stats.bestScore.year} ({stats.bestScore.edition}. Edition)
            </span>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs relative overflow-hidden hover:border-white/20 transition-all duration-300">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              🏃‍♂️ Beste Athletenbesetzung
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white">
                {formatPoints(stats.bestPartScore.partScore)}
              </span>
              <span className="text-xs text-tourLightOrange font-bold">
                (Platz {stats.bestPartScore.participationScorePlace})
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-3 block">
              Teilnehmer-Qualität im Jahr {stats.bestPartScore.year}
            </span>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs relative overflow-hidden hover:border-white/20 transition-all duration-300">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              ⚡ Beste Einzelleistungen
            </span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-3xl font-extrabold text-white">
                {formatPoints(stats.bestResultScore.resultScore)}
              </span>
              <span className="text-xs text-tourLightOrange font-bold">
                (Platz {stats.bestResultScore.resultScorePlace})
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-3 block">
              Ergebnis-Punkte im Jahr {stats.bestResultScore.year}
            </span>
          </div>
        </div>
      )}

      {/* 2. Interactive Historical Progression & Focus Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Card */}
        <div className="lg:col-span-2 p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-xl font-bold font-wa-headline text-white leading-tight">
                Historische Entwicklung
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Klicken Sie auf ein Jahr, um Details anzuzeigen und hervorzuheben.
              </p>
            </div>

            {/* Metric Switch */}
            <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/5 rounded-xl self-end sm:self-auto">
              <button
                onClick={() => setChartMetric("score")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  chartMetric === "score"
                    ? "bg-tourLightOrange text-white shadow-xs"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                WA-Punkte
              </button>
              <button
                onClick={() => setChartMetric("place")}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                  chartMetric === "place"
                    ? "bg-tourLightOrange text-white shadow-xs"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Weltrang
              </button>
            </div>
          </div>

          {/* Bar Chart Representation */}
          <div className="relative h-64 sm:h-72 flex items-end justify-between gap-1 sm:gap-2 px-1 pt-6 overflow-x-auto min-w-full pb-2 select-none scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {chartData.map((item) => {
              // Calculate heights
              let percent = 30; // base height
              if (chartMetric === "score" && chartBounds.maxScore !== chartBounds.minScore) {
                const score = parseInt(item.competitionScore);
                percent =
                  30 +
                  ((score - chartBounds.minScore) /
                    (chartBounds.maxScore - chartBounds.minScore)) *
                    65;
              } else if (chartMetric === "place" && chartBounds.maxPlace !== chartBounds.minPlace) {
                const place = parseInt(item.place);
                // Inverse because lower place number is better
                percent =
                  30 +
                  ((chartBounds.maxPlace - place) /
                    (chartBounds.maxPlace - chartBounds.minPlace)) *
                    65;
              }

              const isSelected = selectedYear === item.year;

              return (
                <div
                  key={item.year}
                  onClick={() => handleSelectYear(item.year)}
                  className="flex flex-col items-center flex-1 min-w-[20px] max-w-[40px] group cursor-pointer h-full justify-end"
                >
                  {/* Hover tooltip / Label */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -translate-y-8 bg-tourDarkBlue border border-white/20 px-2 py-1 rounded-md text-[10px] font-bold z-10 pointer-events-none whitespace-nowrap shadow-xl">
                    {chartMetric === "score"
                      ? `${formatPoints(item.competitionScore)} Pkt.`
                      : `Weltrang: ${item.place}.`}
                  </div>

                  {/* Bar */}
                  <div
                    style={{ height: `${percent}%` }}
                    className={`w-full rounded-t-lg transition-all duration-500 relative ${
                      isSelected
                        ? "bg-linear-to-t from-tourOrange to-tourLightOrange border-t border-x border-white/20 shadow-[0_0_15px_rgba(250,69,23,0.3)]"
                        : "bg-white/10 group-hover:bg-white/20"
                    }`}
                  >
                    {/* Tiny visual highlight inside the selected bar */}
                    {isSelected && (
                      <div className="absolute top-1 inset-x-1 h-1 bg-white/40 rounded-full blur-[1px]"></div>
                    )}
                  </div>

                  {/* Year Label */}
                  <span
                    className={`text-[9px] sm:text-[10px] font-bold mt-2 tracking-tighter ${
                      isSelected ? "text-tourLightOrange font-black" : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    {item.year.toString().slice(-2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Focus Detail Card */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs flex flex-col justify-between min-h-[320px]">
          {selectedItem ? (
            <div className="flex flex-col h-full justify-between gap-5 animate-fadeIn">
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-tourLightOrange bg-tourLightOrange/10 px-2 py-0.5 rounded-md">
                      {selectedItem.edition ? `${selectedItem.edition}. Edition` : "Pfingstsportfest"}
                    </span>
                    <h4 className="text-2xl font-black font-wa-headline text-white mt-1">
                      Austragung {selectedItem.year}
                    </h4>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">
                      Weltrang
                    </span>
                    <span className="text-3xl font-extrabold text-white leading-none">
                      #{selectedItem.place}
                    </span>
                  </div>
                </div>

                <div className="border-t border-white/5 my-1"></div>

                <div className="flex flex-col gap-3.5">
                  <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                    <span className="text-xs font-semibold text-gray-300">Gesamt-Score:</span>
                    <span className="text-lg font-black text-[#C1FB6E]">
                      {formatPoints(selectedItem.competitionScore)} <span className="text-xs text-[#C1FB6E]/80">Pkt.</span>
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 px-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-xs text-gray-300 font-medium">Teilnehmer-Qualität:</span>
                      <span className="font-bold text-white">
                        {formatPoints(selectedItem.partScore)} <span className="text-xs text-gray-400 font-normal">Pkt.</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>(Athletenbesetzung)</span>
                      <span>Rank: Platz {selectedItem.participationScorePlace}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 px-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-xs text-gray-300 font-medium">Einzelleistungen:</span>
                      <span className="font-bold text-white">
                        {formatPoints(selectedItem.resultScore)} <span className="text-xs text-gray-400 font-normal">Pkt.</span>
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-400">
                      <span>(Leistungsschnitt)</span>
                      <span>Rank: Platz {selectedItem.resultScorePlace}</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={selectedItem.competitionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-gray-100 px-4 py-3 text-center text-sm font-bold text-tourDarkBlue transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer mt-auto shadow-sm"
              >
                World Athletics Detailseite
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center p-4">
              <p className="text-sm text-gray-400">
                Wählen Sie ein Jahr in der Grafik aus, um Details anzuzeigen.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 3. Control Panel: Search & Sorting */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block sm:inline shrink-0">
            🔎 Suchen & Filtern
          </span>
          <SearchInput
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              // reset selected year if it doesn't match query
              const query = val.toLowerCase();
              if (query && selectedItem && !selectedItem.year.toString().includes(query)) {
                setSelectedYear(null);
              }
            }}
            placeholder="Jahr, Edition..."
            className="w-full sm:w-64"
          />
        </div>

        {/* Sort Select dropdown */}
        <div className="flex items-center gap-2.5 w-full md:w-auto self-end md:self-auto justify-end">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
            Sortieren nach:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortQuery(e.target.value as any)}
            className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-tourLightOrange rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-hidden cursor-pointer transition duration-300 w-full sm:w-auto min-w-[180px] max-w-full"
          >
            <option value="year-desc" className="bg-tourDarkBlue text-white">Jahr (Neuste zuerst)</option>
            <option value="year-asc" className="bg-tourDarkBlue text-white">Jahr (Älteste zuerst)</option>
            <option value="place-asc" className="bg-tourDarkBlue text-white">Welt-Platzierung (Beste)</option>
            <option value="score-desc" className="bg-tourDarkBlue text-white">Punkte (Höchste)</option>
            <option value="part-desc" className="bg-tourDarkBlue text-white">Athleten-Besetzung (Beste)</option>
            <option value="result-desc" className="bg-tourDarkBlue text-white">Sportergebnisse (Beste)</option>
          </select>
        </div>
      </div>

      {/* 4. Results List / Table */}
      {filteredAndSortedItems.length > 0 ? (
        <div className="flex flex-col gap-4">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-xs font-extrabold uppercase tracking-wider text-gray-400 bg-white/2 bg-opacity-10">
                  <th className="py-4.5 px-6">Jahr / Edition</th>
                  <th className="py-4.5 px-6">Welt-Rang</th>
                  <th className="py-4.5 px-6">Gesamt-Score</th>
                  <th className="py-4.5 px-6">Athleten-Qualität (Teilnehmer)</th>
                  <th className="py-4.5 px-6">Einzelleistungen (Ergebnisse)</th>
                  <th className="py-4.5 px-6 text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-medium">
                {filteredAndSortedItems.map((item) => {
                  const isSelected = selectedYear === item.year;
                  const isTop50 = parseInt(item.place) <= 50;
                  const isTop100 = parseInt(item.place) <= 100;

                  return (
                    <tr
                      key={item.year}
                      onClick={() => handleSelectYear(item.year)}
                      className={`hover:bg-white/5 transition duration-200 cursor-pointer ${
                        isSelected ? "bg-white/10 text-white font-semibold" : "text-gray-300"
                      }`}
                    >
                      <td className="py-4.5 px-6">
                        <div className="flex flex-col">
                          <span className="font-extrabold text-white text-base">
                            {item.year}
                          </span>
                          <span className="text-xs text-gray-400 mt-0.5">
                            {item.edition ? `${item.edition}. Pfingstsportfest` : "Rehlingen International"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black tracking-wider ${
                            isTop50
                              ? "bg-tourOrange/15 text-tourLightOrange border border-tourLightOrange/30 shadow-[0_0_8px_rgba(250,69,23,0.1)]"
                              : isTop100
                              ? "bg-white/10 text-white border border-white/15"
                              : "bg-white/5 text-gray-400"
                          }`}
                        >
                          Platz {item.place}
                        </span>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className="font-extrabold text-white">
                          {formatPoints(item.competitionScore)}
                        </span>
                        <span className="text-xs text-gray-400 font-normal ml-1">Pkt.</span>
                      </td>
                      <td className="py-4.5 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">
                            {formatPoints(item.partScore)}
                          </span>
                          <span className="text-xs text-gray-400">
                            Platz {item.participationScorePlace} im Teilnehmerschlüssel
                          </span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6">
                        <div className="flex flex-col">
                          <span className="font-bold text-white">
                            {formatPoints(item.resultScore)}
                          </span>
                          <span className="text-xs text-gray-400">
                            Platz {item.resultScorePlace} im Leistungsschnitt
                          </span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={item.competitionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center p-2 rounded-xl bg-white/5 hover:bg-white text-gray-400 hover:text-tourDarkBlue border border-white/5 transition duration-300"
                          title="World Athletics Link"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            ></path>
                          </svg>
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked Card View */}
          <div className="md:hidden flex flex-col gap-4">
            {filteredAndSortedItems.map((item) => {
              const isSelected = selectedYear === item.year;
              const isTop50 = parseInt(item.place) <= 50;

              return (
                <div
                  key={item.year}
                  onClick={() => handleSelectYear(item.year)}
                  className={`p-5 rounded-2xl border transition duration-300 flex flex-col gap-4 ${
                    isSelected
                      ? "bg-white/10 border-tourLightOrange shadow-lg shadow-tourOrange/5 text-white"
                      : "bg-white/5 border-white/10 text-gray-300 hover:border-white/20"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-lg font-black text-white">
                        {item.year}
                      </span>
                      <span className="text-xs text-gray-400">
                        {item.edition ? `${item.edition}. Pfingstsportfest` : "Rehlingen International"}
                      </span>
                    </div>

                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-wider ${
                        isTop50
                          ? "bg-tourOrange/15 text-tourLightOrange border border-tourLightOrange/25"
                          : "bg-white/10 text-white border border-white/15"
                      }`}
                    >
                      Platz {item.place}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-center">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                        Gesamt-Score
                      </span>
                      <span className="text-sm font-black text-white mt-1">
                        {formatPoints(item.competitionScore)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                        Teilnehmer
                      </span>
                      <span className="text-sm font-bold text-white mt-1">
                        {formatPoints(item.partScore)}
                      </span>
                      <span className="text-[9px] text-gray-500 mt-0.5">Rank {item.participationScorePlace}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block">
                        Leistung
                      </span>
                      <span className="text-sm font-bold text-white mt-1">
                        {formatPoints(item.resultScore)}
                      </span>
                      <span className="text-[9px] text-gray-500 mt-0.5">Rank {item.resultScorePlace}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                    <span className="text-xs text-gray-400">
                      World Athletics ID: {item.competitionId}
                    </span>
                    <a
                      href={item.competitionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-tourLightOrange hover:text-white transition duration-300"
                    >
                      WA-Details
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        ></path>
                      </svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <EmptyState
          searchQuery={searchQuery}
          onReset={() => setSearchQuery("")}
          title="Keine Ranking-Daten gefunden"
          description={
            <p>
              Es wurden keine Austragungsjahre für &quot;
              <strong className="text-white">{searchQuery}</strong>
              &quot; im System gefunden.
            </p>
          }
        />
      )}

      {/* 5. Educational Accordion Panel (WA Rules) */}
      <div className="p-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs flex flex-col gap-4">
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="flex justify-between items-center w-full text-left cursor-pointer group focus:outline-hidden"
        >
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-tourLightOrange/10 border border-tourLightOrange/20 text-tourLightOrange">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </span>
            <div className="flex flex-col">
              <h4 className="text-lg font-bold font-wa-headline text-white group-hover:text-tourLightOrange transition">
                Wie berechnet sich das World Athletics Meeting-Ranking?
              </h4>
              <p className="text-xs text-gray-400 mt-0.5">
                Erfahren Sie mehr über das offizielle Bewertungssystem des Weltverbandes.
              </p>
            </div>
          </div>

          <span className="text-gray-400 group-hover:text-white transition-all duration-300">
            {showInfo ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7"></path>
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
              </svg>
            )}
          </span>
        </button>

        {showInfo && (
          <div className="flex flex-col gap-4 text-sm text-gray-300 border-t border-white/5 pt-4 leading-relaxed animate-fadeIn">
            <p>
              Das offizielle <strong className="text-white">Competition Performance Ranking</strong> von World Athletics dient dazu, Leichtathletik-Meetings weltweit objektiv und einheitlich zu klassifizieren. Die Gesamtpunktzahl (Competition Score) einer Veranstaltung setzt sich aus zwei Kernaspekten zusammen:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                <h5 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-tourOrange"></span>
                  1. Ergebnis-Punkte (Result Score)
                </h5>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Basiert auf den sportlichen Höchstleistungen der Athleten. Es werden die <strong className="text-gray-300">12 besten Ergebnisse</strong> der gesamten Veranstaltung ausgewertet.
                </p>
                <ul className="list-disc pl-5 text-xs text-gray-400 mt-2 space-y-1">
                  <li>Auswertung erfolgt nach der offiziellen World Athletics Punktetabelle.</li>
                  <li>Maximal 5 Ergebnisse dürfen aus einer einzelnen Disziplingruppe (z.B. Sprint, Sprung, Wurf) gewertet werden, um sportliche Breite zu sichern.</li>
                </ul>
              </div>

              <div className="p-4 bg-white/2 border border-white/5 rounded-xl">
                <h5 className="font-extrabold text-white text-sm flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#C1FB6E]"></span>
                  2. Teilnehmer-Punkte (Participation Score)
                </h5>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Misst das sportliche Prestige und Niveau des Teilnehmerfeldes. Es werden die Weltranglisten-Platzierungen der besten startenden Athleten herangezogen.
                </p>
                <ul className="list-disc pl-5 text-xs text-gray-400 mt-2 space-y-1">
                  <li>Zusätzliche Bonuspunkte für Athleten mit Spitzenplatzierungen im Weltranking.</li>
                  <li>Extrapunkte für amtierende Olympiasieger, Weltmeister oder Inhaber aktueller Rekorde, die am Meeting teilnehmen.</li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-gray-400 italic mt-1">
              * Dieses Punktesystem ist von immenser Bedeutung für die Athleten: Je höher ein Meeting eingestuft ist (z.B. als Silber-Meeting), desto mehr Bonuspunkte erhalten die Teilnehmer zusätzlich zu ihren Zeiten und Weiten für ihr persönliches World Ranking. Dieses Ranking entscheidet über die Qualifikation für Weltmeisterschaften und Olympische Spiele.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
