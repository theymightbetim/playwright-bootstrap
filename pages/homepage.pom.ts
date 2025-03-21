import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.pom";

export class HomePage extends BasePage {
    readonly locator: Locator;
    readonly testIdLocator: Locator;
    readonly roleLocator: Locator;
    readonly url: string;

    constructor(page: Page) {
        super(page)
        this.url = ('/')
        this.testIdLocator = page.getByTestId('test-id')
        this.locator = page.locator('a', { hasText: 'text' })
        this.roleLocator = page.getByRole(
            "button", { name: 'name' }
        )
    }
}