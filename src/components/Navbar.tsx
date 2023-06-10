"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import OutsideClickHandler from "./OutsideClickHandler";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const links = [
    { name: "Aktuelles", href: "/news" },
    { name: "Ausschreibung", href: "/ausschreibung" },
    { name: "Ergebnisse", href: "/ergebnisse" },
    { name: "Rekorde", href: "/rekorde" },
  ];
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
      <header className="mx-auto flex max-w-screen-xl px-4 2xl:px-0 w-full">
        <nav className="-30 w-full border-gray-200 text-white py-4 text-lg flex flex-col md:flex-row md:justify-between md:items-center">
          <div className="flex justify-between">
            <Link
              href="/"
              className="self-center whitespace-nowrap font-wa-headline text-xl font-semibold"
            >
              58. Pfingstsportfest Rehlingen
            </Link>
            <button
              className="flex items-center rounded-lg p-2 text-sm text-gray-500 md:hidden"
              onClick={() => {
                setOpened(!opened);
              }}
              aria-label="Open Menu"
            >
              <svg
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`w-full md:pt-0 pt-4 md:w-auto md:flex md:items-center ${
              opened ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col md:flex-row md:gap-8 gap-2 font-wa-bold font-semibold">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group block rounded transition duration-300 lg:bg-transparent"
                  >
                    {link.name}
                    <span className="`-mt-0.5 bg-white block h-0.5 max-w-0 transition-all duration-500 md:group-hover:max-w-full"></span>
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={"/#sponsoren"}
                  className="group block rounded transition duration-300 lg:bg-transparent"
                >
                  Sponsoren
                  <span className="`-mt-0.5 bg-white block h-0.5 max-w-0 transition-all duration-500 group-hover:max-w-full"></span>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </OutsideClickHandler>
  );
}
