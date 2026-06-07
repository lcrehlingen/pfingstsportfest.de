import wactSilver from "../../../public/wact_silver_white.png";
import europeanAthltics from "../../../public/european_athletics.png";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { TOTAL_PRIZEMONEY } from "@/utils/constants";

export default function WorldAthletics() {
  return (
    <section className="relative w-full bg-tourDarkBlue overflow-hidden py-16 lg:py-24">
      {/* Decorative subtle background radial glow */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-tourOrange/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-tourLightOrange/5 rounded-full blur-2xl pointer-events-none translate-y-1/3 -translate-x-1/4"></div>

      <div className="relative mx-auto flex max-w-(--breakpoint-xl) flex-wrap items-center gap-12 px-4 lg:grid lg:grid-cols-2 lg:gap-16 2xl:px-0">
        {/* Left Side: Championship Copy & Price Statistic */}
        <div className="flex flex-col gap-6 text-white sm:text-lg">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-tourLightOrange bg-tourLightOrange/10 border border-tourLightOrange/20 max-w-fit">
              🌍 World Athletics Status
            </span>
            <h2 className="font-wa-headline text-4xl font-extrabold tracking-tight md:text-5xl leading-tight">
              World Athletics <br />
              <span className="text-tourLightOrange">Continental Tour</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4 text-gray-300 leading-relaxed">
            <p>
              Seit 2023 ist das Internationale Pfingstsportfest stolzer Teil der World Athletics Continental Tour als renommiertes <strong className="text-white">Silber Meeting</strong>.
            </p>
            <p className="text-base">
              Diese Einstufung garantiert den teilnehmenden Athletinnen und Athleten einen wettkampf-technischen Rahmen auf absolutem Weltklasse-Niveau sowie hochkarätige Konkurrenz.
            </p>
          </div>

          {/* Premium Highlight Metric Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Gesamt-Preisgeld</span>
              <span className="text-3xl font-extrabold text-[#C1FB6E] mt-1 block">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "EUR",
                  maximumFractionDigits: 0,
                }).format(TOTAL_PRIZEMONEY)}
              </span>
              <span className="text-xs text-gray-400 mt-1 block">Verteilt auf die besten 6 pro Disziplin</span>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xs flex flex-col justify-center">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block">Meeting Kategorie</span>
              <span className="text-2xl font-bold text-white mt-1 block">Silber Status</span>
              <span className="text-xs text-tourLightOrange font-medium mt-1 block">Eines der Top-Meetings in Europa</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/ausschreibung"
              className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-gray-100 px-6 py-3.5 text-center text-lg font-bold text-tourDarkBlue transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-white/5"
            >
              Ausschreibung & Info
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Right Side: Logos in Premium Card Displays */}
        <div className="grid grid-cols-2 items-center justify-center gap-6 w-full mt-4 lg:mt-0">
          <div className="relative group p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xs flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
            <ExportedImage
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
              src={wactSilver}
              alt="World Athletics Continental Tour Silver Logo"
            />
          </div>
          <div className="relative group p-6 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xs flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 transform hover:-translate-y-1">
            <ExportedImage
              className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto object-contain"
              src={europeanAthltics}
              alt="European Athletics Quality Event Logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
