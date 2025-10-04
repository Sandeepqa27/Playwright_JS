class LoginNewPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('//input[@id="uid"]');
    this.passwordInput = page.locator('//input[@id="passw"]');
    this.loginButton = page.locator('//input[@value="Login"]');
  }

  async navigate() {
    await this.page.goto('https://demo.testfire.net/login.jsp');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginNewPage };