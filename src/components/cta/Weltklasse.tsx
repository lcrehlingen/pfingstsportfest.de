"use client";

import Image from "next/image";
import highjump from "../../../public/highjump_m.jpeg";
import highjumpW from "../../../public/highjump.jpeg";
import hurdles from "../../../public/hurdles.jpeg";
import javelin from "../../../public/javelin_m.jpeg";
import poleVault from "../../../public/polevault_m_bokanda.jpeg";
import rehli from "../../../public/rehli.jpeg";
import sprint from "../../../public/100m.jpg";
import Link from "next/link";
import { Carousel } from "flowbite-react";

export default function Weltklasse() {
  return (
    <section className="mx-auto grid max-w-screen-xl grid-cols-1 items-center gap-8 px-4 md:grid md:grid-cols-2 xl:gap-16 2xl:px-0">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <Carousel>
          <Image
            src={javelin}
            alt="Julian Weber"
            placeholder="blur"
            className="block h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src={poleVault}
            alt="Bo Kanda Lita Baehre"
            placeholder="blur"
            className="block h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src={highjumpW}
            alt="Imke Onnen"
            placeholder="blur"
            className="block h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src={sprint}
            alt="100m Sprint"
            placeholder="blur"
            className="block h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src={rehli}
            alt="Rehli"
            placeholder="blur"
            className="block h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src={hurdles}
            alt="Joshua Abuaku"
            placeholder="blur"
            className="block h-full w-full rounded-lg object-cover object-center"
          />
          <Image
            src={highjump}
            alt="Mateusz Przybylko"
            placeholder="blur"
            className="block h-full w-full rounded-lg object-cover object-center"
          />
        </Carousel>
      </div>
      <div className="mt-4 md:mt-0">
        <div className="flex flex-col gap-4">
          <h2 className="font-wa-headline text-5xl font-extrabold tracking-tight text-gray-900">
            Weltklasse in Rehlingen
          </h2>
          <p className="font-light text-gray-500 md:text-lg">
            Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende
            wird das Bungertstadion zum Schauplatz für nationale und
            internationale Spitzenathleten. 
          </p>
          <Link
            href="/rekorde"
            className="inline-flex max-w-fit items-center rounded-lg bg-tourDarkBlue px-5 py-2.5 text-center text-lg font-medium text-tourLightOrange"
          >
            Stadionrekorde
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
      </div>
    </section>
  );
}
