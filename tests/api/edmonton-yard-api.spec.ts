import { test, expect } from '@playwright/test';
import { testData } from '../../src/data/test-data';
import {
  findEdmontonYard,
  flattenEquipmentCategories,
  getPageJson,
  getUpcomingEvents,
  getYardAddress,
  getYardHours,
  getYardPhone
} from '../../src/utils/page-json.utils';

test.describe('API 2 - Edmonton yard page JSON', () => {
  test('A2.1 - payload should be valid JSON and contain Edmonton yard data', async ({
    request
  }) => {
    const payload = await getPageJson(request, testData.urls.edmonton);
    expect(payload).toBeDefined();
    expect(typeof payload).toBe('object');
    expect(findEdmontonYard(payload)).toBeDefined();
  });
  test('A2.2 - yard should contain Edmonton details, address, phone and hours', async ({
    request
  }) => {
    const yard = findEdmontonYard(await getPageJson(request, testData.urls.edmonton));
    expect(yard).toBeDefined();
    expect(yard!.name).toBe(testData.api.edmontonYard.name);
    const address = getYardAddress(yard!);
    for (const part of testData.api.edmontonYard.addressParts) expect(address).toContain(part);
    expect(getYardPhone(yard!)).toBeTruthy();
    expect(getYardHours(yard!)).toBeTruthy();
  });
  test('A2.3 - upcoming events should contain valid details when available', async ({
    request
  }) => {
    const yard = findEdmontonYard(await getPageJson(request, testData.urls.edmonton));
    expect(yard).toBeDefined();
    const events = getUpcomingEvents(yard!);
    if (events.length > 0) {
      expect(events.length).toBeGreaterThanOrEqual(1);
      for (const event of events) {
        expect(event.name).toBeTruthy();
        expect(Boolean(event.dateRange) || Boolean(event.startDate && event.endDate)).toBeTruthy();
      }
      expect(
        events.some((event) =>
          testData.api.edmontonYard.eventLocations.some((location) =>
            (event.name ?? '').toLowerCase().includes(location.toLowerCase())
          )
        )
      ).toBeTruthy();
    }
  });
  test('A2.4 - items in yard should contain valid categories and quantities', async ({
    request
  }) => {
    const yard = findEdmontonYard(await getPageJson(request, testData.urls.edmonton));
    expect(yard?.itemsInYard).toBeDefined();
    const categories = flattenEquipmentCategories(yard!.itemsInYard);
    expect(categories.length).toBeGreaterThan(testData.api.edmontonYard.minimumCategoryCount);
    for (const category of categories) {
      expect(category.categoryLocalized).toBeTruthy();
      if (category.totalAssets !== undefined) {
        expect(typeof category.totalAssets).toBe('number');
        expect(category.totalAssets).toBeGreaterThanOrEqual(0);
      }
    }
    expect(categories.map((c) => c.categoryLocalized)).toContain(
      testData.api.edmontonYard.requiredCategory
    );
  });
  test('A2 Negative - unknown equipment category should not exist', async ({ request }) => {
    const yard = findEdmontonYard(await getPageJson(request, testData.urls.edmonton));
    const names = flattenEquipmentCategories(yard!.itemsInYard).map((c) => c.categoryLocalized);
    expect(names).not.toContain(testData.api.negative.unknownEquipmentCategory);
  });
});
