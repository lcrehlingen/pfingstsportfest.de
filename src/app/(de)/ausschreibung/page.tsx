import AusschreibungTemplate from "@/templates/AusschreibungTemplate";

export const metadata = {
  title: "Ausschreibung",
  description: "Offizielle Disziplinen, Prämien und Qualifikations-Standards für das Internationale Pfingstsportfest in Rehlingen.",
};

export default function Page() {
  return <AusschreibungTemplate locale="de" />;
}
