import { APIRequestContext, test, expect } from '@playwright/test';
import { testData } from '../../src/data/test-data';
import { getAssetTitles, getSearchRecords, getSearchResults, getTotalAmount, isRecord } from '../../src/utils/search-api.utils';

const search = (request: APIRequestContext, text: string) => request.post(testData.api.inventorySearch.endpoint, { data: { freeText: text } });

test.describe('API 3 - Edmonton inventory search', () => {
  test('A3.1 - response should return HTTP 200 and JSON', async ({ request }) => { const response = await search(request, testData.api.inventorySearch.searchText); expect(response.status()).toBe(200); expect(response.headers()['content-type']).toContain('application/json'); expect(isRecord(await response.json())).toBeTruthy(); });
  test('A3.2 - total inventory result count should be greater than 0', async ({ request }) => { const response = await search(request, testData.api.inventorySearch.searchText); expect(getTotalAmount(getSearchResults(await response.json()))).toBeGreaterThan(0); });
  test('A3.3 - first page should contain records with asset descriptions', async ({ request }) => { const response = await search(request, testData.api.inventorySearch.searchText); const records = getSearchRecords(getSearchResults(await response.json())); expect(records.length).toBeGreaterThan(0); for (const record of records) { expect(record.assetDescription).toBeTruthy(); expect(record.assetDescription!.trim().length).toBeGreaterThan(0); } });
  test('A3.4 - should log total result count and first 5 titles', async ({ request }) => { const response = await search(request, testData.api.inventorySearch.searchText); const results = getSearchResults(await response.json()); const total = getTotalAmount(results); const titles = getAssetTitles(getSearchRecords(results)); console.log(`API Edmonton inventory total: ${total}`); console.log('First 5 titles:', titles.slice(0, testData.api.inventorySearch.titlesToLog)); expect(total).toBeGreaterThan(0); expect(titles.length).toBeGreaterThan(0); });
  test('A3 Negative - unknown search term should not return matching titles', async ({ request }) => { const text = testData.api.negative.unknownSearchText; const response = await search(request, text); const titles = getAssetTitles(getSearchRecords(getSearchResults(await response.json()))); expect(titles.filter(title => title.toLowerCase().includes(text.toLowerCase()))).toHaveLength(0); });
});
