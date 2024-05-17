import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { EVENT_DATE } from "@/utils/constants";
import { daysAway } from "@/utils/date";
import { promises as fs } from "fs";
import path from "path";

export const metadata = {
  title: "Ergebnisse",
  openGraph: {
    title: "Ergebnisse",
  },
};

export default async function Ergebnisse() {
  const results = await getResults();

  return (
    <ContentContainer>
      <Title>Ergebnisse</Title>
      <div className="flex flex-row gap-4">
        <a
          href="https://www.youtube.com/watch?v=0vQL8Yz00h0"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-fit items-center rounded-lg bg-sky-500 px-5 py-2.5 text-center text-lg font-medium text-white"
        >
          Live-Stream
        </a>
        <a
          href="https://www.youtube.com/watch?v=nts7TqhqbOM "
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-fit items-center rounded-lg bg-red-500 px-5 py-2.5 text-center text-lg font-medium text-tourDarkBlue"
        >
          Live-Stream (English)
        </a>
        <a
          href="https://photofinish.lcrehlingen.de/pfingsten2024"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex max-w-fit items-center rounded-lg bg-green-500 px-5 py-2.5 text-center text-lg font-medium text-tourDarkBlue"
        >
          Photofinish
        </a>
      </div>
      <article className="prose prose-xl max-w-none prose-table:tracking-wide">
        {daysAway(EVENT_DATE) < 7 && (
          <iframe
            src="https://red.laportal.net/Competitions/Details/12570"
            className="w-full"
            height={1000}
          />
        )}

        <table>
          <thead>
            <tr>
              <th>Jahr</th>
              <th>Autragung</th>
              <th>Ergebnisse</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td className="font-semibold">
                  {new Date(result.date).getFullYear()}
                </td>
                <td className="font-semibold">
                  {result.edition}. Internationales Pfingstsportfest
                </td>
                <td>
                  <a href={`/results/${result.filename}`}>Ergebnisse</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
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
