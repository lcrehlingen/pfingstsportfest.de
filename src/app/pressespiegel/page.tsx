"use client";

import { useState, useMemo } from "react";
import ContentContainer from "@/components/ContentContainer";
import PageHeader from "@/components/PageHeader";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import GlassCard from "@/components/GlassCard";

import pressMentionsData from "@/assets/press_mentions.json";

interface RawPressMention {
  title: string;
  publisher: string;
  date: string;
  year: number;
  type: "print" | "online" | "tv";
  snippet: string;
  url: string;
}

interface PressMention extends RawPressMention {
  id: number;
}

// Helper to parse "DD.MM.YYYY" date strings into timestamps for chronological sorting
const parseDateString = (dateStr: string) => {
  const [day, month, year] = dateStr.split(".");
  return new Date(`${year}-${month}-${day}`).getTime();
};

// Map raw JSON mentions to add unique IDs at runtime and sort chronologically (newest first)
const PRESS_MENTIONS: PressMention[] = (pressMentionsData as RawPressMention[])
  .map((item, index) => ({
    ...item,
    id: index + 1,
  }))
  .sort((a, b) => {
    return parseDateString(b.date) - parseDateString(a.date);
  });

export default function PressespiegelPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | "print" | "online" | "tv">("all");
  const [yearFilter, setYearFilter] = useState<number | "all">("all");

  const filteredMentions = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return PRESS_MENTIONS.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(query) ||
        item.publisher.toLowerCase().includes(query) ||
        item.snippet.toLowerCase().includes(query);

      const matchesType = typeFilter === "all" || item.type === typeFilter;
      const matchesYear = yearFilter === "all" || item.year === yearFilter;

      return matchesSearch && matchesType && matchesYear;
    });
  }, [searchQuery, typeFilter, yearFilter]);

  const uniquePublishersCount = useMemo(() => {
    const publishers = PRESS_MENTIONS.map((i) => i.publisher);
    return new Set(publishers).size;
  }, []);

  const latestUpdateDate = useMemo(() => {
    return PRESS_MENTIONS[0]?.date || "";
  }, []);

  const getTypeBadgeStyles = (type: "print" | "online" | "tv") => {
    switch (type) {
      case "print":
        return "bg-blue-500/10 border-blue-500/20 text-blue-400";
      case "online":
        return "bg-purple-500/10 border-purple-500/20 text-purple-400";
      case "tv":
        return "bg-red-500/10 border-red-500/20 text-red-400";
      default:
        return "bg-gray-500/10 border-gray-500/20 text-gray-400";
    }
  };

  const getTypeIcon = (type: "print" | "online" | "tv") => {
    switch (type) {
      case "print":
        return "📄";
      case "online":
        return "🌐";
      case "tv":
        return "📺";
      default:
        return "📎";
    }
  };

  const getTypeLabel = (type: "print" | "online" | "tv") => {
    switch (type) {
      case "print":
        return "Zeitungsbericht";
      case "online":
        return "Online-Artikel";
      case "tv":
        return "TV-Beitrag";
      default:
        return "Presse-Notiz";
    }
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setTypeFilter("all");
    setYearFilter("all");
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Pressespiegel"
        description="Berichte, Reportagen und Rezensionen der überregionalen und lokalen Presse über das Internationale Pfingstsportfest Rehlingen."
        className="mb-8"
      />

      <div className="flex flex-col gap-8 text-white">
        {/* Statistics highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs relative overflow-hidden">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              📚 Gesamtberichte
            </span>
            <span className="text-3xl font-extrabold text-white mt-1.5 block">
              {PRESS_MENTIONS.length}
            </span>
            <span className="text-xs text-gray-400 mt-1 block">
              Archivierte Medien-Highlights im Pressespiegel
            </span>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs relative overflow-hidden">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              🎙 Aktive Verlage
            </span>
            <span className="text-3xl font-extrabold text-tourLightOrange mt-1.5 block">
              {uniquePublishersCount}
            </span>
            <span className="text-xs text-gray-400 mt-1 block">
              Verschiedene Nachrichten- und Sportportale
            </span>
          </div>

          <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs relative overflow-hidden">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">
              📅 Letztes Update
            </span>
            <span className="text-3xl font-extrabold text-[#C1FB6E] mt-1.5 block">
              {latestUpdateDate}
            </span>
            <span className="text-xs text-gray-400 mt-1 block">
              Zuletzt hinzugefügte Presseberichterstattung
            </span>
          </div>
        </div>

        {/* Filter Control Board */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xs">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block sm:inline shrink-0">
              🔎 Filter-Konsole:
            </span>
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Verlag, Artikel, Schlagwort..."
              className="w-full sm:w-64"
            />
          </div>

          {/* Type and Year filters */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-end">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 hidden sm:inline">
                Typ:
              </span>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-tourLightOrange rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-hidden cursor-pointer transition duration-300 w-full sm:w-auto min-w-[140px]"
              >
                <option value="all" className="bg-tourDarkBlue text-white">Alle Medien</option>
                <option value="print" className="bg-tourDarkBlue text-white">Zeitungen (Print)</option>
                <option value="online" className="bg-tourDarkBlue text-white">Online-Berichte</option>
                <option value="tv" className="bg-tourDarkBlue text-white">TV & Rundfunk</option>
              </select>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider shrink-0 hidden sm:inline">
                Jahr:
              </span>
              <select
                value={yearFilter}
                onChange={(e) => {
                  const val = e.target.value;
                  setYearFilter(val === "all" ? "all" : parseInt(val));
                }}
                className="bg-white/5 border border-white/10 hover:border-white/20 focus:border-tourLightOrange rounded-xl px-4 py-2.5 text-xs font-bold text-white focus:outline-hidden cursor-pointer transition duration-300 w-full sm:w-auto min-w-[120px]"
              >
                <option value="all" className="bg-tourDarkBlue text-white">Alle Jahre</option>
                <option value="2026" className="bg-tourDarkBlue text-white">2026</option>
                <option value="2025" className="bg-tourDarkBlue text-white">2025</option>
                <option value="2024" className="bg-tourDarkBlue text-white">2024</option>
                <option value="2023" className="bg-tourDarkBlue text-white">2023</option>
                <option value="2022" className="bg-tourDarkBlue text-white">2022</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results grid */}
        {filteredMentions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentions.map((item) => (
              <GlassCard
                key={item.id}
                className="flex flex-col justify-between gap-5 border border-white/10 p-5 rounded-2xl bg-white/5"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex justify-between items-start gap-4">
                    <span className="text-xs font-extrabold text-tourLightOrange block truncate">
                      📰 {item.publisher}
                    </span>
                    <span className="text-xs font-semibold text-gray-400 block shrink-0">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-white leading-tight font-wa-headline group-hover:text-tourLightOrange transition line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3">
                    &quot;{item.snippet}&quot;
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-white/5 pt-3.5 mt-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold tracking-wide border uppercase ${getTypeBadgeStyles(
                      item.type
                    )}`}
                  >
                    <span>{getTypeIcon(item.type)}</span>
                    <span>{getTypeLabel(item.type)}</span>
                  </span>

                  {item.url && item.url !== "#" ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-extrabold text-tourLightOrange hover:text-white hover:underline transition cursor-pointer"
                    >
                      Zum Original-Bericht
                      <svg
                        className="h-3.5 w-3.5"
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
                  ) : (
                    <span className="text-[10px] text-gray-500 italic">Printausgabearchiv</span>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <EmptyState
            searchQuery={searchQuery}
            onReset={handleResetFilters}
            title="Keine Presseartikel gefunden"
            description={
              <p>
                Es wurden keine Presseerwähnungen für die ausgewählten Filter &quot;
                <strong className="text-white">
                  {searchQuery || `${typeFilter} - ${yearFilter}`}
                </strong>
                &quot; gefunden.
              </p>
            }
          />
        )}
      </div>
    </ContentContainer>
  );
}
