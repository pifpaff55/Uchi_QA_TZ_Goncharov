import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.click('._UCHI_COOKIE__button');
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async ({ page }) => {
    
    await widgetPage.openWidget();
    await page.waitForTimeout(1000); // Задержка 1 сек
    const articles = await widgetPage.getPopularArticles();
    await articles[0].click();
    //await page.waitForTimeout(5000); 
    await widgetPage.clickWriteToUs();
    //await page.waitForTimeout(5000); 
    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });

  test('is have correct title 2.0', async ({ page }) => {
    await widgetPage.openWidget;
    await widgetPage.clickAllArtycles;
    expect (await widgetPage.getTitle()).toEqual('База знаний Учи.ру')
  });
});
