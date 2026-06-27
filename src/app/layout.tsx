import Navbar from "@/components/Navbar";
import "./globals.css";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import type { Viewport } from "next";
import { constructMetadata } from "@/utils/seo";
import { worldAthleticsBold, worldAthleticsRegular, worldAthleticsHeadline } from "@/utils/fonts";

export async function generateMetadata(): Promise<Metadata> {
  return constructMetadata();
}

export const viewport: Viewport = {
  themeColor: "#293847",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${worldAthleticsBold.variable} ${worldAthleticsRegular.variable} ${worldAthleticsHeadline.variable} flex min-h-screen flex-col font-wa-regular bg-tourDarkBlue`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
