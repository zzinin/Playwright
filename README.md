# Playwright TypeScript Tutorial

A comprehensive tutorial project demonstrating Playwright with TypeScript for end-to-end testing. This project showcases best practices, patterns, and advanced features of Playwright testing framework.

## 📋 Prerequisites

**IMPORTANT: Before you can run this project, you need to install Node.js and npm first!**

### Windows Installation Options:

#### Option 1: Download from Official Website (Recommended)
1. Go to [Node.js official website](https://nodejs.org/)
2. Download the LTS version (Long Term Support)  
3. Run the installer and follow the setup wizard
4. **Restart your PowerShell/Command Prompt after installation**

#### Option 2: Using Chocolatey (if you have it installed)
```powershell
choco install nodejs
```

#### Option 3: Using Winget (Windows Package Manager)
```powershell
winget install OpenJS.NodeJS
```

#### Option 4: Using Scoop (if you have it installed)
```powershell
scoop install nodejs
```

### Verify Node.js Installation
After installing Node.js, **restart your terminal** and verify the installation:

```powershell
node --version
npm --version
```

You should see version numbers for both commands. If you get "command not found" errors, Node.js is not properly installed.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Examples](#test-examples)
- [Best Practices](#best-practices)
- [Configuration](#configuration)
- [Contributing](#contributing)

## ✨ Features

- **TypeScript Support**: Full TypeScript configuration with type safety
- **Page Object Model**: Structured page objects for maintainable tests
- **Custom Fixtures**: Reusable test fixtures and data management
- **Utility Functions**: Helper functions for common testing operations
- **Cross-Browser Testing**: Support for Chrome, Firefox, Safari, and Edge
- **Mobile Testing**: Responsive and mobile viewport testing
- **API Testing**: Direct API testing capabilities
- **Visual Testing**: Screenshot and video recording
- **CI/CD Ready**: Configured for continuous integration

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Installation

1. **Clone the repository** (or use this as a template):
   ```bash
   git clone <repository-url>
   cd playwright-typescript-tutorial
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npm run install:browsers
   ```

4. **Set up environment variables**:
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your specific configuration.

## 📁 Project Structure

```
playwright-typescript-tutorial/
├── fixtures/                 # Custom test fixtures
│   └── test-fixtures.ts
├── pages/                    # Page Object Model classes
│   ├── BasePage.ts
│   ├── HomePage.ts
│   └── FormPage.ts
├── test-data/               # Test data and files
│   ├── test-data.ts
│   └── files/
│       ├── sample.txt
│       └── sample.csv
├── tests/                   # Test files
│   ├── 01-basic-interactions.spec.ts
│   ├── 02-advanced-features.spec.ts
│   ├── 03-page-object-model.spec.ts
│   └── 04-fixtures-and-utilities.spec.ts
├── utils/                   # Utility functions
│   └── test-helpers.ts
├── playwright.config.ts     # Playwright configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Project dependencies
└── .env.example           # Environment variables template
```

## 🏁 Getting Started

**⚠️ Make sure you have completed the [Prerequisites](#prerequisites) section first!**

Once Node.js is installed and verified, follow these steps:

### 1. Install Project Dependencies
```powershell
npm install
```

### 2. Install Playwright Browsers
```powershell
npm run install:browsers
```

### 3. Copy Environment File (Optional)
```powershell
copy .env.example .env
```

### 4. Run Your First Test
```powershell
# Run all tests
npm test

# Run tests in headed mode (visible browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run specific test file
npx playwright test tests/01-basic-interactions.spec.ts
```

## 🚨 Troubleshooting

### Common Issues

1. **"npm is not recognized" Error**
   - Node.js is not installed or not in PATH
   - Follow the [Prerequisites](#prerequisites) section
   - Restart your terminal after installation

2. **Browser Installation Failed**
   ```powershell
   npm run install:browsers-with-deps
   ```

3. **Tests Timeout**
   - Increase timeout in `playwright.config.ts`
   - Check network connectivity

### 4. Run Tests in UI Mode

To use Playwright's interactive UI mode:

```bash
npm run test:ui
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test File
```bash
npx playwright test tests/01-basic-interactions.spec.ts
```

### Run Tests by Browser
```bash
npm run test:chrome
npm run test:firefox
npm run test:safari
```

### Run Tests with Reporter
```bash
npm run report
```

### Run Tests in Different Environments
```bash
# Staging environment
BASE_URL=https://staging.example.com npm test

# Local development
BASE_URL=http://localhost:3000 npm test
```

## 📝 Test Examples

### 1. Basic Interactions (`01-basic-interactions.spec.ts`)
- Page navigation and title verification
- Element interactions (click, fill, select)
- Form submissions
- Basic assertions

### 2. Advanced Features (`02-advanced-features.spec.ts`)
- Multi-tab/window handling
- File uploads and downloads
- Drag and drop operations
- Network request interception
- API mocking
- Mobile viewport testing

### 3. Page Object Model (`03-page-object-model.spec.ts`)
- Structured page objects
- Reusable page components
- Inheritance and composition
- Clean test organization

### 4. Fixtures and Utilities (`04-fixtures-and-utilities.spec.ts`)
- Custom test fixtures
- Test data management
- Helper function usage
- Retry mechanisms

## 🎯 Best Practices

### 1. Page Object Model
```typescript
// Good: Using page objects
const homePage = new HomePage(page);
await homePage.goto();
await homePage.clickGetStarted();

// Avoid: Direct page interactions in tests
await page.goto('https://example.com');
await page.click('[data-testid="get-started"]');
```

### 2. Custom Fixtures
```typescript
// Good: Using fixtures for setup
test('should login user', async ({ formPage, testUser }) => {
  await formPage.login(testUser.username, testUser.password);
});

// Avoid: Inline setup in every test
test('should login user', async ({ page }) => {
  const username = 'testuser';
  const password = 'testpass';
  // ... login logic
});
```

### 3. Utility Functions
```typescript
// Good: Using utilities for common operations
await waitAndClick(page.locator('#submit-btn'));

// Avoid: Repeating common patterns
await page.locator('#submit-btn').waitFor();
await page.locator('#submit-btn').click();
```

### 4. Test Data Management
```typescript
// Good: Centralized test data
import { testUsers } from '../test-data/test-data';
await formPage.login(testUsers.validUser.username, testUsers.validUser.password);

// Avoid: Hardcoded values
await formPage.login('user123', 'pass123');
```

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

Key configuration options:

- **Test Directory**: `./tests`
- **Parallel Execution**: Enabled
- **Retries**: 2 on CI, 0 locally
- **Reporters**: HTML, JSON, JUnit
- **Browsers**: Chrome, Firefox, Safari, Edge
- **Screenshots**: On failure
- **Videos**: On failure
- **Traces**: On retry

### TypeScript Configuration (`tsconfig.json`)

- **Target**: ES2022
- **Module**: CommonJS
- **Strict Mode**: Enabled
- **Path Mapping**: Configured for easy imports

### Environment Variables (`.env`)

```env
BASE_URL=https://playwright.dev
HEADLESS=false
BROWSER_TIMEOUT=30000
TEST_ENV=staging
```

## 🔍 Debugging

### 1. Visual Debugging
```bash
npm run test:headed  # Run with browser visible
npm run test:debug   # Run with Playwright Inspector
```

### 2. Screenshots and Videos
Tests automatically capture screenshots and videos on failure. Find them in:
- `test-results/` directory

### 3. Trace Viewer
```bash
npx playwright show-trace trace.zip
```

### 4. Console Logs
Enable verbose logging in `playwright.config.ts`:
```typescript
use: {
  // ... other options
  video: 'on',
  trace: 'on',
}
```

## 📊 Reporting

### HTML Report (Default)
```bash
npm run report
```

### Custom Reports
The project generates multiple report formats:
- HTML: Interactive report with screenshots
- JSON: Machine-readable test results
- JUnit: CI/CD integration format

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm ci
      - name: Install Playwright
        run: npm run install:browsers-with-deps
      - name: Run tests
        run: npm test
      - name: Upload test results
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Add tests for new functionality
5. Run tests: `npm test`
6. Commit changes: `git commit -am 'Add new feature'`
7. Push to branch: `git push origin feature/new-feature`
8. Submit a pull request

## 📚 Additional Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Testing Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

1. **Browser installation fails**:
   ```bash
   npm run install:browsers-with-deps
   ```

2. **TypeScript compilation errors**:
   ```bash
   npx tsc --noEmit
   ```

3. **Tests failing due to timeouts**:
   - Increase timeout in `playwright.config.ts`
   - Check network connectivity
   - Verify target application is accessible

4. **Permission issues on CI**:
   - Ensure proper permissions for test artifacts
   - Use `--user` flag for Docker installations

### Getting Help

- Check the [Playwright Discord](https://discord.gg/playwright-807756831384403968)
- Review [GitHub Issues](https://github.com/microsoft/playwright/issues)
- Consult [Stack Overflow](https://stackoverflow.com/questions/tagged/playwright)

---

**Happy Testing with Playwright! 🎭**