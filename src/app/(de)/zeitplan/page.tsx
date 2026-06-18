import ZeitplanTemplate from "@/templates/ZeitplanTemplate";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zeitplan & Startlisten",
  openGraph: {
    title: "Zeitplan & Startlisten",
  },
};

export default function ZeitplanPage() {
  return <ZeitplanTemplate locale="de" />;
}
