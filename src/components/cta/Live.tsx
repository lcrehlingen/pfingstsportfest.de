import { NATIONAL_LIVESTREAM } from "@/utils/constants";
import sr from "../../../public/sr.png";
import ExportedImage from "next-image-export-optimizer";

export default function Live() {
  return (
    <section className="w-full bg-gray-50 py-16 lg:py-24 border-b border-gray-100">
      <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 lg:gap-16 2xl:px-0">
        {/* Left Side: Broadcast Card (Becomes order-2 on mobile, order-1 on desktop) */}
        <div className="flex w-full justify-center order-2 md:order-1">
          <div className="relative group w-full max-w-md">
            {/* TV Screen style wrapper with glassmorphism border and glowing shadow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-3xl blur-md opacity-20 group-hover:opacity-30 transition duration-500"></div>
            
            <div className="relative flex items-center justify-center p-8 bg-white border border-gray-100 shadow-xl rounded-3xl overflow-hidden aspect-video">
              {/* Pulsing red live badge inside the visual card */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-600 text-[10px] font-extrabold uppercase tracking-widest text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></span>
                TV & Web
              </div>
              <div className="relative flex h-full w-full items-center justify-center p-4">
                <ExportedImage 
                  src={sr} 
                  alt="Saarländischer Rundfunk Senderlogo"
                  className="max-h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Copy & Live Action Button */}
        <div className="flex flex-col gap-6 order-1 md:order-2">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 max-w-fit">
              <span className="h-2 w-2 rounded-full bg-red-600 animate-pulse"></span>
              Live-Übertragung
            </span>
            <h2 className="font-wa-headline text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl leading-tight">
              Das Sportfest im <span className="text-red-600">Fernsehen</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-4 text-gray-600 text-lg leading-relaxed">
            <p className="font-medium text-gray-800">
              Auch in diesem Jahr überträgt der Saarländische Rundfunk (SR) das Rehlinger Pfingstsportfest live im Fernsehen und im Web-Livestream.
            </p>
            <p className="text-base text-gray-500">
              Verpassen Sie keine Sekunde der Entscheidung: Mit Zeitlupen, Experten-Analysen und packenden Nahaufnahmen bringt der SR die Gänsehaut-Atmosphäre des Stadions direkt auf Ihren Bildschirm.
            </p>
          </div>

          <div className="pt-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={NATIONAL_LIVESTREAM}
              className="inline-flex items-center gap-2 rounded-xl bg-red-600 hover:bg-red-500 px-6 py-3.5 text-center text-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-red-600/20 hover:shadow-red-600/30"
            >
              Zum Livestream
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
