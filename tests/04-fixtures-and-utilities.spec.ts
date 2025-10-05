import { test, expect } from '../fixtures/test-fixtures';
import { testUsers, formData, successMessages } from '../test-data/test-data';
import { 
  waitAndClick, 
  waitAndFill, 
  takeTimestampedScreenshot,
  generateRandomEmail,
  retryAction 
} from '../utils/test-helpers';

/**
 * Tests using fixtures and utilities
 * Demonstrates how to use custom fixtures and helper functions
 */

test.describe('Fixture-based Tests', () => {

  test('should use HomePage fixture for navigation', async ({ homePage }) => {
    // Navigate using the fixture
    await homePage.goto();
    await homePage.verifyPageLoaded();
    
    // Verify page content
    const headingText = await homePage.getHeadingText();
    expect(headingText).toContain('Playwright');
    
    // Take screenshot using utility
    await takeTimestampedScreenshot(homePage.page, 'homepage-fixture-test');
  });

  test('should use FormPage fixture with test data', async ({ formPage, testUser }) => {
    // Navigate to form page
    await formPage.goto();
    
    // Use test data from fixture
    await formPage.login(testUser.username, testUser.password);
    
    // Verify login success
    const isSuccessful = await formPage.isLoginSuccessful();
    expect(isSuccessful).toBe(true);
    
    // Verify success message
    const successMessage = await formPage.getSuccessMessage();
    expect(successMessage).toContain(successMessages.login);
    
    // Logout
    await formPage.logout();
  });

  test('should use test data for form validation', async ({ formPage }) => {
    await formPage.goto();
    
    // Test with invalid user data
    await formPage.login(testUsers.invalidUser.username, testUsers.invalidUser.password);
    
    // Verify error handling
    const hasError = await formPage.hasErrorMessage();
    expect(hasError).toBe(true);
    
    // Clear form and try with valid user
    await formPage.clearForm();
    await formPage.login(testUsers.validUser.username, testUsers.validUser.password);
    
    // Verify success
    const isSuccessful = await formPage.isLoginSuccessful();
    expect(isSuccessful).toBe(true);
  });

});

test.describe('Utility Function Tests', () => {

  test('should use helper functions for interactions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/login');
    
    // Use utility functions for form interaction
    const usernameInput = page.locator('#username');
    const passwordInput = page.locator('#password');
    const loginButton = page.locator('button[type="submit"]');
    
    await waitAndFill(usernameInput, testUsers.validUser.username);
    await waitAndFill(passwordInput, testUsers.validUser.password);
    await waitAndClick(loginButton);
    
    // Verify success
    const successMessage = page.locator('#flash.success');
    await expect(successMessage).toBeVisible();
  });

  test('should generate random data for testing', async ({ page }) => {
    const randomEmail = generateRandomEmail();
    
    // Verify email format
    expect(randomEmail).toMatch(/^test\.[a-zA-Z0-9]{8}@example\.com$/);
    
    // Use random email in form (demo only)
    console.log(`Generated email: ${randomEmail}`);
  });

  test('should use retry mechanism for flaky operations', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Use retry utility for potentially flaky operation
    const clickResult = await retryAction(async () => {
      const docsLink = page.locator('text=Docs');
      await docsLink.click();
      
      // Verify navigation succeeded
      await expect(page).toHaveURL(/.*docs.*/);
      return 'success';
    }, 3, 1000);
    
    expect(clickResult).toBe('success');
  });

});

test.describe('Advanced Fixture Usage', () => {

  test('should combine multiple fixtures', async ({ homePage, formPage, testUser }) => {
    // Start with home page
    await homePage.goto();
    await homePage.verifyPageLoaded();
    
    // Open form page in same browser context
    await formPage.goto();
    
    // Use test user data
    await formPage.login(testUser.username, testUser.password);
    
    // Verify login
    const isLoggedIn = await formPage.isLoginSuccessful();
    expect(isLoggedIn).toBe(true);
    
    // Navigate back to home page
    await homePage.goto();
    
    // Both page objects should work correctly
    const headingText = await homePage.getHeadingText();
    expect(headingText).toContain('Playwright');
  });

  test('should demonstrate fixture cleanup', async ({ formPage, testUser }) => {
    // Login
    await formPage.goto();
    await formPage.login(testUser.username, testUser.password);
    
    // Verify login
    expect(await formPage.isLoginSuccessful()).toBe(true);
    
    // Logout (cleanup)
    await formPage.logout();
    
    // Verify logout
    expect(await formPage.areFormFieldsEnabled()).toBe(true);
  });

});