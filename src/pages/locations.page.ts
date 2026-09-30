import { expect, Locator, Page } from '@playwright/test';

export class LocationsPage {
  constructor(private readonly page: Page) {}
  get heading(): Locator { return this.page.getByRole('heading', { name: 'Locations', exact: true }); }
  get countryHeadings(): Locator { return this.page.getByRole('heading', { level: 4 }); }
  get auctionSitesControl(): Locator { return this.page.getByRole('button', { name: /auction sites/i }).or(this.page.getByRole('tab', { name: /auction sites/i })); }
  get representativesControl(): Locator { return this.page.getByRole('button', { name: /local representatives/i }).or(this.page.getByRole('tab', { name: /local representatives/i })); }
  get representativesSearch(): Locator { return this.page.getByText(/search for representatives/i).first(); }
  countryHeading(country: string): Locator { return this.page.getByRole('heading', { name: country, exact: true }); }
  siteLink(name: string): Locator { return this.page.getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}\\*?$`, 'i') }); }
  satelliteSiteLink(name: string): Locator { return this.page.getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}\\*$`, 'i') }); }
  permanentSiteLink(name: string): Locator { return this.page.getByRole('link', { name: new RegExp(`^${escapeRegExp(name)}$`, 'i') }); }
  locationsByCountry(country: string, nextCountry: string): Locator { return this.countryHeading(country).locator(`xpath=following::a[preceding::h4[1][normalize-space()="${country}"] and following::h4[1][normalize-space()="${nextCountry}"]]`); }
  async open(): Promise<void> { await this.page.goto('/lp'); await expect(this.heading).toBeVisible(); }
  async switchToRepresentatives(): Promise<void> { await this.representativesControl.click(); }
  async openSite(name: string): Promise<void> { await this.permanentSiteLink(name).click(); }
  async getSiteNames(): Promise<string[]> { return this.getDirectorySiteNames(); }
  async getDirectorySiteNames(): Promise<string[]> {
    const headings = await this.countryHeadings.allTextContents();
    const names: string[] = [];
    for (let i = 0; i < headings.length - 1; i++) {
      const values = await this.locationsByCountry(headings[i].trim(), headings[i + 1].trim()).allTextContents();
      names.push(...values.map(value => value.trim()).filter(Boolean));
    }
    return names;
  }
}
function escapeRegExp(value: string): string { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
