import eventRecordsM from "@/assets/records_m.json";
import eventRecordsW from "@/assets/records_w.json";
import ContentContainer from "@/components/ContentContainer";
import RecordsTable from "./RecordsTable";
import { constructMetadata } from "@/utils/seo";
import PageHeader from "@/components/PageHeader";

export const metadata = constructMetadata({
  title: "Stadionrekorde",
  description:
    "Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion.",
  path: "/rekorde",
});

export default function RekordePage() {
  return (
    <ContentContainer>
      <PageHeader
        title="Stadionrekorde"
        description="Die historischen Meilensteine des Pfingstsportfests Rehlingen. Durchsuchen Sie alle offiziellen Stadionrekorde der Männer- und Frauen-Disziplinen im Bungertstadion."
        className="mb-4"
      />
      <RecordsTable recordsM={eventRecordsM} recordsW={eventRecordsW} />
    </ContentContainer>
  );
}
