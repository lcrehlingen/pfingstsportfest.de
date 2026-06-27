import ContentContainer from "@/components/ContentContainer";
import { EVENT_DATE, LIVE_RESULTS, RESULT_LINKS } from "@/utils/constants";
import { daysAway } from "@/utils/date";
import ResultsTable from "./ResultsTable";
import { getResultsList } from "@/utils/results";
import { constructMetadata } from "@/utils/seo";
import PageHeader from "@/components/PageHeader";

export const metadata = constructMetadata({
  title: "Ergebnisse",
  description:
    "Ergebnisse, Live-Ergebnisse, Siegerlisten und das historische Ergebnis-Archiv des Internationalen Pfingstsportfests Rehlingen im Überblick.",
  path: "/ergebnisse",
});

export default async function Ergebnisse() {
  const results = await getResultsList();
  const daysAwayEvent = daysAway(EVENT_DATE);

  return (
    <ContentContainer>
      <PageHeader
        title="Ergebnisse"
        description="Verfolgen Sie die aktuellen Zeiten, Weiten und Höhen des Pfingstsportfests live oder stöbern Sie im Archiv aller PDF-Ergebnislisten seit dem Jahr 2000."
        className="mb-4"
      />

      <ResultsTable
        results={results}
        daysAwayEvent={daysAwayEvent}
        liveResultsLink={LIVE_RESULTS}
        resultLinks={RESULT_LINKS}
      />
    </ContentContainer>
  );
}
