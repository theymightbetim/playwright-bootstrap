import { test as base } from '@playwright/test';
import { HomePage } from '../../pages/homepage.pom';

type MyFixtures = {
    homePage: HomePage;
};

export const test = base.extend<MyFixtures>({
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        await homePage.goto();
        await use(homePage);
    },
});

export { expect } from '@playwright/test';