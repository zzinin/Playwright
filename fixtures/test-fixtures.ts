import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { FormPage } from '../pages/FormPage';

/**
 * Custom test fixtures for Playwright
 * Fixtures provide a way to set up and tear down test data and objects
 */

// Define the types for our fixtures
type TestFixtures = {
  homePage: HomePage;
  formPage: FormPage;
  testUser: {
    username: string;
    password: string;
    email: string;
  };
};

// Extend the base test with custom fixtures
export const test = base.extend<TestFixtures>({
  
  // HomePage fixture - automatically creates a HomePage instance
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  // FormPage fixture - automatically creates a FormPage instance
  formPage: async ({ page }, use) => {
    const formPage = new FormPage(page);
    await use(formPage);
  },

  // Test user data fixture
  testUser: async ({}, use) => {
    const user = {
      username: 'tomsmith',
      password: 'SuperSecretPassword!',
      email: 'test@example.com'
    };
    await use(user);
  },

});

// Re-export expect for convenience
export { expect } from '@playwright/test';