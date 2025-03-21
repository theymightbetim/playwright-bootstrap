import { type Locator, type Page } from "@playwright/test";

export abstract class BasePage {
    readonly page: Page;
    readonly url: string;

    constructor(page: Page) {
        this.page = page;
    }
    async goto() {
        await this.page.goto(this.url);
    }

}
