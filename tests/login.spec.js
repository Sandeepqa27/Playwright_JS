const {test,expect,request}=require('@playwright/test');
import {logger} from "../logger"
;
// Page fixture , browser fixture 
// Test case 1 - Login Functionality

function getRandomInt(min, max) {
  min = Math.ceil(min); // Ensure min is an integer
  max = Math.floor(max); // Ensure max is an integer
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function login(page){
    await page.goto('https://www.saucedemo.com/');
    logger.info("Starting the test case for login");
    await page.locator("//input[@name='user-name']").fill("standard_user");
    await page.locator("//input[@data-test='password']").fill("secret_sauce");
    await page.locator("//input[@id='login-button']").click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

}


test.only('tc01-login functionality with valid un and ps',async({page})=>{

    await login(page);
    
})


test('tc02 - invalid functionality using blank un and ps',async({page})=>{

    await page.goto("https://www.saucedemo.com/");
    await page.locator("//input[@name='user-name']").fill("standard_user");
    await page.locator("//input[@data-test='password']").fill("sandeep");
    await page.locator("//input[@id='login-button']").click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout.html');


})

//add item to cart ....
test.only("tc03 -add item to the cart",async({page})=>{
test.setTimeout(60_000);
    const product1=await  page.locator("//button[@data-test='add-to-cart-sauce-labs-backpack']");
    const product2=await page.locator("//button[@data-test='add-to-cart-sauce-labs-bike-light']");
    await login(page);
    await product1.click();
    expect(page.locator("//span[@class='shopping_cart_badge']")).toHaveText('1');
    await product2.click();
    await  expect(page.locator("//span[@class='shopping_cart_badge']")).toHaveText('2');

    //expect(page.locator("//span[@class='shopping_cart_badge']")).toHaveText('3');

})

test.only('tc04 - verify viewing the cart', async({page})=>{

    await login(page);
    //await page.locator("//button[@id='add-to-cart-sauce-labs-backpack']").click()
    await page.click("//button[@id='add-to-cart-sauce-labs-backpack']");
    await  expect(page.locator("//span[@class='shopping_cart_badge']")).toHaveText('1');
    await page.click("//a[@class='shopping_cart_link']");
   
    const cartTitle=await page.locator(".inventory_item_name").textContent();
    console.log(cartTitle);
    expect(page.locator(".inventory_item_name")).toHaveText("Sauce Labs Backpack");
    await page.click("#checkout");
    const dyna="sandeep"+getRandomInt(1,10000)+"@gmail.com";
    await page.locator("#first-name").fill(dyna);   
    const username="prabhu"+getRandomInt(1,10000);
    console.log(username);


})

test.only('TC 05- verify sorting of items from low to high',async({page})=>{

    await login(page);
    const dropDown=await page.locator(".product_sort_container");
    await dropDown.selectOption('lohi');
    
    
    const z="$12.999";
    console.log(z.slice(1));
    const itemPrices=await page.locator(".inventory_item_price");
    const prices=await itemPrices.allTextContents();
    console.log(prices);
    //const sortedprices=await prices.sort();
    const sortedPrices= [...prices].sort((a,b)=>parseFloat(a.slice(1))-parseFloat(b.slice(1)));
    console.log(sortedPrices);

    for(let i=0;i<sortedPrices.length;i++){
      await  expect( itemPrices.nth(i)).toHaveText(sortedPrices[i]);
    }

   

})

test.only('TC 06- verify sorting of items from high to low',async({page})=>{

    await login(page);
    const dropDown=await page.locator(".product_sort_container");
    await dropDown.selectOption('hilo');
    await page.waitForTimeout(5000);
    let texts = await page.locator('//select//option').allTextContents();
    await console.log(texts);
    let price=await page.locator("//div[@data-test='inventory-item-price']").allTextContents();
    await console.log(price);
    // validation pending .. will resume after understanding array concepts.
    //Assignment
   
    

})

test.only('tc 07 - navigation methods and radio button ',async({page})=>{
    await page.goto("https://paytm.com/recharge");
    await page.goto("https://paytm.com/")
    //await page.pause();
    await page.goBack();
    await page.goForward();
    await page.goBack();
    await page.locator("//label[text()='Postpaid']").click();

})



test.only('tc 08 upload files ',async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/upload");
    await page.locator("#file-upload").setInputFiles("C:\\Users\\LENOVO\\Desktop\\Syllabus.docx");
    await page.locator("#file-submit").click();
    await page.waitForTimeout(5000);
    await page.locator("//h3").waitFor();
    console.log(await page.locator("//h3").textContent());
    expect(await page.locator("//h3")).toHaveText("File Uploaded!")

})

test.only('tc 09visual testing',async({page})=>{
    await page.goto("https://www.instagram.com");
    await page.waitForTimeout(5000);
    expect( await page.screenshot()).toMatchSnapshot("afreen.png");
    
})

test.only('tc 10 Inbuilt playwright locators',async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.getByPlaceholder('Username').fill('sandeep');
    await page.getByPlaceholder('Password').fill('sandeep123');
    await page.getByRole('button',{name:'Login'}).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Yet to go through few more inbuilt locators ...
})

test('@Smoketest tc 10-2 Inbuilt playwright locators',async({page})=>{
    await page.goto("https://login.talview.com/login?redirect_url=https%253A%252F%252Fwt.talview.com%252Flogin");
    await page.getByPlaceholder('you@example.com').fill('sandeep');
    //await page.locator("//button[text()='Next']").click();
    await page.getByRole('button',{name:'Next'}).click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    //Yet to go through few more inbuilt locators ...
})

test("@Smoketest Api testing using playwright ",async({page})=>{
    logger.info("This is api test case and we are learning loggers")
    const apicontext=request.newContext();
   
    const response=(await apicontext).get("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41");
    console.log((await response).status());
    await page.waitForTimeout(5000);
    console.log((await response).statusText());
    logger.info("------- Api Test case is executed successfully")

})


