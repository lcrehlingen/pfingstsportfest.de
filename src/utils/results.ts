import { promises as fs } from "fs";
import path from "path";

export interface ResultItem {
  filename: string;
  date: number;
  edition: number;
}

/**
 * Reads and parses PDF results from the public/results directory,
 * sorting them by event date descending (newest first).
 */
export async function getResultsList(): Promise<ResultItem[]> {
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
