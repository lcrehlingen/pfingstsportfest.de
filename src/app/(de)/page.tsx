import HomeTemplate from "@/templates/HomeTemplate";
import { TITLE } from "@/data";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const vercel = process.env.VERCEL_URL ? true : false;
  const url = vercel ? "https://" + process.env.VERCEL_URL : "http://localhost:3000";
  const description = "🚀 Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende wird das Bungertstadion jedes Jahr zum Schauplatz für nationale und internationale Spitzenathleten.";
  const title = TITLE;
  const image = { url: url + "/og-image.png", width: 1920, height: 1080 };
  return {
    title,
    description,
    openGraph: { title, images: image, url },
    twitter: { card: "summary_large_image", title, description, images: image },
    keywords: "Leichtathletik, Rehlingen, Pfingstsportfest, Bungertstadion",
  };
}

export default function Home() {
  return <HomeTemplate locale="de" />;
}
