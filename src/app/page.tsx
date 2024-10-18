import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Live from "@/components/cta/Live";
import Weltklasse from "@/components/cta/Weltklasse";
import WorldAthletics from "@/components/cta/WorldAthletics";
import { TITLE } from "@/data";
import { Metadata } from "next";

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
