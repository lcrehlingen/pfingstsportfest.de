"use client";

import { useState, useEffect } from "react";
import backgroundLongjump from "../../public/background_longjump.jpg";
import backgroundHurdles from "../../public/background_hurdles.jpg";
import Link from "next/link";
import { daysAway, formatEditionDate } from "@/utils/date";
import { EVENT_DATE } from "@/utils/constants";
import ExportedImage from "next-image-export-optimizer";

export default function Hero() {
  const dynamicActive = daysAway(EVENT_DATE) < 28 && daysAway(EVENT_DATE) >= 0;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const hero = document.getElementById("hero-section");
    if (hero) {
      const nextSection = hero.nextElementSibling;
      if (nextSection) {
        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }
    // Fallback if DOM element is not found
    window.scrollTo({
      top: window.innerHeight * 0.75,
      behavior: "smooth",
    });
  };

  return (
    <section id="hero-section" className="relative min-h-[75vh] flex items-center justify-start overflow-hidden bg-tourDarkBlue">
      {/* Background Image with Cinematic Zoom Effect */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <ExportedImage
          className={`absolute left-0 top-0 h-full w-full object-cover transition-transform duration-10000 ease-out lg:hidden ${
            isMounted ? "scale-105" : "scale-100"
          }`}
          src={backgroundLongjump}
          preload
          placeholder="blur"
          alt="Weitsprung Hintergrundbild im Bungertstadion"
        />
        <ExportedImage
          className={`hidden lg:block absolute left-0 top-0 h-full w-full object-cover transition-transform duration-10000 ease-out ${
            isMounted ? "scale-105" : "scale-100"
          }`}
          src={backgroundHurdles}
          preload
          placeholder="blur"
          alt="Hürdenlauf Hintergrundbild im Bungertstadion"
        />
      </div>

      {/* Modern Radial & Linear Gradients Overlay for Legibility and Depth */}
      <div className="absolute inset-0 bg-linear-to-r from-tourDarkBlue via-tourDarkBlue/60 to-transparent opacity-95 pointer-events-none"></div>
      <div className="absolute inset-0 bg-linear-to-t from-tourDarkBlue/80 via-transparent to-transparent pointer-events-none"></div>

      {/* Hero Content */}
      <div className="relative w-full z-10 py-16 lg:py-24">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 2xl:px-0 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {/* World Athletics Badge */}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-tourLightOrange/10 border border-tourLightOrange/30 text-tourLightOrange max-w-fit animate-fadeIn">
              🏆 World Athletics Continental Tour - Silver Meeting
            </span>

            <div className="flex flex-col gap-2">
              <h1 className="font-wa-headline text-5xl font-extrabold text-white md:text-7xl leading-tight tracking-tight drop-shadow-sm">
                Pfingstsportfest
                <span className="block text-tourLightOrange">Rehlingen</span>
              </h1>
              <h2 className="font-wa-headline text-3xl font-bold text-gray-200 md:text-5xl mt-2">
                {formatEditionDate()}
              </h2>
            </div>

            <a
              href="https://goo.gl/maps/jQbZfb5od2j4bcb49"
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-2xl font-bold text-[#C1FB6E] hover:text-white transition duration-300 md:text-3xl max-w-fit"
            >
              <svg
                className="h-6 w-6 shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
              Bungertstadion Rehlingen
            </a>
          </div>

          {/* Interactive Calls to Action */}
          <div className="flex flex-wrap gap-4 mt-4">
            {dynamicActive ? (
              <>
                {daysAway(EVENT_DATE) < 21 && (
                  <Link
                    href="/ergebnisse"
                    className="inline-flex items-center rounded-xl bg-tourOrange hover:bg-tourLightOrange px-6 py-3.5 text-center text-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-tourOrange/20 hover:shadow-tourOrange/30"
                  >
                    Zeitplan
                  </Link>
                )}
                <Link
                  href="/eintritt"
                  className="inline-flex items-center rounded-xl bg-white hover:bg-gray-100 px-6 py-3.5 text-center text-lg font-bold text-tourDarkBlue transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-white/10"
                >
                  Tickets & Eintritt
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Link>
              </>
            ) : (
              <>
                {/* Permanent fallback buttons when the event is far away */}
                <Link
                  href="/news"
                  className="inline-flex items-center rounded-xl bg-tourOrange hover:bg-tourLightOrange px-6 py-3.5 text-center text-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-tourOrange/20"
                >
                  Aktuelle News
                </Link>
                <Link
                  href="/eintritt"
                  className="inline-flex items-center rounded-xl bg-white hover:bg-gray-100 px-6 py-3.5 text-center text-lg font-bold text-tourDarkBlue transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Eintritt & Tickets
                </Link>
                <Link
                  href="/rekorde"
                  className="inline-flex items-center rounded-xl bg-tourDarkBlue/40 border border-white/20 hover:border-white/50 backdrop-blur-xs px-6 py-3.5 text-center text-lg font-bold text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Stadionrekorde
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <button
        onClick={handleScroll}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce select-none cursor-pointer group focus:outline-hidden z-20"
        aria-label="Nach unten scrollen"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest font-semibold group-hover:text-white/80 transition duration-300">
          Entdecken
        </span>
        <svg
          className="h-5 w-5 text-white/40 group-hover:text-white/80 transition duration-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          ></path>
        </svg>
      </button>
    </section>
  );
}

