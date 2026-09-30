import { test, expect } from '@playwright/test';
import { LocationsPage } from '../../src/pages/locations.page';
import { testData } from '../../src/data/test-data';

test.describe('Scenario 2 - Open Edmonton yard from directory', () => {
  let locationsPage: LocationsPage;
  test.beforeEach(async ({ page }) => { locationsPage = new LocationsPage(page); await locationsPage.open(); });
  test('2.1 - Edmonton should be listed under Canada and should not be a satellite site', async () => { const data = testData.locationsPage.edmonton; const canada = locationsPage.locationsByCountry(data.country, data.nextCountry); await expect(canada.getByRole('link', { name: data.name, exact: true })).toBeVisible(); await expect(locationsPage.permanentSiteLink(data.name)).toBeVisible(); });
  test('2.2 - clicking Edmonton should open the Edmonton yard page', async ({ page }) => { const data = testData.locationsPage.edmonton; await locationsPage.openSite(data.name); await expect(page).toHaveURL(data.expectedUrl); await expect(page.getByRole('heading', { name: data.heading, exact: true })).toBeVisible(); });
});
