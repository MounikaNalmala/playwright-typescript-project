import { expect, Locator, Page } from '@playwright/test';

export class EdmontonSearchPage {
  constructor(private readonly page: Page) {}
  get searchContext(): Locator {
    return this.page
      .getByText(/results? for\s*["“]?Edmonton/i)
      .first()
      .or(this.page.locator('input[value*=Edmonton]').first());
  }
  get resultSummary(): Locator {
    return this.page.getByText(/[\d,.]+[kK]?\s+results?\s+for/i).first();
  }
  get resultCards(): Locator {
    return this.page.locator('article').filter({ has: this.page.getByRole('heading') });
  }
  resultTitle(card: Locator): Locator {
    return card.getByRole('heading').first();
  }
  resultLocation(card: Locator): Locator {
    return card.getByText(/location/i).first();
  }
  resultDate(card: Locator): Locator {
    return card.getByText(/closing|auction/i).first();
  }
  async open(): Promise<void> {
    await this.page.goto('/search?freeText=Edmonton');
    await expect(this.resultSummary).toBeVisible();
  }
  async getDisplayedResultTotal(): Promise<number> {
    const text = await this.resultSummary.innerText();
    const match = text.match(/([\d,.]+)\s*([kK]?)/);
    if (!match) throw new Error(`Unable to parse result count from: ${text}`);
    return Number(match[1].replace(/,/g, '')) * (match[2].toLowerCase() === 'k' ? 1000 : 1);
  }
  async getResultTitles(): Promise<string[]> {
    const count = await this.resultCards.count();
    const titles: string[] = [];
    for (let i = 0; i < count; i++) {
      const title = (await this.resultTitle(this.resultCards.nth(i)).innerText()).trim();
      if (title) titles.push(title);
    }
    return titles;
  }
}
