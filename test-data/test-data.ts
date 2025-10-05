/**
 * Test data for various test scenarios
 * Centralized location for test data management
 */

// User credentials for testing
export const testUsers = {
  validUser: {
    username: 'tomsmith',
    password: 'SuperSecretPassword!',
    email: 'valid@example.com',
    firstName: 'Tom',
    lastName: 'Smith'
  },
  invalidUser: {
    username: 'invalid_user',
    password: 'wrong_password',
    email: 'invalid@example.com',
    firstName: 'Invalid',
    lastName: 'User'
  },
  adminUser: {
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User'
  }
};

// Form test data
export const formData = {
  contactForm: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    message: 'This is a test message for form submission.',
    subject: 'Test Subject'
  },
  registrationForm: {
    username: 'newuser123',
    email: 'newuser@example.com',
    password: 'SecurePass123!',
    confirmPassword: 'SecurePass123!',
    firstName: 'New',
    lastName: 'User',
    dateOfBirth: '1990-01-01',
    gender: 'male'
  }
};

// URLs for testing different environments
export const testUrls = {
  production: 'https://playwright.dev',
  staging: 'https://staging.playwright.dev',
  development: 'http://localhost:3000',
  demoSites: {
    forms: 'https://the-internet.herokuapp.com/login',
    dragDrop: 'https://the-internet.herokuapp.com/drag_and_drop',
    upload: 'https://the-internet.herokuapp.com/upload',
    hover: 'https://the-internet.herokuapp.com/hovers',
    w3schools: 'https://www.w3schools.com/html/html_forms.asp'
  }
};

// API endpoints for testing
export const apiEndpoints = {
  jsonPlaceholder: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
    users: '/users',
    posts: '/posts',
    comments: '/comments',
    albums: '/albums',
    photos: '/photos'
  },
  reqres: {
    baseUrl: 'https://reqres.in',
    users: '/api/users',
    login: '/api/login',
    register: '/api/register'
  }
};

// Browser configurations for cross-browser testing
export const browserConfig = {
  desktop: {
    chrome: { width: 1920, height: 1080 },
    firefox: { width: 1920, height: 1080 },
    safari: { width: 1920, height: 1080 },
    edge: { width: 1920, height: 1080 }
  },
  mobile: {
    iphone: { width: 375, height: 667 },
    android: { width: 360, height: 640 },
    tablet: { width: 768, height: 1024 }
  }
};

// Test timeouts and delays
export const timeouts = {
  short: 5000,
  medium: 10000,
  long: 30000,
  veryLong: 60000
};

// File paths for uploads and downloads
export const filePaths = {
  uploads: {
    textFile: './test-data/files/sample.txt',
    imageFile: './test-data/files/sample.jpg',
    pdfFile: './test-data/files/sample.pdf',
    csvFile: './test-data/files/sample.csv'
  },
  downloads: './test-results/downloads',
  screenshots: './test-results/screenshots',
  videos: './test-results/videos'
};

// Common text patterns for validation
export const textPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s\-\(\)]{10,}$/,
  url: /^https?:\/\/.+/,
  numbers: /^\d+$/,
  alphabetic: /^[a-zA-Z\s]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/
};

// Error messages for validation
export const errorMessages = {
  required: 'This field is required',
  invalidEmail: 'Please enter a valid email address',
  invalidPhone: 'Please enter a valid phone number',
  passwordMismatch: 'Passwords do not match',
  invalidCredentials: 'Invalid username or password',
  networkError: 'Network error occurred',
  serverError: 'Server error occurred'
};

// Success messages
export const successMessages = {
  login: 'You logged into a secure area!',
  logout: 'You logged out of the secure area!',
  formSubmission: 'Form submitted successfully',
  dataUpdated: 'Data updated successfully',
  fileUploaded: 'File uploaded successfully'
};