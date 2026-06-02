import eventRecordsM from "@/assets/records_m.json";
import eventRecordsW from "@/assets/records_w.json";
import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import RecordsTable from "./RecordsTable";

export const metadata = {
  title: "Stadionrekorde",
  description:
    "Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion.",
  openGraph: {
    title: "Stadionrekorde",
    description:
      "Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion.",
  }
};


export default function RekordePage() {
  return (
    <ContentContainer>
      <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-4">
        <Title>Stadionrekorde</Title>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion.
        </p>
      </div>
      <RecordsTable recordsM={eventRecordsM} recordsW={eventRecordsW} />
    </ContentContainer>
  );
}
