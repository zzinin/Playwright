import { test, expect } from '@playwright/test';

/**
 * Advanced Playwright features and techniques
 * This file demonstrates more complex testing scenarios
 */

test.describe('Advanced Interactions', () => {

  test('should handle multiple tabs/windows', async ({ context }) => {
    // Create a new page
    const page = await context.newPage();
    await page.goto('https://playwright.dev');
    
    // Click a link that opens in a new tab (if available)
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.click('a[target="_blank"]', { timeout: 5000 }).catch(() => {
        // If no external link found, create a new page manually for demo
        return context.newPage();
      })
    ]);
    
    // Work with the new page
    await newPage.waitForLoadState();
    
    // Verify we have multiple pages
    expect(context.pages()).toHaveLength(2);
    
    // Close the new page
    await newPage.close();
  });

  test('should handle file upload', async ({ page }) => {
    // Note: This is a demo using a file upload testing site
    await page.goto('https://the-internet.herokuapp.com/upload');
    
    // Create a test file for upload
    const fileContent = 'This is a test file for Playwright upload demo';
    
    // Set up file input
    await page.setInputFiles('input[type="file"]', {
      name: 'test-file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from(fileContent)
    });
    
    // Click upload button
    await page.click('#file-submit');
    
    // Verify upload success
    await expect(page.locator('#uploaded-files')).toBeVisible();
  });

  test('should handle drag and drop', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/drag_and_drop');
    
    // Get source and target elements
    const sourceElement = page.locator('#column-a');
    const targetElement = page.locator('#column-b');
    
    // Perform drag and drop
    await sourceElement.dragTo(targetElement);
    
    // Verify the drop was successful by checking text content
    await expect(page.locator('#column-a header')).toContainText('B');
    await expect(page.locator('#column-b header')).toContainText('A');
  });

  test('should handle hover actions', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/hovers');
    
    // Hover over the first image
    await page.hover('.figure:first-child img');
    
    // Verify hover caption appears
    await expect(page.locator('.figure:first-child .figcaption')).toBeVisible();
    
    // Verify the caption text
    await expect(page.locator('.figure:first-child .figcaption h5')).toContainText('user1');
  });

});

test.describe('Mobile and Responsive Testing', () => {

  test('should test mobile viewport', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('https://playwright.dev');
    
    // Check if mobile menu is visible
    const mobileMenuButton = page.locator('button[aria-label="Toggle navigation bar"]');
    
    if (await mobileMenuButton.isVisible()) {
      await mobileMenuButton.click();
      
      // Verify mobile menu opened
      await expect(page.locator('.navbar-sidebar')).toBeVisible();
    }
  });

  test('should test different screen sizes', async ({ page }) => {
    const viewports = [
      { width: 1920, height: 1080, name: 'Desktop' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 375, height: 667, name: 'Mobile' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('https://playwright.dev');
      
      // Take screenshot for visual comparison
      await page.screenshot({ 
        path: `screenshots/${viewport.name.toLowerCase()}-view.png`,
        fullPage: true 
      });
      
      // Verify page loads correctly
      await expect(page.locator('h1')).toBeVisible();
    }
  });

});

test.describe('Network and API Testing', () => {

  test('should intercept network requests', async ({ page }) => {
    // Listen for all network requests
    const requests: string[] = [];
    
    page.on('request', request => {
      requests.push(request.url());
    });
    
    await page.goto('https://playwright.dev');
    
    // Verify that some requests were made
    expect(requests.length).toBeGreaterThan(0);
    
    // Check for specific resource types
    const jsRequests = requests.filter(url => url.includes('.js'));
    const cssRequests = requests.filter(url => url.includes('.css'));
    
    expect(jsRequests.length).toBeGreaterThan(0);
    expect(cssRequests.length).toBeGreaterThan(0);
  });

  test('should mock API responses', async ({ page }) => {
    // Mock API endpoint
    await page.route('**/api/users', async route => {
      const mockData = {
        users: [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
        ]
      };
      
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify(mockData)
      });
    });
    
    // Navigate to a page that would call this API
    await page.goto('https://jsonplaceholder.typicode.com/users');
    
    // The actual test would depend on how the page consumes the API
    // This is just a demonstration of the mocking capability
  });

  test('should test API endpoints directly', async ({ request }) => {
    // Test API directly without UI
    const response = await request.get('https://jsonplaceholder.typicode.com/users/1');
    
    // Verify response status
    expect(response.status()).toBe(200);
    
    // Parse and verify response data
    const userData = await response.json();
    expect(userData).toHaveProperty('id', 1);
    expect(userData).toHaveProperty('name');
    expect(userData).toHaveProperty('email');
  });

});