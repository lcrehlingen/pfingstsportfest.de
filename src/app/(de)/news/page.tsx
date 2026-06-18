import NewsTemplate from "@/templates/NewsTemplate";

export const metadata = {
  title: "Aktuelles & News",
  description: "Berichte, Neuigkeiten und exklusive Ankündigungen rund um das Pfingstsportfest Rehlingen.",
};

export default function Page() {
  return <NewsTemplate locale="de" />;
}
