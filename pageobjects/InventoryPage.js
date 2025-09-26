class InventoryPage{

    constructor(page){
        this.page=page;
        this.addToCartButton=page.locator("#add-to-cart-sauce-labs-backpack");
        this.cartIcon=page.locator(".shopping_cart_link");
        this.hamburgerIcon=page.locator("#react-burger-menu-btn");
    }   

    async addToCart(){
        await this.addToCartButton.click();
    }
    async goToCart(){
        await this.cartIcon.click();
    }

    async clickHamburgerMenu(){
        await this.hamburgerIcon.click();
    }
}

module.exports={InventoryPage};