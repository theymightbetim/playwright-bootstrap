import { test, expect } from './fixtures/example-fixture';

test('test load home page', async ({ homePage }) => {
    expect(homePage.page.url()).toContain(homePage.url);
    console.log(homePage.page.url())
});