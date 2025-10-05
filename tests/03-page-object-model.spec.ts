import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FormPage } from '../pages/FormPage';

/**
 * Page Object Model Tests
 * Demonstrates how to use page objects for cleaner, more maintainable tests
 */

test.describe('Page Object Model Tests', () => {

  test('should navigate and interact using HomePage object', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Navigate to home page
    await homePage.goto();
    
    // Verify page loaded correctly
    await homePage.verifyPageLoaded();
    
    // Check heading text
    const headingText = await homePage.getHeadingText();
    expect(headingText).toContain('Playwright');
    
    // Verify Get Started button is visible
    const isGetStartedVisible = await homePage.isGetStartedVisible();
    expect(isGetStartedVisible).toBe(true);
    
    // Navigate to docs
    await homePage.goToDocs();
    
    // Verify URL changed
    const currentUrl = homePage.getCurrentUrl();
    expect(currentUrl).toContain('docs');
  });

  test('should handle form interactions using FormPage object', async ({ page }) => {
    const formPage = new FormPage(page);
    
    // Navigate to form page
    await formPage.goto();
    
    // Verify form fields are enabled
    const fieldsEnabled = await formPage.areFormFieldsEnabled();
    expect(fieldsEnabled).toBe(true);
    
    // Test invalid login
    await formPage.login('invalid_user', 'invalid_pass');
    
    // Check for error message
    const hasError = await formPage.hasErrorMessage();
    expect(hasError).toBe(true);
    
    const errorMessage = await formPage.getErrorMessage();
    expect(errorMessage).toContain('invalid');
    
    // Test valid login (these are the demo credentials for the test site)
    await formPage.login('tomsmith', 'SuperSecretPassword!');
    
    // Verify successful login
    const isLoginSuccessful = await formPage.isLoginSuccessful();
    expect(isLoginSuccessful).toBe(true);
    
    // Logout
    await formPage.logout();
    
    // Verify we're back to login page
    expect(await formPage.areFormFieldsEnabled()).toBe(true);
  });

  test('should demonstrate page object reusability', async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Use the same page object in different test scenarios
    await homePage.goto();
    
    // Take screenshot using base page functionality
    await homePage.takeScreenshot('homepage-test');
    
    // Get page title using base page functionality
    const title = await homePage.getTitle();
    expect(title).toBeTruthy();
    
    // Verify current URL
    const url = homePage.getCurrentUrl();
    expect(url).toContain('playwright.dev');
  });

});

test.describe('Page Object with Multiple Instances', () => {

  test('should work with multiple page objects', async ({ page, context }) => {
    const homePage = new HomePage(page);
    
    // Navigate to home page
    await homePage.goto();
    await homePage.verifyPageLoaded();
    
    // Open a new page and create a form page object
    const newPage = await context.newPage();
    const formPage = new FormPage(newPage);
    
    // Navigate to form page in the new tab
    await formPage.goto();
    
    // Both pages should work independently
    const homePageTitle = await homePage.getTitle();
    const homePageHeading = await homePage.getHeadingText();
    
    expect(homePageTitle).toContain('Playwright');
    expect(homePageHeading).toContain('Playwright');
    
    // Form page should also work
    const formFieldsEnabled = await formPage.areFormFieldsEnabled();
    expect(formFieldsEnabled).toBe(true);
    
    // Clean up
    await newPage.close();
  });

});