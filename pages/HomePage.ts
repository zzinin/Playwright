import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Home Page Object Model
 * Represents the main landing page
 */
export class HomePage extends BasePage {
  // Page URL
  private readonly url = 'https://playwright.dev';

  // Locators
  readonly heading: Locator;
  readonly getStartedButton: Locator;
  readonly docsLink: Locator;
  readonly searchButton: Locator;
  readonly githubLink: Locator;
  readonly navigationMenu: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.heading = page.locator('h1').first();
    this.getStartedButton = page.locator('text="Get started"').first();
    this.docsLink = page.locator('text="Docs"');
    this.searchButton = page.locator('[aria-label="Search"]');
    this.githubLink = page.locator('a[href*="github.com"]').first();
    this.navigationMenu = page.locator('nav');
  }

  /**
   * Navigate to the home page
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  /**
   * Click on Get Started button
   */
  async clickGetStarted(): Promise<void> {
    await this.getStartedButton.click();
  }

  /**
   * Navigate to documentation
   */
  async goToDocs(): Promise<void> {
    await this.docsLink.click();
    await this.waitForPageLoad();
  }

  /**
   * Perform search
   */
  async search(query: string): Promise<void> {
    if (await this.searchButton.isVisible()) {
      await this.searchButton.click();
      await this.page.fill('input[type="search"]', query);
      await this.page.press('input[type="search"]', 'Enter');
    }
  }

  /**
   * Check if the page loaded correctly
   */
  async verifyPageLoaded(): Promise<void> {
    await this.waitForElement(this.heading);
    await this.waitForElement(this.navigationMenu);
  }

  /**
   * Get the main heading text
   */
  async getHeadingText(): Promise<string> {
    return await this.heading.textContent() || '';
  }

  /**
   * Check if Get Started button is visible
   */
  async isGetStartedVisible(): Promise<boolean> {
    return await this.getStartedButton.isVisible();
  }

  /**
   * Open GitHub repository
   */
  async goToGitHub(): Promise<void> {
    await this.githubLink.click();
  }
}