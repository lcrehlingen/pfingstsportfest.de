import Hero from "@/components/Hero";
import Sponsors from "@/components/Sponsors";
import Live from "@/components/cta/Live";
import Weltklasse from "@/components/cta/Weltklasse";
import WorldAthletics from "@/components/cta/WorldAthletics";

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
