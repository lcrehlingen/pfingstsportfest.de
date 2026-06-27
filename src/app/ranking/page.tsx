import ContentContainer from "@/components/ContentContainer";
import PageHeader from "@/components/PageHeader";
import { constructMetadata } from "@/utils/seo";
import RankingTable from "./RankingTable";
import performanceData from "@/assets/performance_ranking.json";

export const metadata = constructMetadata({
  title: "Meeting-Ranking",
  description:
    "Das Internationale Pfingstsportfest Rehlingen im weltweiten Vergleich. Verfolgen Sie die historische Entwicklung der World Athletics Punkte und Platzierungen unseres Meetings.",
  path: "/ranking",
});

export default function RankingPage() {
  return (
    <ContentContainer>
      <PageHeader
        title="Meeting-Ranking"
        description="Sehen Sie, wie das Internationale Pfingstsportfest Rehlingen im offiziellen World Athletics Competition Performance Ranking im globalen Vergleich abschneidet."
        className="mb-4"
      />
      <RankingTable data={performanceData} />
    </ContentContainer>
  );
}
