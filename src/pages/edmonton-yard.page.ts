import { expect, Locator, Page } from '@playwright/test';

export class EdmontonYardPage {
  constructor(private readonly page: Page) {}
  get heading(): Locator { return this.page.getByRole('heading', { name: /Edmonton/i }).first(); }
  get detailsSection(): Locator { return this.page.getByText(/1500 Sparrow Drive/i).locator('xpath=ancestor::*[self::section or self::div][1]'); }
  get phoneNumber(): Locator { return this.page.getByRole('link', { name: /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/ }).first(); }
  get auctionEventsHeading(): Locator { return this.page.getByRole('heading', { name: /auction events/i }); }
  get auctionEventCards(): Locator { return this.auctionEventsHeading.locator('xpath=following::*[self::article or self::a][.//text()][following::*[contains(translate(normalize-space(.), "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz"), "about this yard")]]'); }
  eventTitle(card: Locator): Locator { return card.getByRole('heading').first(); }
  get aboutYardHeading(): Locator { return this.page.getByRole('heading', { name: /about this yard/i }); }
  get aboutYardSection(): Locator { return this.aboutYardHeading.locator('xpath=ancestor::*[self::section or self::div][1]'); }
  get itemsInYardHeading(): Locator { return this.page.getByRole('heading', { name: /items in yard/i }); }
  get itemCategoryCards(): Locator { return this.itemsInYardHeading.locator('xpath=following::*[self::a or self::article][.//*[contains(translate(normalize-space(.), "ITEMS", "items"), "items")]]'); }
  itemCategoryName(card: Locator): Locator { return card.getByRole('heading').first().or(card.locator('h2,h3,h4').first()); }
  itemCategoryByName(name: string): Locator { return this.itemCategoryCards.filter({ hasText: name }).first(); }
  async getItemCategoryNames(): Promise<string[]> { return (await this.itemCategoryCards.allTextContents()).map(value => value.trim()).filter(Boolean); }
  get sellerHeading(): Locator { return this.page.getByRole('heading', { name: /become a seller/i }); }
  get sellerForm(): Locator { return this.sellerHeading.locator('xpath=ancestor::form[1]').or(this.sellerHeading.locator('xpath=ancestor::*[self::section or self::div][1]')); }
  get sellerPhone(): Locator { return this.sellerForm.getByRole('link', { name: /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/ }).first(); }
  get representativesTab(): Locator { return this.page.getByRole('tab', { name: /representatives/i }).or(this.page.getByRole('button', { name: /representatives/i })); }
  get representativeCards(): Locator { return this.page.locator('article').filter({ hasText: /phone|mobile|email/i }); }
  representativeTerritory(card: Locator): Locator { return card.getByRole('heading').first().or(card.locator('h2,h3,h4').first()); }
  representativeContact(card: Locator): Locator { return card.getByRole('link', { name: /phone|mobile|email|@|\d{3}/i }).first().or(card.getByText(/phone|mobile|email/i).first()); }
  async open(): Promise<void> { await this.page.goto('/lp/edmonton-ab'); await expect(this.heading).toBeVisible(); }
}
