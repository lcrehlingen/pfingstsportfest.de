import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Live from "@/components/cta/Live";
import Weltklasse from "@/components/cta/Weltklasse";
import WorldAthletics from "@/components/cta/WorldAthletics";
import { TITLE, EDITION_DATE } from "@/data";
import { Metadata } from "next";
import type { Event, WithContext } from "schema-dts";

const eventSchema: WithContext<Event> = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: TITLE,
  startDate: new Date(EDITION_DATE).toISOString().split('T')[0],
  endDate: new Date(EDITION_DATE).toISOString().split('T')[0],
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  location: {
    "@type": "Place",
    name: "Bungertstadion Rehlingen",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Beckingerstraße 31a",
      addressLocality: "Rehlingen-Siersburg",
      postalCode: "66780",
      addressCountry: "DE",
      addressRegion: "Saarland",
    },
  },
  image: [
    "https://pfingstsportfest.de/images/2019/Julian_Weber-Rolf_Ruppenthal.jpg",
  ],
  description:
    "🚀 Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende wird das Bungertstadion jedes Jahr zum Schauplatz für nationale und internationale Spitzenathleten.",
  offers: {
    "@type": "Offer",
    url: "https://pfingstsportfest.de/eintritt",
    price: "5",
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
  },
  organizer: {
    "@type": "Organization",
    name: "LC Rehlingen",
    url: "https://lcrehlingen.de",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const vercel = process.env.VERCEL_URL ? true : false;
  const url = vercel
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";
  const description =
    "🚀 Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende wird das Bungertstadion jedes Jahr zum Schauplatz für nationale und internationale Spitzenathleten.";
  const title = TITLE
  const image = {
    url: url + "/og-image.png",
    width: 1920,
    height: 1080,
  };
  return {
    title,
    description,
    openGraph: {
      title,
      images: image,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image,
    },
    keywords: "Leichtathletik, Rehlingen, Pfingstsportfest, Bungertstadion",
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
      />
      <Hero />
      <div className="flex flex-col gap-16 py-8 lg:gap-20 bg-white">
        <Weltklasse />
        <WorldAthletics />
        <Live />
        <Sponsors />
      </div>
    </>
  );
}
