import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { EVENT_DATE, LIVE_RESULTS } from "@/utils/constants";
import { daysAway } from "@/utils/date";
import Link from "next/link";
import { constructMetadata } from "@/utils/seo";

export const metadata = constructMetadata({
  title: "Zeitplan & Startlisten",
  description: "Der offizielle Zeitplan, Ablauf und Startlisten für das Internationale Pfingstsportfest in Rehlingen.",
  path: "/zeitplan",
});

export default function ZeitplanPage() {
  const daysAwayEvent = daysAway(EVENT_DATE);
  const isActiveSeason = daysAwayEvent < 14 && daysAwayEvent >= 0;

  return (
    <ContentContainer>
      
      {/* Page Header */}
      <div className="flex flex-col gap-2.5 text-center max-w-2xl mx-auto mb-8">
        <Title>Zeitplan & Startlisten</Title>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Planen Sie Ihren Stadionbesuch oder verfolgen Sie Startzeiten und Riegen-Einteilungen der Athleten im Bungertstadion.
        </p>
      </div>

      <div className="w-full text-white flex flex-col gap-8">
        
        {isActiveSeason ? (
          /* Active Meet Season View: IFrame Embed & Live Guides */
          <div className="flex flex-col gap-6">
            
            {/* Live Guide Panel */}
            <div className="p-5 bg-gradient-to-r from-[#C1FB6E]/5 to-tourOrange/5 border border-white/10 rounded-2xl backdrop-blur-xs flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex flex-col gap-1.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#C1FB6E]/10 border border-[#C1FB6E]/30 text-[#C1FB6E] max-w-fit">
                  ⚡ Live-Daten Aktiv
                </span>
                <p className="text-sm text-gray-300 max-w-xl mt-1 leading-relaxed">
                  Der Zeitplan und die Startlisten werden live über <strong className="text-white">laportal.net</strong> bereitgestellt. Nutzen Sie die Suche innerhalb des Zeitplans, um bestimmte Disziplinen, Riegen oder Athletennamen zu filtern.
                </p>
              </div>
              
              <a
                href={LIVE_RESULTS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white hover:bg-gray-100 text-tourDarkBlue px-5 py-3 text-sm font-bold transition duration-300 transform hover:-translate-y-0.5 shadow-md shrink-0"
              >
                In neuem Tab öffnen ↗
              </a>
            </div>

            {/* Embedded Live IFrame with loading frame */}
            <div className="w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-white flex flex-col">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50 text-xs text-gray-600 font-bold tracking-wide select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
                  <span>laportal.net LIVE-DAshboard</span>
                </div>
                <span>Bungertstadion Rehlingen</span>
              </div>
              <iframe
                src={LIVE_RESULTS}
                className="w-full h-[800px] md:h-[1000px] border-none bg-white"
                title="Offizieller Zeitplan & Startlisten"
              />
            </div>

          </div>
        ) : (
          /* Out of Season View: Countdown & Informational Placeholder */
          <div className="flex flex-col items-center justify-center max-w-3xl mx-auto w-full gap-8">
            
            {/* Main Placeholder Card */}
            <div className="w-full p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xs flex flex-col items-center text-center gap-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-tourLightOrange/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
              
              {/* Event Badge / Countdown widget */}
              <div className="flex flex-col items-center gap-1 bg-white/5 border border-white/5 p-4 rounded-2xl max-w-xs w-full select-none">
                <span className="text-xs text-gray-400 uppercase font-black tracking-widest">Wettkampf-Countdown</span>
                <span className="text-3xl font-black text-[#C1FB6E] tracking-tight mt-1">
                  {daysAwayEvent > 0 ? `${daysAwayEvent} Tage` : "In Kürze"}
                </span>
                <span className="text-xs text-tourLightOrange font-bold mt-0.5">bis zum Startschuss</span>
              </div>

              {/* Informational Text */}
              <div className="flex flex-col gap-2.5 max-w-xl">
                <h3 className="font-wa-headline text-2xl font-black text-white leading-snug">
                  Zeitplan in Vorbereitung
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  Der Zeitplan wird ca. <strong className="text-white">4 Wochen vor dem Pfingstsportfest</strong> direkt an dieser Stelle veröffentlicht.
                </p>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">
                  Eine Woche vor dem Event werden die Startlisten über das Live-Ergebnisportal bereitgestellt.
                </p>
              </div>

              {/* Action Guides Divider */}
              <div className="w-full border-t border-white/5 pt-5 flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/ergebnisse"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 hover:border-white/10 px-5 py-3 text-center text-sm font-bold text-white transition-all duration-300"
                >
                  Ergebnis-Archiv durchstöbern
                </Link>
                <Link
                  href="/rekorde"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 hover:border-white/10 px-5 py-3 text-center text-sm font-bold text-white transition-all duration-300"
                >
                  Stadionrekorde ansehen
                </Link>
              </div>

            </div>

            {/* Quick Helper Tickets Alert */}
            <div className="w-full p-6 bg-gradient-to-r from-tourDarkBlue/40 to-tourOrange/5 border border-white/5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 backdrop-blur-xs hover:border-white/10 transition duration-300">
              <div className="flex flex-col gap-1 text-center sm:text-left">
                <span className="text-xs text-tourLightOrange font-black uppercase tracking-wider">Tickets sichern</span>
                <p className="text-sm text-gray-300 mt-0.5 leading-relaxed">
                  Sitzplatzkarten für die überdachte Haupttribüne sind limitiert und begehrt! Informieren Sie sich frühzeitig.
                </p>
              </div>
              <Link
                href="/eintritt"
                className="inline-flex items-center justify-center gap-1 px-4.5 py-2.5 rounded-xl bg-tourOrange hover:bg-tourLightOrange text-white font-extrabold text-sm tracking-wide shrink-0 transition"
              >
                Preise & Eintrittskarten
              </Link>
            </div>

          </div>
        )}

      </div>
    </ContentContainer>
  );
}
