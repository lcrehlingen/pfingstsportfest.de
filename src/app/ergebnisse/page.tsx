import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { EVENT_DATE, LIVE_RESULTS, RESULT_LINKS } from "@/utils/constants";
import { daysAway } from "@/utils/date";
import { promises as fs } from "fs";
import path from "path";

export const metadata = {
  title: "Ergebnisse",
  openGraph: {
    title: "Ergebnisse",
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
];

export default async function Ergebnisse() {
  const results = await getResults();

  return (
    <ContentContainer>
      <Title>Ergebnisse</Title>
      {daysAway(EVENT_DATE) < 7 && (
        <div className="flex flex-row gap-4">
          {RESULT_LINKS.map((link, index) => (
            <a
              key={index}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} inline-flex max-w-fit items-center rounded-lg px-5 py-2.5 text-center text-lg font-medium text-white`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
      <article className="prose prose-xl max-w-none prose-table:tracking-wide">
        {daysAway(EVENT_DATE) < 7 && (
          <iframe src={LIVE_RESULTS} className="w-full" height={1000} />
        )}

        <table>
          <thead>
            <tr>
              <th>Jahr</th>
              <th>Austragung</th>
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
                  {photofinish
                    .filter((pf) => pf.edition === result.edition)
                    .map((pf) => (
                      <a
                        key={pf.edition}
                        href={pf.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {" "}
                        (Photofinish)
                      </a>
                    ))}
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
