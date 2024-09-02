// playwright.config.js
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  timeout: 30000, // maximum time one test can run in milliseconds
  retries: 2, // retry on failures
  use: {
    headless: false, // run tests in headful mode
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
    baseURL: "http://localhost:3000", // change this to your app's URL
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
