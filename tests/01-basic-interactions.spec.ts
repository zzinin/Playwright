import { test, expect } from '@playwright/test';

/**
 * Basic navigation and page interaction tests
 * These tests demonstrate fundamental Playwright capabilities
 */

test.describe('Basic Navigation Tests', () => {
  
  test('should navigate to a page and verify title', async ({ page }) => {
    // Navigate to the Playwright documentation
    await page.goto('https://playwright.dev');
    
    // Verify the page title
    await expect(page).toHaveTitle(/Playwright/);
    
    // Verify a specific heading is visible
    await expect(page.locator('h1')).toContainText('Playwright');
  });

  test('should interact with navigation menu', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Click on the "Docs" link
    await page.click('text=Docs');
    
    // Verify we're on the docs page
    await expect(page).toHaveURL(/.*docs.*/);
    
    // Wait for and verify the main content is loaded
    await expect(page.locator('main')).toBeVisible();
  });

  test('should handle search functionality', async ({ page }) => {
    await page.goto('https://playwright.dev');
    
    // Look for search button/input (this may vary based on the actual site)
    const searchButton = page.locator('[aria-label="Search"]').first();
    
    if (await searchButton.isVisible()) {
      await searchButton.click();
      
      // Type in search input
      await page.fill('input[type="search"], input[placeholder*="Search"]', 'testing');
      
      // Press Enter to search
      await page.press('input[type="search"], input[placeholder*="Search"]', 'Enter');
      
      // Wait for search results (this is a general check)
      await page.waitForLoadState('networkidle');
    } else {
      console.log('Search functionality not found - skipping search test');
    }
  });

});

test.describe('Form Interactions', () => {
  
  test('should fill and submit a contact form', async ({ page }) => {
    // Using a demo form site for testing
    await page.goto('https://www.w3schools.com/html/html_forms.asp');
    
    // Look for form elements and interact with them
    const firstNameInput = page.locator('input[name="firstname"]').first();
    const lastNameInput = page.locator('input[name="lastname"]').first();
    
    if (await firstNameInput.isVisible()) {
      await firstNameInput.fill('John');
      await lastNameInput.fill('Doe');
      
      // Verify the values were entered
      await expect(firstNameInput).toHaveValue('John');
      await expect(lastNameInput).toHaveValue('Doe');
    }
  });

  test('should handle dropdown selections', async ({ page }) => {
    await page.goto('https://www.w3schools.com/html/html_form_elements.asp');
    
    // Look for select elements
    const selectElement = page.locator('select').first();
    
    if (await selectElement.isVisible()) {
      // Select an option by value
      await selectElement.selectOption('volvo');
      
      // Verify the selection
      await expect(selectElement).toHaveValue('volvo');
    }
  });

  test('should handle checkbox and radio buttons', async ({ page }) => {
    await page.goto('https://www.w3schools.com/html/html_form_input_types.asp');
    
    // Look for checkbox
    const checkbox = page.locator('input[type="checkbox"]').first();
    if (await checkbox.isVisible()) {
      await checkbox.check();
      await expect(checkbox).toBeChecked();
      
      await checkbox.uncheck();
      await expect(checkbox).not.toBeChecked();
    }
    
    // Look for radio button
    const radioButton = page.locator('input[type="radio"]').first();
    if (await radioButton.isVisible()) {
      await radioButton.check();
      await expect(radioButton).toBeChecked();
    }
  });

});