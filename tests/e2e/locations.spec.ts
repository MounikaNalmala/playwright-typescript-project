import { test, expect } from '@playwright/test';
import { LocationsPage } from '../../src/pages/locations.page';
import { testData } from '../../src/data/test-data';

test.describe('Scenario 1 - Locations directory', () => {
  let locationsPage: LocationsPage;
  test.beforeEach(async ({ page }) => { locationsPage = new LocationsPage(page); await locationsPage.open(); });
  test('1.1 - should display Locations heading and directory introduction', async ({ page }) => { await expect(locationsPage.heading).toBeVisible(); await expect(page.getByText(testData.locationsPage.introText)).toBeVisible(); });
  test('1.2 - should explain how satellite sites are identified', async ({ page }) => { await expect(page.getByText(testData.locationsPage.satelliteNote)).toBeVisible(); });
  test('1.3 - should display expected country groups', async () => { for (const country of testData.locationsPage.countries) await expect(locationsPage.countryHeading(country)).toBeVisible(); });
  test('1.4 - should display more than 20 US locations and expected sites', async () => { const data = testData.locationsPage.locations.unitedStates; expect(await locationsPage.locationsByCountry(data.country, data.nextCountry).count()).toBeGreaterThan(data.minimumCount); for (const location of data.sites) await expect(locationsPage.siteLink(location)).toBeVisible(); });
  test('1.5 - should display more than 10 Canadian locations and expected sites', async () => { const data = testData.locationsPage.locations.canada; expect(await locationsPage.locationsByCountry(data.country, data.nextCountry).count()).toBeGreaterThan(data.minimumCount); for (const location of data.sites) await expect(locationsPage.siteLink(location)).toBeVisible(); });
  test('1.6 - should have expected satellite, permanent and total site counts', async () => { const names = await locationsPage.getSiteNames(); const satellite = names.filter(name => name.endsWith('*')); const permanent = names.filter(name => !name.endsWith('*')); expect(satellite.length).toBeGreaterThan(testData.locationsPage.minimumCounts.satelliteSites); expect(permanent.length).toBeGreaterThan(testData.locationsPage.minimumCounts.permanentSites); expect(satellite.length + permanent.length).toBeGreaterThan(testData.locationsPage.minimumCounts.totalSites); });
  test('1.7 - should identify known satellite and permanent sites correctly', async () => { for (const location of testData.locationsPage.satelliteLocations) await expect(locationsPage.satelliteSiteLink(location)).toBeVisible(); for (const location of testData.locationsPage.permanentLocations) await expect(locationsPage.permanentSiteLink(location)).toBeVisible(); });
  test('1.9 - should switch from Auction sites to Local representatives', async () => { await expect(locationsPage.auctionSitesControl).toBeVisible(); await expect(locationsPage.representativesControl).toBeVisible(); await locationsPage.switchToRepresentatives(); await expect(locationsPage.representativesSearch).toBeVisible(); });
});
