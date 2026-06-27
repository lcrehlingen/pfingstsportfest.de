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
import { StaticImageData } from "next/image";

export interface SponsorItem {
  src: StaticImageData;
  alt: string;
}

export const PUBLIC_PARTNERS: SponsorItem[] = [
  { src: ministerPraesidentin, alt: "Die Ministerpräsidentin des Saarlandes" },
  { src: saarlouis, alt: "Landkreis Saarlouis" },
  { src: gemeinde, alt: "Gemeinde Rehlingen-Siersburg" },
  { src: innenministerium, alt: "Ministerium für Inneres, Bauen und Sport" },
];

export const MAIN_SPONSORS: SponsorItem[] = [
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
