const { InventoryPage } = require('../pageobjects/InventoryPage');
const {LoginPage}=require('../pageobjects/LoginPage')
const {CartPage}=require('../pageobjects/CartPage')
const { CheckoutPage } = require('../pageobjects/CheckoutPage');
const {test}=require('@playwright/test');

test("regresson test testcase 1",async({page})=>{
 
const loginPage=new LoginPage(page);
const inventoryPage=new InventoryPage(page);
const cartPage=new CartPage(page);
const checkoutPage = new CheckoutPage(page);

await loginPage.goTo();
await loginPage.validLogin("standard_user","secret_sauce");
await inventoryPage.addToCart();
await inventoryPage.clickHamburgerMenu();
await inventoryPage.goToCart();
await cartPage.goToCart();
await cartPage.checkout();
await checkoutPage.enterCheckoutDetails("sandeep","kumar","560037");
await checkoutPage.continueButton();


});