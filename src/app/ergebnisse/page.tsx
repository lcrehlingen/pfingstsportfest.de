import ContentContainer from "@/components/ContentContainer";
import Title from "@/components/Title";
import { promises as fs } from "fs";
import path from "path";

export const metadata = {
  title: "Ergebnisse",
  openGraph: {
    title: "Ergebnisse",
  }
};

export default async function Ergebnisse() {
  const results = await getResults();
  return (
    <ContentContainer>
      <Title>Ergebnisse</Title>

      <article className="prose prose-xl max-w-none prose-table:tracking-wide">
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
