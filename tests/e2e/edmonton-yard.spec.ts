import { test, expect } from '@playwright/test';
import { EdmontonYardPage } from '../../src/pages/edmonton-yard.page';
import { testData } from '../../src/data/test-data';

test.describe('Scenario 3 - Edmonton yard page', { tag: '@ui' }, () => {
  let yard: EdmontonYardPage;

  test.beforeEach(async ({ page }) => {
    yard = new EdmontonYardPage(page);
    await yard.open();
  });

  test(
    '3.1 - should display Edmonton address, office hours and phone number',
    { tag: '@smoke' },
    async () => {
      await test.step('Verify yard address', async () => {
        await expect(yard.detailsSection).toBeVisible();
        for (const part of testData.edmonton.addressParts) {
          await expect(yard.detailsSection).toContainText(part);
        }
      });

      await test.step('Verify office hours and phone number', async () => {
        await expect(yard.detailsSection).toContainText(testData.edmonton.officeHours);
        await expect(yard.detailsSection).toContainText(testData.edmonton.timeRange);
        await expect(yard.phoneNumber).toBeVisible();
      });
    }
  );

  test('3.2 - should display at least one auction event with date range and title', async () => {
    await expect(yard.auctionEventsHeading).toBeVisible();

    const cards = yard.auctionEventCards;
    const cardCount = await cards.count();

    expect(cardCount).toBeGreaterThanOrEqual(testData.edmonton.auctionEvents.minimumCount);

    for (let i = 0; i < cardCount; i++) {
      const card = cards.nth(i);
      await expect(card).toContainText(testData.edmonton.auctionEvents.dateRange);
      await expect(yard.eventTitle(card)).not.toHaveText('');
    }
  });

  test('3.3 - should display non-empty About this yard information', async () => {
    await expect(yard.aboutYardHeading).toBeVisible();
    await expect(yard.aboutYardSection).not.toHaveText('');

    for (const text of testData.edmonton.aboutYard.expectedText) {
      await expect(yard.aboutYardSection).toContainText(text);
    }
  });

  test('3.4 - should display more than 5 items in yard categories with names and quantities', async () => {
    await test.step('Verify the items in yard category count and card details', async () => {
      await expect(yard.itemsInYardHeading).toBeVisible();

      const cards = yard.itemCategoryCards;
      const cardCount = await cards.count();

      expect(cardCount).toBeGreaterThan(testData.edmonton.itemsInYard.minimumCount);

      for (let i = 0; i < cardCount; i++) {
        const card = cards.nth(i);
        await expect(yard.itemCategoryName(card)).not.toHaveText('');
        await expect(card).toContainText(testData.edmonton.itemsInYard.quantity);
      }
    });

    await test.step('Verify required equipment categories', async () => {
      await expect(
        yard.itemCategoryByName(testData.edmonton.itemsInYard.requiredEquipment)
      ).toBeAttached();

      const names = await yard.getItemCategoryNames();
      const hasExpectedEquipment = testData.edmonton.itemsInYard.additionalEquipment.some((item) =>
        names.some((name) => name.includes(item))
      );

      expect(hasExpectedEquipment).toBeTruthy();
    });
  });

  test('3.5 - should display Become a seller form and phone number without submitting', async () => {
    await expect(yard.sellerForm).toBeVisible();
    await expect(yard.sellerHeading).toBeVisible();
    await expect(yard.sellerPhone).toBeVisible();
  });

  test('3.6 - should display representative contact information', async () => {
    await test.step('Open the Representatives tab', async () => {
      await expect(yard.representativesTab).toBeVisible();
      await yard.representativesTab.click();
    });

    await test.step('Verify representative territory and contact information', async () => {
      const card = yard.representativeCards.first();

      await expect(card).toBeVisible();
      await expect(yard.representativeTerritory(card)).not.toHaveText('');
      await expect(yard.representativeContact(card)).toBeVisible();
    });
  });
});
