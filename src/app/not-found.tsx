import ContentContainer from "@/components/ContentContainer";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFoundPage() {
  return (
    <ContentContainer>
      <div className="mx-auto max-w-2xl text-center py-12 md:py-20 flex flex-col items-center gap-6">
        
        {/* Athletic Theme Badge */}
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-tourRed/10 border border-tourRed/30 text-tourRed animate-pulse">
          ⚠️ Fehlstart! (False Start)
        </span>

        {/* Big visual 404 */}
        <h1 className="font-wa-headline text-8xl md:text-9xl font-black text-tourLightOrange tracking-tighter drop-shadow-sm select-none">
          404
        </h1>

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-wa-headline">
            Seite nicht gefunden
          </h2>
          <p className="text-gray-300 text-sm md:text-base max-w-md mx-auto leading-relaxed">
            Hoppla! Es sieht so aus, als hättest du die Laufbahn verlassen. Die gesuchte Seite ist nicht im Wettkampfprogramm oder wurde verschoben.
          </p>
        </div>

        {/* Dynamic Action Buttons Grid */}
        <div className="w-full max-w-sm border-t border-white/5 pt-8 mt-2 flex flex-col gap-3">
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center rounded-xl bg-tourOrange hover:bg-tourLightOrange px-5 py-3 text-center text-sm font-extrabold text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-tourOrange/20"
          >
            Zurück zur Startseite
          </Link>
          
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/news"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 hover:border-white/10 px-4 py-2.5 text-center text-xs font-bold text-white transition duration-300"
            >
              Aktuelles
            </Link>
            <Link
              href="/ergebnisse"
              className="inline-flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 border border-white/5 hover:border-white/10 px-4 py-2.5 text-center text-xs font-bold text-white transition duration-300"
            >
              Ergebnisse
            </Link>
          </div>
        </div>

      </div>
    </ContentContainer>
  );
}
