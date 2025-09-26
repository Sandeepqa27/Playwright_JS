class CheckoutPage {

    constructor(page) {
        this.page=page;
        this.firstname = page.locator("//input[@id='first-name']");
        this.lastname = page.locator("//input[@id='last-name']");
        this.postalcode = page.locator("//input[@id='postal-code']");
        this.continue = page.locator("//input[@id='continue']");
    }

    async enterCheckoutDetails(firstname, lastname, postalcode) {
        await this.firstname.fill(firstname);
        await this.lastname.fill(lastname);
        await this.postalcode.fill(postalcode);
    }

    async continueButton() {
        await this.continue.click();        
    }
}

module.exports = { CheckoutPage };