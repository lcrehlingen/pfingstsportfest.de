"use client";

import highjump from "../../../public/highjump_m.jpeg";
import highjumpW from "../../../public/highjump.jpeg";
import hurdles from "../../../public/hurdles.jpeg";
import javelin from "../../../public/javelin_m.jpeg";
import poleVault from "../../../public/polevault_m_bokanda.jpeg";
import rehli from "../../../public/rehli.jpeg";
import sprint from "../../../public/100m.jpg";
import mihambo from "../../../public/mihambo_florian_walz.jpeg";
import farken from "../../../public/farken_diego_menzi.jpg";
import eighthundred from "../../../public/800m_diego_menzi.jpg";

import Link from "next/link";
import { Carousel } from "flowbite-react";
import ExportedImage from "next-image-export-optimizer";

export default function Weltklasse() {
  const images = [
    { src: mihambo, alt: "Malaika Mihambo im Weitsprung" },
    { src: javelin, alt: "Julian Weber beim Speerwurf" },
    { src: farken, alt: "Robert Farken im 800m Lauf" },
    { src: eighthundred, alt: "800m Rennen der Frauen" },
    { src: poleVault, alt: "Bo Kanda Lita Baehre im Stabhochsprung" },
    { src: highjumpW, alt: "Imke Onnen beim Hochsprung" },
    { src: sprint, alt: "100m Sprint Entscheidung" },
    { src: rehli, alt: "Volles Bungertstadion Rehlingen" },
    { src: hurdles, alt: "Joshua Abuaku über den Hürden" },
    { src: highjump, alt: "Mateusz Przybylko beim Hochsprung" },
  ];

  return (
    <section className="w-full bg-white py-16 lg:py-24 border-b border-gray-100">
      <div className="mx-auto grid max-w-(--breakpoint-xl) grid-cols-1 items-center gap-12 px-4 md:grid-cols-2 lg:gap-16 2xl:px-0">
        {/* Left Side: Premium Image Carousel Frame */}
        <div className="relative group">
          {/* Outer glow background effect */}
          <div className="absolute -inset-1.5 bg-linear-to-r from-tourOrange to-tourLightOrange rounded-3xl blur-md opacity-25 group-hover:opacity-35 transition duration-500"></div>
          
          <div className="relative h-64 sm:h-80 md:h-87.5 lg:h-100 xl:h-112.5 shadow-2xl rounded-3xl overflow-hidden border border-gray-100 bg-gray-50">
            <Carousel slideInterval={4000}>
              {images.map((img, index) => (
                <div key={index} className="relative h-full w-full">
                  <ExportedImage
                    src={img.src}
                    alt={img.alt}
                    placeholder="blur"
                    className="block h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-105"
                  />
                  {/* Subtle caption overlay */}
                  {/*<div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-black/70 to-transparent p-4 pt-10 text-white">
                    <p className="text-sm font-semibold tracking-wide font-wa-bold">{img.alt}</p>
                  </div>*/}
                </div>
              ))}
            </Carousel>
          </div>
        </div>

        {/* Right Side: Copy Content */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-tourOrange bg-tourOrange/10 max-w-fit">
              🏆 Spitzensport hautnah
            </span>
            <h2 className="font-wa-headline text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl lg:text-6xl leading-tight">
              Weltklasse in <span className="text-tourOrange">Rehlingen</span>
            </h2>
          </div>
          
          <div className="flex flex-col gap-4 text-gray-600 text-lg leading-relaxed">
            <p className="font-medium text-gray-800">
              Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende
              wird das Bungertstadion jedes Jahr zum Schauplatz für nationale und
              internationale Spitzenathleten.
            </p>
            <p className="text-base text-gray-500">
              Erleben Sie packende Sprints, atemberaubende Sprünge und weite Würfe aus nächster Nähe. Das familiäre Bungertstadion bietet eine einzigartige Atmosphäre, die Athletinnen und Athleten zu Höchstleistungen antreibt.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/rekorde"
              className="inline-flex items-center gap-2 rounded-xl bg-tourDarkBlue hover:bg-tourDarkBlue/90 px-6 py-3.5 text-center text-lg font-bold text-tourLightOrange hover:text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg shadow-tourDarkBlue/10"
            >
              Stadionrekorde
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
