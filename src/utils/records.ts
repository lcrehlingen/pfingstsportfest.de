export interface RecordItem {
  Disziplin: string;
  Name: string;
  Land: string;
  Jahr: string;
  Leistung: string;
  athleteId?: number | null;
}

export const COUNTRY_MAP: Record<string, string> = {
  NAM: "Namibia",
  NGR: "Nigeria",
  USA: "USA",
  RSA: "Südafrika",
  GER: "Deutschland",
  KEN: "Kenia",
  BAH: "Bahamas",
  CAN: "Kanada",
  GBR: "Großbritannien",
  TUR: "Türkei",
  BUL: "Bulgarien",
  GDR: "DDR",
  SWE: "Schweden",
  RUS: "Russland",
  CUB: "Kuba",
  LUX: "Luxemburg",
  CSSR: "Tschechoslowakei",
  NIG: "Niger",
  FRA: "Frankreich",
  ETH: "Äthiopien",
  CZE: "Tschechien",
  SUI: "Schweiz",
};

/**
 * Translates a country code to its full display name if available,
 * otherwise returns the fallback/original code.
 */
export function translateCountry(code: string | null | undefined): string {
  if (!code) return "";
  return COUNTRY_MAP[code] || code;
}

/**
 * Filters standard record items by search query.
 */
export function filterRecords(records: RecordItem[], searchQuery: string): RecordItem[] {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return records;

  return records.filter((record) => {
    const mappedCountry = translateCountry(record.Land).toLowerCase();
    return (
      record.Disziplin.toLowerCase().includes(query) ||
      record.Name.toLowerCase().includes(query) ||
      record.Land.toLowerCase().includes(query) ||
      mappedCountry.includes(query) ||
      record.Jahr.toLowerCase().includes(query) ||
      record.Leistung.toLowerCase().includes(query)
    );
  });
}
