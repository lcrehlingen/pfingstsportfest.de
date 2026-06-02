import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { EVENT_DATE, LIVE_RESULTS, RESULT_LINKS } from "@/utils/constants";
import { daysAway } from "@/utils/date";
import { promises as fs } from "fs";
import path from "path";
import ResultsTable from "./ResultsTable";

export const metadata = {
  title: "Ergebnisse",
  description:
    "Ergebnisse, Live-Ergebnisse, Siegerlisten und das historische Ergebnis-Archiv des Internationalen Pfingstsportfests Rehlingen im Überblick.",
  openGraph: {
    title: "Ergebnisse",
    description:
      "Ergebnisse, Live-Ergebnisse, Siegerlisten und das historische Ergebnis-Archiv des Internationalen Pfingstsportfests Rehlingen im Überblick.",
  },
};

const photofinish = [
  {
    edition: 58,
    link: "https://photofinish.lcrehlingen.de/pfingsten2023",
  },
  {
    edition: 59,
    link: "https://photofinish.lcrehlingen.de/pfingsten2024",
  },
  {
    edition: 60,
    link: "https://photofinish.lcrehlingen.de/pfingsten2025",
  },
];

export default async function Ergebnisse() {
  const results = await getResults();
  const daysAwayEvent = daysAway(EVENT_DATE);

  return (
    <ContentContainer>
      <div className="flex flex-col gap-2 text-center max-w-2xl mx-auto mb-4">
        <Title>Ergebnisse</Title>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Verfolgen Sie die aktuellen Zeiten, Weiten und Höhen des Pfingstsportfests live oder stöbern Sie im Archiv aller PDF-Ergebnislisten seit dem Jahr 2000.
        </p>
      </div>

      <ResultsTable
        results={results}
        daysAwayEvent={daysAwayEvent}
        liveResultsLink={LIVE_RESULTS}
        resultLinks={RESULT_LINKS}
        photofinish={photofinish}
      />
    </ContentContainer>
  );
}

async function getResults() {
  const postsDirectory = path.join(process.cwd(), "public", "results");
  const filenames = await fs.readdir(postsDirectory);
  const regex = /^\d{2}-\d{2}-\d{4}_\d+\.pdf$/;

  const results = filenames
    .filter((filename) => regex.test(filename))
    .map((filename) => {
      const [date, edition] = filename.split("_");
      const [day, month, year] = date.split("-");

      return {
        filename,
        date: new Date(`${year}-${month}-${day}`).getTime(),
        edition: parseInt(edition),
      };
    })
    .sort((a, b) => b.date - a.date);

  return results;
}
