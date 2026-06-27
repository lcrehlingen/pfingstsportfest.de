import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Live from "@/components/cta/Live";
import Weltklasse from "@/components/cta/Weltklasse";
import WorldAthletics from "@/components/cta/WorldAthletics";
import LatestNews from "@/components/cta/LatestNews";
import { Metadata } from "next";
import { constructMetadata } from "@/utils/seo";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata({
    description:
      "🚀 Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende wird das Bungertstadion jedes Jahr zum Schauplatz für nationale und internationale Spitzenathleten.",
  });
}

export default function Home() {
  return (
    <main className="w-full bg-white flex flex-col flex-1">
      <Hero />
      <Weltklasse />
      <WorldAthletics />
      <Live />
      <LatestNews />
      <Sponsors />
    </main>
  );
}
