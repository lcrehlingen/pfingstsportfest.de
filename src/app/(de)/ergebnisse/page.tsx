import ErgebnisseTemplate from "@/templates/ErgebnisseTemplate";

export const metadata = {
  title: "Ergebnisse & Archiv",
  description: "Ergebnisse, Live-Ergebnisse, Siegerlisten und das historische Ergebnis-Archiv des Pfingstsportfests.",
};

export default function Page() {
  return <ErgebnisseTemplate locale="de" />;
}
