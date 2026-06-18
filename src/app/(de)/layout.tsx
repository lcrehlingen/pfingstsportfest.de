import RootLayoutContainer from "@/components/RootLayoutContainer";
import "../globals.css";
import { Metadata, Viewport } from "next";
import { TITLE } from "@/data";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const vercel = process.env.VERCEL_URL ? true : false;
  const url = vercel
    ? "https://" + process.env.VERCEL_URL
    : "http://localhost:3000";
  const image = {
    url: url + "/og-image.png",
    width: 1920,
    height: 1080,
  };
  return {
    title: {
      template: `%s | ${TITLE}`,
      default: TITLE,
    },
    metadataBase: new URL(url),
    openGraph: {
      images: image,
      url,
    },
    twitter: {
      card: "summary_large_image",
      images: image,
    },
    keywords: "Leichtathletik, Rehlingen, Pfingstsportfest, Bungertstadion",
  };
}

export const viewport: Viewport = {
  themeColor: "#293847",
};

export default async function GermanRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dict = await getDictionary("de");
  return (
    <html lang="de">
      <RootLayoutContainer dict={dict}>{children}</RootLayoutContainer>
    </html>
  );
}
