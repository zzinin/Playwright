/**
 * Utility functions for Playwright tests
 * Common helper functions to reduce code duplication
 */

import { Page, Locator, expect } from '@playwright/test';

/**
 * Wait for element to be visible and then click
 */
export async function waitAndClick(locator: Locator, timeout: number = 10000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.click();
}

/**
 * Wait for element to be visible and then fill
 */
export async function waitAndFill(locator: Locator, value: string, timeout: number = 10000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
  await locator.fill(value);
}

/**
 * Take screenshot with timestamp
 */
export async function takeTimestampedScreenshot(page: Page, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ path: `screenshots/${name}-${timestamp}.png`, fullPage: true });
}

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 */
export function generateRandomEmail(): string {
  const randomString = generateRandomString(8);
  return `test.${randomString}@example.com`;
}

/**
 * Wait for page to load completely
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');
  await page.waitForLoadState('domcontentloaded');
}

/**
 * Scroll element into view and then interact
 */
export async function scrollAndClick(locator: Locator): Promise<void> {
  await locator.scrollIntoViewIfNeeded();
  await locator.click();
}

/**
 * Check if text is present on page
 */
export async function isTextPresent(page: Page, text: string): Promise<boolean> {
  try {
    await page.locator(`text=${text}`).waitFor({ timeout: 5000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get current timestamp
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Format date for input fields
 */
export function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Wait for multiple elements to be visible
 */
export async function waitForMultipleElements(locators: Locator[], timeout: number = 10000): Promise<void> {
  const promises = locators.map(locator => locator.waitFor({ state: 'visible', timeout }));
  await Promise.all(promises);
}

/**
 * Retry action with exponential backoff
 */
export async function retryAction<T>(
  action: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error | undefined = undefined;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await action();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxRetries) {
        if (lastError) {
          throw lastError;
        } else {
          throw new Error('Action failed after maximum retries, but no error was captured.');
        }
      }
      
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Action failed after maximum retries, but no error was captured.');
/**
 * Check if element exists without throwing error
 */
export async function elementExists(locator: Locator): Promise<boolean> {
  try {
    await locator.waitFor({ state: 'attached', timeout: 1000 });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get element text content safely
 */
export async function getTextContent(locator: Locator): Promise<string> {
  try {
    const text = await locator.textContent();
    return text || '';
  } catch {
    return '';
  }
}

/**
 * Clear and fill input field
 */
export async function clearAndFill(locator: Locator, value: string): Promise<void> {
  await locator.clear();
  await locator.fill(value);
}

/**
 * Upload file helper
 */
export async function uploadFile(page: Page, fileSelector: string, filePath: string): Promise<void> {
  const fileInput = page.locator(fileSelector);
  await fileInput.setInputFiles(filePath);
}

/**
 * Download file helper
 */
export async function downloadFile(page: Page, downloadTrigger: Locator): Promise<string> {
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    downloadTrigger.click()
  ]);
  
  const fileName = download.suggestedFilename();
  const filePath = `./test-results/downloads/${fileName}`;
  await download.saveAs(filePath);
  
  return filePath;
}

/**
 * Handle alert/confirm dialogs
 */
export async function handleDialog(page: Page, action: 'accept' | 'dismiss' = 'accept'): Promise<void> {
  page.on('dialog', async dialog => {
    if (action === 'accept') {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });
}

/**
 * Switch to iframe
 */
import { Frame } from '@playwright/test';

export async function switchToIframe(page: Page, iframeSelector: string): Promise<Frame | null> {
  const iframeElement = await page.locator(iframeSelector);
  return await iframeElement.contentFrame();
}

/**
export async function waitForAPIResponse(
  page: Page,
export async function waitForAPIResponse<T = unknown>(
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 30000
): Promise<T> {
  const response = await page.waitForResponse(urlPattern, { timeout });
  return response as T;
}

/**
 * Mock API response
 */
export async function mockAPIResponse(
  page: Page,
  urlPattern: string | RegExp,
  mockData: any,
  status: number = 200
): Promise<void> {
  await page.route(urlPattern, async route => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify(mockData)
    });
  });
}