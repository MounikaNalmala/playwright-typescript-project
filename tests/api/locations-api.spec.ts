import { test, expect } from '@playwright/test';
import { testData } from '../../src/data/test-data';
import {
  findLocationByName,
  findLocations,
  getDistinctCountries,
  getLocationCountry,
  getPageJson
} from '../../src/utils/page-json.utils';

test.describe('API 1 - Auction sites list', { tag: '@api' }, () => {
  test(
    'A1.1 - payload should contain a list of yards/locations',
    { tag: '@smoke' },
    async ({ request }) => {
      const payload = await getPageJson(request, testData.urls.locations);
      expect(payload).toBeDefined();
      const locations = findLocations(payload);
      expect(Array.isArray(locations)).toBeTruthy();
      expect(locations.length).toBeGreaterThan(0);
    }
  );
  test('A1.2 - location count should be greater than 60', async ({ request }) => {
    const locations = findLocations(await getPageJson(request, testData.urls.locations));
    expect(locations.length).toBeGreaterThan(testData.api.locations.minimumLocationCount);
  });
  test('A1.3 - each location should have a name and country', async ({ request }) => {
    const locations = findLocations(await getPageJson(request, testData.urls.locations));
    for (const location of locations) {
      expect(location.name).toBeTruthy();
      expect(getLocationCountry(location)).toBeTruthy();
    }
  });
  test('A1.4 - locations should include Edmonton and Phoenix with expected countries', async ({
    request
  }) => {
    const locations = findLocations(await getPageJson(request, testData.urls.locations));
    for (const expected of testData.api.locations.expectedLocations) {
      const location = findLocationByName(locations, expected.name);
      expect(location, `${expected.name} was not found`).toBeDefined();
      expect(expected.countries).toContain(getLocationCountry(location!));
    }
  });
  test('A1.5 - each location should have a valid site type and expected counts', async ({
    request
  }) => {
    const locations = findLocations(await getPageJson(request, testData.urls.locations));
    for (const location of locations)
      expect([
        testData.api.locations.siteTypes.satellite,
        testData.api.locations.siteTypes.permanent
      ]).toContain(location.siteType);
    const satellites = locations.filter(
      (l) => l.siteType === testData.api.locations.siteTypes.satellite
    );
    const permanent = locations.filter(
      (l) => l.siteType === testData.api.locations.siteTypes.permanent
    );
    expect(satellites.length).toBeGreaterThan(testData.api.locations.minimumSatelliteCount);
    expect(permanent.length).toBeGreaterThan(testData.api.locations.minimumPermanentCount);
  });
  test('A1.6 - distinct country count should be greater than 8 and include US and Canada', async ({
    request
  }) => {
    const countries = getDistinctCountries(
      findLocations(await getPageJson(request, testData.urls.locations))
    );
    expect(countries.length).toBeGreaterThan(testData.api.locations.minimumCountryCount);
    for (const expected of testData.api.locations.expectedCountries)
      expect(expected.some((country) => countries.includes(country))).toBeTruthy();
  });
  test('A1 Negative - unknown location should not exist', async ({ request }) => {
    const locations = findLocations(await getPageJson(request, testData.urls.locations));
    expect(findLocationByName(locations, testData.api.negative.unknownLocation)).toBeUndefined();
  });
});
