export interface RecordItem {
  Disziplin: string;
  Name: string;
  Land: string;
  Jahr: string;
  Leistung: string;
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
 * Filters standard record items by search query.
 */
export function filterRecords(records: RecordItem[], searchQuery: string): RecordItem[] {
  const query = searchQuery.trim().toLowerCase();
  if (!query) return records;

  return records.filter((record) => {
    const mappedCountry = (COUNTRY_MAP[record.Land] || record.Land).toLowerCase();
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
