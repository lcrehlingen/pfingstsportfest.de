import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Live from "@/components/cta/Live";
import Weltklasse from "@/components/cta/Weltklasse";
import WorldAthletics from "@/components/cta/WorldAthletics";
import LatestNews from "@/components/cta/LatestNews";
import { Locale } from "@/i18n/get-dictionary";

interface HomeTemplateProps {
  locale: Locale;
}

export default function HomeTemplate({ locale }: HomeTemplateProps) {
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
