/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import { test, expect } from '../utils';
import {
  EXPOSURE_ROUTE,
  EXPOSED_PASSWORD,
  EXPOSED_PASSWORD_COUNT,
  CLEAN_PASSWORD,
  EXPOSED_PASSWORD_RESPONSE_BODY,
  CLEAN_PASSWORD_RESPONSE_BODY,
} from '../mock-data';
import {
  characterClassificationLabels,
  classifyCharacters,
} from '../../src/character-classification';

test.describe('Index Page', () => {
  // eslint-disable-next-line playwright/expect-expect
  test('has no detectable a11y violations on load', async ({ page, axePage }) => {
    await page.goto('/');
    await axePage.checkA11y();
  });

  test('has no detectable a11y violations when showing results', async ({ page, axePage }) => {
    await page.route(EXPOSURE_ROUTE, (route) => {
      return route.fulfill({
        status: 200,
        body: EXPOSED_PASSWORD_RESPONSE_BODY,
      });
    });

    await page.goto('/');
    await page.getByLabel('Password').fill(EXPOSED_PASSWORD);
    await expect(page.getByTestId('results')).toBeVisible();
    await expect(page.getByText(/Uh-oh/i)).toBeVisible();
    await axePage.checkA11y();
  });

  test('only shows results section with input', async ({ page }) => {
    await page.route(EXPOSURE_ROUTE, (route) => {
      return route.fulfill({
        status: 418,
      });
    });

    await page.goto('/');
    await expect(page.getByTestId('results')).toBeHidden();
    await page.getByLabel('Password').fill(EXPOSED_PASSWORD);
    await expect(page.getByTestId('results')).toBeVisible();
  });

  test('includes link to source', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('img', { name: /view source/i })).toBeVisible();
  });

  test.describe('Password Through Lense', () => {
    test('contains classified characters matching the input', async ({ page }) => {
      await page.goto('/');
      const password = ' P4ssw0rd! ';
      const classifiedCharacters = classifyCharacters(password);
      await page.getByLabel('Password').fill(password);
      const passwordThroughLenseLocator = page.getByTestId('password-through-lense');
      await expect(passwordThroughLenseLocator).toBeVisible();
      await expect(passwordThroughLenseLocator.locator('> *')).toHaveCount(password.length);
      for (const { character, type, label } of classifiedCharacters) {
        const characterLocator = passwordThroughLenseLocator.getByText(
          new RegExp(`^${character}$`),
        );
        const count = await characterLocator.count();
        for (let i = 0; i < count; i++) {
          await expect(characterLocator.nth(i)).toHaveClass(new RegExp(`text-${type}`));
          await expect(characterLocator.nth(i)).toHaveAttribute('title', label);
        }
      }
    });
  });

  test.describe('Legend', () => {
    test.beforeEach(async ({ page }) => {
      await page.route(EXPOSURE_ROUTE, (route) => {
        return route.fulfill({ status: 418 });
      });

      await page.goto('/');
      await page.getByLabel('Password').fill(EXPOSED_PASSWORD);
    });

    test('exists in results section', async ({ page }) => {
      await expect(page.getByTestId('results').getByTestId('legend')).toBeVisible();
    });

    test('is accurate', async ({ page }) => {
      const legend = page.getByTestId('legend');

      // Number
      const legendRowNumber = legend.getByTestId('legend-row--number');
      await expect(legendRowNumber.getByTestId('number-color')).toHaveClass(/bg-pwl-number/);
      await expect(
        legendRowNumber.getByText(characterClassificationLabels['pwl-number']),
      ).toBeVisible();

      // Uppercase
      const legendRowUppercase = legend.getByTestId('legend-row--uppercase');
      await expect(legendRowUppercase.getByTestId('uppercase-color')).toHaveClass(
        /bg-pwl-uppercase/,
      );
      await expect(
        legendRowUppercase.getByText(characterClassificationLabels['pwl-uppercase']),
      ).toBeVisible();

      // Lowercase
      const legendRowLowercase = legend.getByTestId('legend-row--lowercase');
      await expect(legendRowLowercase.getByTestId('lowercase-color')).toHaveClass(
        /bg-pwl-lowercase/,
      );
      await expect(
        legendRowLowercase.getByText(characterClassificationLabels['pwl-lowercase']),
      ).toBeVisible();

      // Special
      const legendRowSpecial = legend.getByTestId('legend-row--special');
      await expect(legendRowSpecial.getByTestId('special-color')).toHaveClass(/bg-pwl-special/);
      await expect(
        legendRowSpecial.getByText(characterClassificationLabels['pwl-special']),
      ).toBeVisible();
    });
  });

  test.describe('Public Exposure', () => {
    test('shows loading state', async ({ page }) => {
      await page.route(EXPOSURE_ROUTE, async (route) => {
        // delay must be longer than PwnedInfo's delayLoadingMs prop value
        await new Promise((resolve) => {
          setTimeout(resolve, 1000);
        });
        return route.fulfill({ status: 418 });
      });

      await page.goto('/');
      await page.getByLabel('Password').fill(EXPOSED_PASSWORD);
      await expect(
        page
          .getByTestId('results')
          .getByTestId('pwned-info')
          .getByText(/Loading/),
      ).toBeVisible();
    });

    test('shows positive feedback for clean passwords', async ({ page }) => {
      await page.route(EXPOSURE_ROUTE, (route) => {
        return route.fulfill({
          status: 200,
          body: CLEAN_PASSWORD_RESPONSE_BODY,
        });
      });

      await page.goto('/');
      await page.getByLabel('Password').fill(CLEAN_PASSWORD);
      await expect(page.getByTestId('results').getByText(/Congratulations/)).toBeVisible();
    });

    test('shows cautionary feedback for exposed passwords', async ({ page }) => {
      await page.route(EXPOSURE_ROUTE, (route) => {
        return route.fulfill({
          status: 200,
          body: EXPOSED_PASSWORD_RESPONSE_BODY,
        });
      });

      await page.goto('/');
      await page.getByLabel('Password').fill(EXPOSED_PASSWORD);
      const resultsLocator = page.getByTestId('results');
      await expect(resultsLocator.getByText(/Uh-oh/)).toBeVisible();
      await expect(resultsLocator.getByText(String(EXPOSED_PASSWORD_COUNT))).toBeVisible();
    });

    test('indicates when public exposure information is unavailable', async ({ page }) => {
      await page.route(EXPOSURE_ROUTE, (route) => {
        return route.fulfill({ status: 500, body: 'API Unavailable' });
      });

      await page.goto('/');
      await page.getByLabel('Password').fill(EXPOSED_PASSWORD);
      await expect(page.getByTestId('results').getByText(/Unavailable/i)).toBeVisible();
    });
  });
});
