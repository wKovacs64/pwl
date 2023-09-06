import { test as base } from '@playwright/test';
import { AxePage } from './axe-page';

export const test = base.extend<{ axePage: AxePage }>({
  axePage: async ({ page }, use) => {
    const axePage = new AxePage(page);
    await use(axePage);
  },
});

export { expect } from '@playwright/test';
