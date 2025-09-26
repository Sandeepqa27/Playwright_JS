class CartPage {

    constructor(page) {
        this.page=page;
        this.cartButton = page.locator("//a[@class='shopping_cart_link']");
        this.checkoutButton = page.locator("//button[@id='checkout']");
    }

    async goToCart() {
        await this.cartButton.click();
    }
    async checkout() {
        await this.checkoutButton.click();
    }
}

module.exports = { CartPage };