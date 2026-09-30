export type SearchRecord = { assetDescription?: string; [key: string]: unknown };
export type SearchResults = {
  totalAmount?: number;
  records?: unknown[];
  items?: unknown[];
  assets?: unknown[];
  [key: string]: unknown;
};

export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function getSearchResults(payload: unknown): SearchResults {
  if (!isRecord(payload)) return {};
  return isRecord(payload.results)
    ? (payload.results as SearchResults)
    : (payload as SearchResults);
}

export function getTotalAmount(results: SearchResults): number {
  return typeof results.totalAmount === 'number' ? results.totalAmount : 0;
}

export function getSearchRecords(results: SearchResults): SearchRecord[] {
  const records = [results.records, results.items, results.assets].find(Array.isArray);
  return records ? (records.filter(isRecord) as SearchRecord[]) : [];
}

export function getAssetTitles(records: SearchRecord[]): string[] {
  return records
    .map((record) => record.assetDescription)
    .filter((value): value is string => typeof value === 'string' && value.trim().length > 0);
}
