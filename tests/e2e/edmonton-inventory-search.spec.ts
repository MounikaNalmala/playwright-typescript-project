import { test, expect } from '@playwright/test';
import { EdmontonSearchPage } from '../../src/pages/edmonton-search.page';
import { testData } from '../../src/data/test-data';

test.describe('Scenario 4 - Edmonton inventory search', { tag: '@ui' }, () => {
  let searchPage: EdmontonSearchPage;
  test.beforeEach(async ({ page }) => {
    searchPage = new EdmontonSearchPage(page);
    await searchPage.open();
  });
  test(
    '4.1 - should open inventory search with Edmonton context',
    { tag: '@smoke' },
    async ({ page }) => {
      await expect(page).toHaveURL(/freeText=Edmonton/i);
      await expect(searchPage.searchContext).toContainText(testData.search.query);
    }
  );
  test('4.2 - should display a positive result total and valid first-page inventory', async () => {
    const total = await test.step('Read the displayed inventory result total', async () => {
      const displayedTotal = await searchPage.getDisplayedResultTotal();
      expect(displayedTotal).toBeGreaterThan(testData.search.minimumResultCount);
      return displayedTotal;
    });

    const titles = await test.step('Validate first-page inventory titles', async () => {
      const cards = searchPage.resultCards;
      expect(await cards.count()).toBeGreaterThan(0);
      for (let i = 0; i < (await cards.count()); i++)
        await expect(searchPage.resultTitle(cards.nth(i))).not.toHaveText('');
      return searchPage.getResultTitles();
    });

    await test.step('Log the displayed total and first five titles', async () => {
      console.log(`UI Edmonton inventory total: ${total}`);
      console.log('First 5 titles:', titles.slice(0, testData.search.titlesToLog));
    });
  });
});
