import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Form Page Object Model
 * Demonstrates form interactions and validations
 */
export class FormPage extends BasePage {
  // Page URL - using a demo form for testing
  private readonly url = 'https://the-internet.herokuapp.com/login';

  // Form locators
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;
  readonly successMessage: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('#flash.error');
    this.successMessage = page.locator('#flash.success');
    this.logoutButton = page.locator('a[href="/logout"]');
  }

  /**
   * Navigate to the form page
   */
  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  /**
   * Fill username field
   */
  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  /**
   * Fill password field
   */
  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  /**
   * Click login button
   */
  async clickLogin(): Promise<void> {
    await this.loginButton.click();
    await this.waitForPageLoad();
  }

  /**
   * Complete login process
   */
  async login(username: string, password: string): Promise<void> {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLogin();
  }

  /**
   * Logout from the application
   */
  async logout(): Promise<void> {
    if (await this.logoutButton.isVisible()) {
      await this.logoutButton.click();
      await this.waitForPageLoad();
    }
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    if (await this.errorMessage.isVisible()) {
      return await this.errorMessage.textContent() || '';
    }
    return '';
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    if (await this.successMessage.isVisible()) {
      return await this.successMessage.textContent() || '';
    }
    return '';
  }

  /**
   * Check if login was successful
   */
  async isLoginSuccessful(): Promise<boolean> {
    return await this.logoutButton.isVisible();
  }

  /**
   * Check if error message is displayed
   */
  async hasErrorMessage(): Promise<boolean> {
    return await this.errorMessage.isVisible();
  }

  /**
   * Clear all form fields
   */
  async clearForm(): Promise<void> {
    await this.usernameInput.clear();
    await this.passwordInput.clear();
  }

  /**
   * Get username field value
   */
  async getUsernameValue(): Promise<string> {
    return await this.usernameInput.inputValue();
  }

  /**
   * Get password field value
   */
  async getPasswordValue(): Promise<string> {
    return await this.passwordInput.inputValue();
  }

  /**
   * Check if form fields are enabled
   */
  async areFormFieldsEnabled(): Promise<boolean> {
    const usernameEnabled = await this.usernameInput.isEnabled();
    const passwordEnabled = await this.passwordInput.isEnabled();
    const buttonEnabled = await this.loginButton.isEnabled();
    
    return usernameEnabled && passwordEnabled && buttonEnabled;
  }
}