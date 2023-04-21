import Navbar from "@/components/Navbar";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Pfingstsportfest Rehlingen",
  description: "Weltmeister, Olympiasieger oder Europameister - am Pfingstwochenende wird das Bungertstadion jedes Jahr zum Schauplatz für nationale und internationale Spitzenathleten.",
  openGraph: {
    title: "Pfingstsportfest Rehlingen",
  },
  keywords: "Leichtathletik, Rehlingen, Pfingstsportfest, Bungertstadion",
};

const worldAthleticsRegular = localFont({
  src: "../fonts/WorldAthletics-Regular.otf",
  variable: "--font-wa-regular",
});
const worldAthleticsHeadline = localFont({
  src: "../fonts/WorldAthleticsHeadline.otf",
  variable: "--font-wa-headline",
});
const worldAthleticsBold = localFont({
  src: "../fonts/WorldAthletics-Bold.otf",
  variable: "--font-wa-bold",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body
        className={`${worldAthleticsBold.variable} ${worldAthleticsRegular.variable} ${worldAthleticsHeadline.variable} flex min-h-screen flex-col justify-between font-wa-regular bg-tourDarkBlue`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
