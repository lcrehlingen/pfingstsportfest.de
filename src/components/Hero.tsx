import background from "../../public/background.jpeg";
import Link from "next/link";
import { EDITION_DATE } from "@/data";
import { daysAway } from "@/utils/date";
import { EVENT_DATE } from "@/utils/constants";
import ExportedImage from "next-image-export-optimizer";

export default function Hero() {
  return (
    <section
      className="
      relative
      min-h-[70vh]
      content-start
      items-center
      justify-center
    "
    >
      <div className="absolute flex h-full w-full items-center bg-white ">
        <ExportedImage
          className="absolute left-0 top-0 h-full w-full object-cover"
          src={background}
          priority
          placeholder="blur"
          alt="100m Sprint Hintergrundbild"
        />
        <span className="absolute h-full w-full bg-black opacity-50"></span>
        <div className="absolute w-full">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0 flex flex-col gap-4">
            <div>
              <div className="flex flex-col gap-4">
                <h1 className="whitespace-nowrap font-wa-headline text-5xl font-semibold text-white md:text-6xl">
                  Pfingstsportfest Rehlingen
                </h1>
                <h2 className="font-wa-headline text-4xl font-semibold text-white md:text-5xl">
                  {new Date(EDITION_DATE).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </h2>
              </div>
              <a
                href="https://goo.gl/maps/jQbZfb5od2j4bcb49"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-3xl font-semibold text-[#C1FB6E] md:text-4xl"
              >
                Bungertstadion
              </a>
            </div>
            <div className="flex flex-row gap-4">
              {/*<a
                href="https://www.youtube.com/watch?v=0vQL8Yz00h0"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-fit items-center rounded-lg bg-sky-500 px-5 py-2.5 text-center text-lg font-medium text-white"
              >
                Live-Stream
              </a>*/}
              {daysAway(EVENT_DATE) > 7 && (
                <Link
                  href="/ergebnisse"
                  className="inline-flex max-w-fit items-center rounded-lg bg-red-500 px-5 py-2.5 text-center text-lg font-medium text-tourDarkBlue"
                >
                  Ergebnisse
                </Link>
              )}
              {daysAway(EVENT_DATE) < 7 && daysAway(EVENT_DATE) >= 0 && (
                <Link
                  href="/zeitplan"
                  className="inline-flex max-w-fit items-center rounded-lg bg-red-500 px-5 py-2.5 text-center text-lg font-medium text-tourDarkBlue"
                >
                  Zeitplan
                </Link>
              )}
              {daysAway(EVENT_DATE) < 7 && daysAway(EVENT_DATE) >= 0 && (
                <Link
                  href="/zeitplan"
                  className="inline-flex max-w-fit items-center rounded-lg bg-red-500 px-5 py-2.5 text-center text-lg font-medium text-tourDarkBlue"
                >
                  Zeitplan
                </Link>
              )}
              {daysAway(EVENT_DATE) < 28 && daysAway(EVENT_DATE) >= 0 && (
                <Link
                  href="/eintritt"
                  className="inline-flex max-w-fit items-center rounded-lg bg-white px-5 py-2.5 text-center text-sm font-medium text-tourDarkBlue"
                >
                  Eintritt
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
