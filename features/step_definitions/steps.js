const {Given, When ,Then }=require('@cucumber/cucumber');
const playwright = require('playwright');
const { expect } = require('@playwright/test');
require('dotenv').config();
 

Given('the user is on the login page of saucedemo', async function () {
   this.browser = playwright.chromium.launch({ headless: false});
   this.context= (await this.browser).newContext();
   this.page=(await this.context).newPage();

   (await this.page).goto(process.env.url);
   console.log("this is login page of saucedemo implemented successfuly with url launch" );
   (await this.page).pause();
});


When('the user enters valid credentials of saucedemo', async function () {

    (await this.page).locator("//input[@name='user-name']").fill(process.env.username);
  //console.log("this is username")
   (await this.page).locator("//input[@data-test='password']").fill(process.env.password);
    //console.log("this is password");
    (await this.page).locator("//input[@id='login-button']").click();
});

Then('the user should be redirected to the dashboard of saucedemo', async function () {
    expect(await this.page).toHaveURL('https://www.saucedemo.com/inventory.html');
   
});

When('the user enters invalid credentials of saucedemo', function () {
    console.log("this is invalid credentials of saucedemo");
});

Then('the user should see an error message indicating login failure', function () {
    console.log("this is error message of saucedemo");
});
