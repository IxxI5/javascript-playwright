# Testing with JavaScript Playwright

Author: IxxI5

### Description

This repository showcases examples of website testing using Playwright, both with and without the Page Object Model.

### Prerequisites

- **VS Code** is installed or download it from: https://code.visualstudio.com/

- **Node JS** is installed or download the latest version from: https://nodejs.org/en

### Launch a Test

After downloading the javascript-playwright repository, follow these steps:

- **Unzip** the downloaded file.
- **Open** VS Code Terminal
- **Install Dependencies** through VS Code Terminal:

  ```
  npm install
  ```

- **Run a Test in Headless Mode (without a browser)**

  ```javascript
  // set in playwright.config.js: headless: true
  npx playwright test tests/ea_website_tests.spec.js
  ```

- **Run a Test in Headful Mode (with Firefox as browser)**

  ```javascript
  // set in playwright.config.js: headless: false
  npx playwright test tests/ea_website_tests.spec.js --project=firefox
  ```

### Create a Playwright Project Step by Step

- **Execute** the following npm command in VS Code Terminal (Command Prompt):

  ```javascript
  mkdir playwright-project

  cd playwright-project

  mkdir tests

  mkdir pages

  mkdir utils

  cd tests

  type nul > myTest.spec.js

  cd..

  type nul > playwright.config.js

  type nul > .gitignore

  type nul > README.md

  npm init -y

  npm install --save-dev @playwright/test

  npx playwright install
  ```

- **Project Structure**

  ```
  playwright-project/
  ├── pages/
  ├── tests/
  │   └── myTest.spec.js
  ├── utils/
  ├── .gitignore
  ├── package.json
  ├── playwright.config.js
  └── README.md
  ```

- **Configure** the **.gitignore** file:
  ```
  node_modules/
  test-results/
  temp/
  ```
- **Configure** the **playwright.config.js** file:

  ```javascript
  // playwright.config.js
  const { defineConfig } = require("@playwright/test");

  module.exports = defineConfig({
    timeout: 30000, // Maximum time one test can run in milliseconds
    retries: 2, // Retry on failures
    use: {
      headless: false, // Run tests in headful mode
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true,
      video: "on-first-retry",
      baseURL: "http://localhost:3000", // Change this to your app's URL
    },
    projects: [
      {
        name: "chromium",
        use: { browserName: "chromium" },
      },
      {
        name: "firefox",
        use: { browserName: "firefox" },
      },
      {
        name: "webkit",
        use: { browserName: "webkit" },
      },
    ],
  });
  ```

- **Create** a Test:

  ```javascript
  // tests/myTest.spec.js
  const { test, expect } = require("@playwright/test");

  test("Simple Login Test", async ({ page }) => {
    // Step 1: Arrange - Navigate to the login page
    await page.goto("http://example.com"); // replace with your URL

    // Step 2: Act - Click the login link
    await page.click("#loginLink"); // click on the login button to navigate to the login page

    // Step 3: Act - Fill in the login form
    await page.fill("#UserName", "admin"); // enter username
    await page.fill("#Password", "password"); // enter password
    await page.click('input[type="submit"].btn.btn-default'); // click the login button

    // Step 4: Assert - Verify that the 'Manage' link is visible
    await expect(page.locator('a:has-text("Manage")')).toBeVisible();
  });
  ```

- **Run a Test in Headless Mode (without a browser)**

  ```javascript
  // set in playwright.config.js: headless: true
  npx playwright test tests/myTest.spec.js
  ```

- **Run a Test in Headful Mode (with Firefox as browser)**

  ```javascript
  // set in playwright.config.js: headless: false
  npx playwright test tests/myTest.spec.js --project=firefox
  ```

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
