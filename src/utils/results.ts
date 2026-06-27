import { promises as fs } from "fs";
import path from "path";

export interface ResultItem {
  filename: string;
  date: number;
  edition: number;
  competitionId?: number | null;
}

const COMPETITION_ID_MAP: Record<number, number> = {
  61: 7235370,
  60: 7218861,
  59: 7205496,
  58: 7190976,
  57: 7173606,
  56: 7155941,
  55: 7132085,
};

/**
 * Reads and parses PDF results from the public/results directory,
 * mapping modern editions to their World Athletics competition IDs
 * and sorting them by event date descending (newest first).
 */
export async function getResultsList(): Promise<ResultItem[]> {
  const postsDirectory = path.join(process.cwd(), "public", "results");
  const filenames = await fs.readdir(postsDirectory);
  const regex = /^\d{2}-\d{2}-\d{4}_\d+\.pdf$/;

  const results = filenames
    .filter((filename) => regex.test(filename))
    .map((filename) => {
      const [date, editionStr] = filename.split("_");
      const [day, month, year] = date.split("-");
      const edition = parseInt(editionStr);

      return {
        filename,
        date: new Date(`${year}-${month}-${day}`).getTime(),
        edition,
        competitionId: COMPETITION_ID_MAP[edition] || null,
      };
    })
    .sort((a, b) => b.date - a.date);

  return results;
}
