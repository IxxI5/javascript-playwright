// tests\ea_website_tests.spec.js
// EA Website Tests

const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/loginPage");

test.describe("EA Website Tests", () => {
  // Arrange
  // Runs before each test
  test.beforeEach(async ({ page }) => {
    await page.goto("http://eaapp.somee.com/");
    // await page.setViewportSize({ width: 1920, height: 1080 }); // sets the viewport to 1920x1080 pixels (1080p)
    // viewport setting is overriden by the playwright.config.js
    // use: headless: false (headful) is overriden by the playwright.config.js (thus ignores npm command line arguments)
  });

  test("Test1 - Login Test (without Page Object Model)", async ({ page }) => {
    // Act
    await page.click("#loginLink", { timeout: 5000 }); // waits for the element with the id "loginLink"
    await page.fill('input[name="UserName"]', "admin"); // waits for the element with the name "UserName"
    await page.fill("#Password", "password"); // waits for the element with the id "Password"
    await page.click(".btn-default"); // waits for the element with the class name "btn-default"

    // Assert
    const logOff = page.locator('a:has-text("Log off")'); // waits for the element with the text "Log off"
    await expect(logOff).toHaveText("Log off"); // asserts that the text "Log off" is present
  });

  test("Test2 - Dropdown Test (without Page Object Model)", async ({
    page,
  }) => {
    // Act
    await page.click("#loginLink"); // waits for the element with the id "loginLink"
    await page.fill('input[name="UserName"]', "admin"); // waits for the element with the name "UserName"
    await page.fill("#Password", "password"); // waits for the element with the id "Password"
    await page.click(".btn-default"); // waits for the element with the class name "btn-default"
    await page.click('a:has-text("Manage Users")'); // waits for the element with the text "Manage Users"

    // Wait for the table to be visible
    await page.waitForSelector("table"); // Ensure the table is present

    // log the HTML of the table for debugging
    // const tableHtml = await page.locator("table").innerHTML();
    // console.log("Table HTML:", tableHtml);

    // locate the row containing  <td>guest<input id="userName" name="userName" type="hidden" value="guest"></td>
    const guestRow = page
      .locator("tr") // locate the row of the table
      .locator('td:has(input#userName[value="guest"])') // with the specific <td> containing the <input> element having the latter value "guest"
      .locator(".."); // moves up from the td element to the parent

    // log the HTML of the guestRow for debugging
    // const guestRowHtml = await guestRow.innerHTML();
    // console.log("Guest Row HTML:", guestRowHtml);

    // ensure only one row is found (since 'guest' is unique)
    // const guestRowCount = await guestRow.count();

    // log the number of rows found for debugging
    // console.log(`Number of guest rows found: ${guestRowCount}`);

    // if (guestRowCount !== 1) {
    //   throw new Error(
    //     `Expected exactly one row with user "guest" but found ${guestRowCount}`
    //   );
    // }

    // find the dropdown within the guestRow
    const roleDropdown = guestRow.locator("select#RoleName"); // locate the <select> element with

    // Assert
    await expect(roleDropdown).toBeVisible(); // asserts that the <select> element is visible
    await roleDropdown.selectOption({ label: "Administrator" }); // select the 'Administrator' option

    // Assert
    await expect(roleDropdown).toHaveValue("Administrator"); // asserts that the value of the <select> element is "Administrator"
  });

  test("Test3 - Login Test (with Page Object Model)", async ({ page }) => {
    // navigate to the login page
    await page.click("#loginLink");

    // instantiate the LoginPage
    const loginPage = new LoginPage(page);

    // login
    await loginPage.login("admin", "password");

    // Assert
    await expect(loginPage.manageUsers).toBeVisible(); // asserts that the 'Manage Users' link is visible
  });
  // Runs after each test
  test.afterEach(async ({ page }) => {
    await page.waitForTimeout(3000); // wait for 3 seconds on each test e.g. Test1, Test2, Test3
  });
});
