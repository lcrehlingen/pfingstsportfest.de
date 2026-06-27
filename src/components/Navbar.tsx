"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OutsideClickHandler from "./OutsideClickHandler";
import { usePathname } from "next/navigation";
import { TITLE, EDITION } from "@/data";
import { MAIN_NAV_LINKS } from "@/utils/navigation";

export default function Navbar() {
  const [opened, setOpened] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (opened) {
      setOpened(false);
    }
  }, [pathname]);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpened(false);
      }}
    >
      <header className="sticky top-0 z-50 w-full bg-tourDarkBlue/90 backdrop-blur-md border-b border-white/10 transition-all duration-300">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4 2xl:px-0 w-full relative">
          <nav className="w-full text-white py-4 text-lg flex justify-between items-center">
            
            {/* Logo Lockup */}
            <Link
              href="/"
              className="group flex items-center gap-2.5 font-wa-headline text-xl font-black tracking-tight text-white hover:opacity-95 transition"
            >
              <span className="bg-linear-to-r from-tourOrange to-tourLightOrange text-white text-xs md:text-sm px-2.5 py-1 rounded-md font-extrabold tracking-wider shadow-sm shadow-tourOrange/20">
                {EDITION}.
              </span>
              <span className="text-lg md:text-2xl leading-none">
                Pfingstsportfest <span className="text-tourLightOrange group-hover:text-white transition duration-300">Rehlingen</span>
              </span>
            </Link>

            {/* Desktop Navigation Links & Action CTA */}
            <div className="hidden md:flex items-center gap-6">
              <ul className="flex items-center gap-1.5 font-wa-bold font-semibold">
                {MAIN_NAV_LINKS.map((link) => {
                  const isHash = link.href.startsWith("/#");
                  const isActive = !isHash && (pathname === link.href || pathname?.startsWith(link.href + "/"));
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`px-3.5 py-2 rounded-xl text-base font-bold tracking-wide transition-all duration-300 block border border-transparent ${
                          isActive
                            ? "text-white bg-white/10 border-white/5"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Dedicated high-impact CTA Button */}
              <Link
                href="/eintritt"
                className="inline-flex items-center justify-center rounded-xl bg-tourOrange hover:bg-tourLightOrange px-4.5 py-2 text-center text-sm font-extrabold text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-tourOrange/10 border border-tourOrange/10"
              >
                Tickets
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              className="flex items-center rounded-xl p-2.5 text-gray-400 hover:text-white hover:bg-white/5 md:hidden focus:outline-hidden transition duration-300"
              onClick={() => {
                setOpened(!opened);
              }}
              aria-label="Toggle Menu"
            >
              {!opened ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              )}
            </button>

            {/* Floating Mobile Dropdown panel */}
            <div
              className={`absolute top-full left-4 right-4 bg-tourDarkBlue/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-2xl mt-2 md:hidden transition-all duration-300 flex flex-col gap-4 z-50 ${
                opened
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <ul className="flex flex-col gap-2 font-wa-bold font-semibold">
                {MAIN_NAV_LINKS.map((link) => {
                  const isHash = link.href.startsWith("/#");
                  const isActive = !isHash && (pathname === link.href || pathname?.startsWith(link.href + "/"));
                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`px-4 py-3 rounded-xl text-base font-bold tracking-wide transition-all duration-300 block ${
                          isActive
                            ? "text-white bg-white/10"
                            : "text-gray-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              
              <div className="border-t border-white/5 pt-3">
                <Link
                  href="/eintritt"
                  className="flex items-center justify-center rounded-xl bg-tourOrange hover:bg-tourLightOrange py-3 text-center text-base font-bold text-white transition-all duration-300"
                >
                  Tickets & Eintritt
                </Link>
              </div>
            </div>

          </nav>
        </div>
      </header>
    </OutsideClickHandler>
  );
}
