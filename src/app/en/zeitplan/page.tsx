import ZeitplanTemplate from "@/templates/ZeitplanTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Schedule & Startlists",
  openGraph: {
    title: "Schedule & Startlists",
  },
};

export default function ZeitplanPage() {
  return <ZeitplanTemplate locale="en" />;
}
