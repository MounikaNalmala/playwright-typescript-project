import { APIRequestContext, expect } from '@playwright/test';
export type Location = {
  name?: string;
  country?: string;
  countryName?: string;
  countryCode?: string;
  siteType?: string;
  [key: string]: unknown;
};
export type EdmontonYard = {
  name?: string;
  address?: unknown;
  phone?: string;
  phoneNumber?: string;
  officeHours?: unknown;
  pickupHours?: unknown;
  upcomingEvents?: YardEvent[];
  itemsInYard?: unknown;
  [key: string]: unknown;
};
export type YardEvent = {
  name?: string;
  startDate?: string;
  endDate?: string;
  dateRange?: string;
  [key: string]: unknown;
};
export type EquipmentCategory = {
  categoryLocalized?: string;
  totalAssets?: number;
  [key: string]: unknown;
};
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
export async function getPageJson(
  request: APIRequestContext,
  url: string
): Promise<Record<string, unknown>> {
  const response = await request.get(url);
  expect(response.ok()).toBeTruthy();
  expect(response.headers()['content-type'] ?? '').toContain('text/html');
  const html = await response.text();
  const match = html.match(/<script[^>]*id=["']__NEXT_DATA__["'][^>]*>([\s\S]*?)<\/script>/);
  expect(match, '__NEXT_DATA__ was not found').not.toBeNull();
  return JSON.parse(match![1]);
}
export function findLocations(payload: unknown): Location[] {
  if (Array.isArray(payload)) {
    if (payload.length && payload.every((v) => isRecord(v) && typeof v.name === 'string'))
      return payload as Location[];
    for (const item of payload) {
      const found = findLocations(item);
      if (found.length) return found;
    }
  }
  if (isRecord(payload))
    for (const value of Object.values(payload)) {
      const found = findLocations(value);
      if (found.length) return found;
    }
  return [];
}
export function getLocationCountry(location: Location): string | undefined {
  return typeof location.country === 'string'
    ? location.country
    : typeof location.countryName === 'string'
      ? location.countryName
      : typeof location.countryCode === 'string'
        ? location.countryCode
        : undefined;
}
export function getDistinctCountries(locations: Location[]): string[] {
  return [...new Set(locations.map(getLocationCountry).filter((v): v is string => Boolean(v)))];
}
export function findLocationByName(locations: Location[], name: string): Location | undefined {
  return locations.find((location) => location.name === name);
}
export function findEdmontonYard(payload: unknown): EdmontonYard | undefined {
  if (Array.isArray(payload))
    for (const item of payload) {
      const yard = findEdmontonYard(item);
      if (yard) return yard;
    }
  if (isRecord(payload)) {
    if (payload.name === 'Edmonton' && ('address' in payload || 'itemsInYard' in payload))
      return payload as EdmontonYard;
    for (const value of Object.values(payload)) {
      const yard = findEdmontonYard(value);
      if (yard) return yard;
    }
  }
  return undefined;
}
function stringify(value: unknown): string {
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) return value.map(stringify).join(' ');
  if (isRecord(value)) return Object.values(value).map(stringify).join(' ');
  return '';
}
export function getYardAddress(yard: EdmontonYard): string {
  return stringify(yard.address);
}
export function getYardPhone(yard: EdmontonYard): string {
  return typeof yard.phone === 'string'
    ? yard.phone
    : typeof yard.phoneNumber === 'string'
      ? yard.phoneNumber
      : '';
}
export function getYardHours(yard: EdmontonYard): string {
  return stringify(yard.pickupHours ?? yard.officeHours);
}
export function getUpcomingEvents(yard: EdmontonYard): YardEvent[] {
  return Array.isArray(yard.upcomingEvents)
    ? (yard.upcomingEvents.filter(isRecord) as YardEvent[])
    : [];
}
export function flattenEquipmentCategories(value: unknown): EquipmentCategory[] {
  const result: EquipmentCategory[] = [];
  const visit = (item: unknown): void => {
    if (Array.isArray(item)) return void item.forEach(visit);
    if (!isRecord(item)) return;
    if (typeof item.categoryLocalized === 'string') result.push(item as EquipmentCategory);
    Object.values(item).forEach(visit);
  };
  visit(value);
  return result;
}
