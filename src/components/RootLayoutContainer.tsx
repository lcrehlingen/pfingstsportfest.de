import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import localFont from "next/font/local";
import { ReactNode } from "react";

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

interface RootLayoutContainerProps {
  children: ReactNode;
  dict: any;
}

export default function RootLayoutContainer({ children, dict }: RootLayoutContainerProps) {
  return (
    <body
      className={`${worldAthleticsBold.variable} ${worldAthleticsRegular.variable} ${worldAthleticsHeadline.variable} flex min-h-screen flex-col font-wa-regular bg-tourDarkBlue`}
    >
      <Navbar dict={dict} />
      {children}
      <Footer dict={dict} />
    </body>
  );
}
