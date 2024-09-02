// loginPage.js

// LoginPage class to represent (Page Object Model) the login page of the application.
class LoginPage {
  constructor(page) {
    this.page = page; // Playwright's Page instance
    this.usernameInput = page.locator("#UserName"); // ID selector
    this.passwordInput = page.locator("#Password"); // ID selector
    this.manageUsers = page.locator('a:has-text("Manage Users")'); // locator for the Manage Users link
    this.loginButton = page.locator(
      'input[type="submit"][class="btn btn-default"]'
    ); // Selector for login button
  }

  // method to check if the "Manage Users" text is present in the Manage Users link
  async isManageUsers() {
    const text = await this.manageUsers.textContent();
    return text.includes("Manage Users");
  }

  // method to log in using the provided username and password
  async login(username, password) {
    await this.enterUsername(username); // using async/await to handle promises
    await this.enterPassword(password); // using async/await to handle promises
    await this.clickLoginButton(); // using async/await to handle promises
  }

  // method to enter a 'username' value to be typed into the username field
  async enterUsername(username) {
    await this.usernameInput.fill(username); // fill command to enter the username
  }

  // method to accept a 'password' value to be typed into the password field
  async enterPassword(password) {
    await this.passwordInput.fill(password); // fill command to enter the password
  }

  // method to trigger a click event on the login button
  async clickLoginButton() {
    await this.loginButton.click(); // click command to click the login button
  }
}

// export the LoginPage class to be used in other test files
module.exports = LoginPage;
