import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

export class AxePage {
  constructor(public readonly page: Page) {}

  async checkA11y() {
    const defaultThemeA11yScanResults = await new AxeBuilder({
      page: this.page,
    }).analyze();
    expect(defaultThemeA11yScanResults.violations).toEqual([]);
    await this.page.getByRole('img', { name: /toggle dark/i }).click();
    const alternateThemeA11yScanResults = await new AxeBuilder({
      page: this.page,
    }).analyze();
    expect(alternateThemeA11yScanResults.violations).toEqual([]);
  }
}
