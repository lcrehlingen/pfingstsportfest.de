/**
 * Resolves the base URL for the current environment.
 * If running on Vercel, it uses the VERCEL_URL environment variable.
 * Otherwise, it defaults to the provided fallback (e.g. localhost or production domain).
 */
export function getBaseUrl(fallback: string = "http://localhost:3000"): string {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return fallback;
}
