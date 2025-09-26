

class LoginPage{


constructor(page){
   this.page=page;
   this.usernameField=page.locator("//input[@name='user-name']");
   this.passwordField=page.locator("//input[@data-test='password']");
   this.loginButton=page.locator("//input[@id='login-button']");
}

async goTo(){
    await this.page.goto("https://www.saucedemo.com/");
}

async validLogin(username,password){
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();

}

}

module.exports={LoginPage};