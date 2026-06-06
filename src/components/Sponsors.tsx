import meineVVB from "../../public/sponsors/vvb.png";
import globus from "../../public/sponsors/globus.png";
import ikk from "../../public/sponsors/ikk.png";
import vse from "../../public/sponsors/vse.png";
import heitz from "../../public/sponsors/heitz.png";
import bitburger from "../../public/sponsors/bitburger.png";
import sparkasse from "../../public/sponsors/sparkasse.png";
import saartoto from "../../public/sponsors/saartoto.png";
import shs from "../../public/sponsors/shs.png";
import mmpuma from "../../public/sponsors/puma_mm.png";

import ministerPraesidentin from "../../public/sponsors/ministerpaesidentin.png";
import innenministerium from "../../public/sponsors/innenministerium.png";
import gemeinde from "../../public/sponsors/gemeinderehlingen.png";
import saarlouis from "../../public/sponsors/saarlouis.png";
import ExportedImage from "next-image-export-optimizer";

export default function Sponsors() {
  const publicPartners = [
    { src: ministerPraesidentin, alt: "Die Ministerpräsidentin des Saarlandes" },
    { src: saarlouis, alt: "Landkreis Saarlouis" },
    { src: gemeinde, alt: "Gemeinde Rehlingen-Siersburg" },
    { src: innenministerium, alt: "Ministerium für Inneres, Bauen und Sport" },
  ];

  const mainSponsors = [
    { src: mmpuma, alt: "M&M Sports + Puma" },
    { src: meineVVB, alt: "Vereinigte Volksbank (meine VVB)" },
    { src: globus, alt: "Globus Baumarkt" },
    { src: ikk, alt: "IKK Südwest" },
    { src: vse, alt: "VSE Aktiengesellschaft" },
    { src: heitz, alt: "Heitz & Sohn Bauunternehmung" },
    { src: bitburger, alt: "Bitburger Braugruppe" },
    { src: sparkasse, alt: "Sparkasse Saarlouis" },
    { src: saartoto, alt: "Saartoto" },
    { src: shs, alt: "SHS Strukturholding Saar" },
  ];

  return (
    <section className="w-full bg-gray-50 py-16 lg:py-24" id="sponsoren">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 2xl:px-0 flex flex-col gap-12 lg:gap-16">
        
        {/* Title */}
        <div className="text-center flex flex-col gap-3 max-w-2xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-tourOrange bg-tourOrange/10 px-3 py-1 rounded-full max-w-fit mx-auto">
            🤝 Unsere Partner
          </span>
          <h2 className="font-wa-headline text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl lg:text-5xl leading-tight">
            Partner & <span className="text-tourOrange">Sponsoren</span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Ein sportliches Großereignis dieser Klasse ist nur durch die großzügige Unterstützung starker Partner und Sponsoren aus Politik und Wirtschaft möglich. Wir danken herzlich für die Zusammenarbeit!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          {/* Column 1: Public Partners & Schirmherrschaft */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tourDarkBlue text-white text-[10px] font-bold">1</span>
              <h3 className="font-wa-bold font-bold text-gray-800 tracking-wide uppercase text-sm">
                Schirmherrschaft & Öffentliche Hand
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {publicPartners.map((partner, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-center aspect-4/3 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 group transform hover:-translate-y-0.5"
                >
                  <ExportedImage
                    src={partner.src}
                    alt={partner.alt}
                    className="max-h-16 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Columns 2-3: Main Corporate Sponsors */}
          <div className="flex flex-col gap-5 lg:col-span-2">
            <div className="flex items-center gap-2 border-b border-gray-200 pb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-tourOrange text-white text-[10px] font-bold">2</span>
              <h3 className="font-wa-bold font-bold text-gray-800 tracking-wide uppercase text-sm">
                Hauptsponsoren & Wirtschaftspartner
              </h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {mainSponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex items-center justify-center aspect-4/3 shadow-xs hover:shadow-md hover:border-gray-200 transition-all duration-300 group transform hover:-translate-y-0.5"
                >
                  <ExportedImage
                    src={sponsor.src}
                    alt={sponsor.alt}
                    className="max-h-16 w-auto object-contain grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
