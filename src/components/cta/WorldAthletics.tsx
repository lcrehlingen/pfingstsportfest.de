import wactSilver from "../../../public/wact_silver_white.png";
import europeanAthltics from "../../../public/european_athletics.png";
import Link from "next/link";
import ExportedImage from "next-image-export-optimizer";
import { TOTAL_PRIZEMONEY } from "@/utils/constants";

export default function WorldAthletics() {
  return (
    <section className="bg-tourDarkBlue">
      <section className="mx-auto flex max-w-screen-xl flex-wrap items-center gap-16 px-4 py-8 lg:grid lg:grid-cols-2 lg:py-16 2xl:px-0">
        <div className="flex flex-col gap-4 text-white sm:text-lg">
          <h2 className="font-wa-headline text-4xl font-extrabold tracking-tight">
            World Athletics Continental Tour
          </h2>
          <p>
            Seit 2023 ist das Internationale Pfingstsportfest Teil als Silber
            Meeting Teil der World Athletics Continental Tour.
          </p>
          <p>
            Das Meeting bietet den Athleten eine hohe Qualität und einen
            Preisgeldpool von{" "}
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(TOTAL_PRIZEMONEY)}{" "}
            welcher sich auf die besten sechs Athleten jeder Disziplin verteilt.
          </p>
          <Link
            href="/ausschreibung"
            className="inline-flex max-w-fit items-center rounded-lg bg-white px-5 py-2.5 text-center text-lg font-medium text-tourDarkBlue"
          >
            Ausschreibung
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
        </div>
        <div className="grid grid-cols-2 items-center justify-center gap-8">
          <ExportedImage
            className="w-full rounded-lg"
            src={wactSilver}
            alt="World Athletics Continental Tour Silver"
          />
          <ExportedImage
            className="w-full rounded-lg"
            src={europeanAthltics}
            alt="European Athletics"
          />
        </div>
      </section>
    </section>
  );
}
