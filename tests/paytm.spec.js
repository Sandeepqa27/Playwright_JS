
const {test,expect,request}=require('@playwright/test');
import {logger} from "../logger"
require('dotenv').config();
// this will not work because it has mutlitple tabs
test("understanding page fixture",async({page})=>{
//const context=await browser.newContext();

//const page=await context.newPage();
await page.goto("https://paytm.com");
await page.locator("//li[text()='Recharge & Bills']").hover();
await page.waitForTimeout(10000);
await page.locator("//li[text()='Recharge & Bills']/..//a[text()='Mobile Recharge']").click();
await page.locator("//label[text()='Postpaid']").click();


});

test("understanding browser fixture",async({browser})=>{
const context=await browser.newContext();

const page=await context.newPage();
await page.goto("https://paytm.com");
await page.locator("//li[text()='Recharge & Bills']").hover();
await page.waitForTimeout(5000);
logger.info("Browser fixture and we are in old page only ")
const mobileRecharageLink= page.locator("//li[text()='Recharge & Bills']/..//a[text()='Mobile Recharge']");
const [newPage]=await Promise.all([
context.waitForEvent('page'),
mobileRecharageLink.click(),

])
logger.info("this is info message")
logger.info("New page is activated ,")
await newPage.locator("//label[text()='Postpaid']").click();
await newPage.waitForTimeout(3000);
logger.error("this is error message")
await page.locator("//li[text()='Recharge & Bills']").hover();
await newPage.locator("//label[text()='Prepaid']").click();
await page.waitForTimeout(5000);
logger.debug("this is debug message")



});

test("handling iframe",async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");


    logger.info("----- this is before switching to iframe-------")
    const framePage= page.frameLocator("#courses-iframe");

    logger.info("this is after switching to iframe........")
    //await framePage.locator("//a[@href='lifetime-access']']:visible").click(); 
    await framePage.locator("//a[@href='lifetime-access']").nth(0).click();
    //await framePage.locator("li a[href='lifetime-access']:visible").click();
    await page.waitForTimeout(10000);
    await framePage.locator("//button[contains(text(),'Enroll Now')] ").click();
    await page.waitForTimeout(10000);
})

test("Java dailog handling ", async({page})=>{
    await page.goto(process.env.exampleurl);
    // to press sequentially
    
    //await page.locator("//input[@id='autocomplete']").pressSequentially("British Indian Ocean")
    await page.locator("//input[@id='autocomplete']").fill("British Indian Ocean")

    await page.locator("#alertbtn").click();
    
    page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.accept();
  });
    await page.waitForTimeout(5000);
    await page.locator("#confirmbtn").click();
    page.on('dialog',dialog=>dialog.dismiss());

})

