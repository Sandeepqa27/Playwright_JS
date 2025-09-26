class DropdownUtil {
    /**
     * @param {import('playwright').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    /**
     * Selects a dropdown option by its value attribute.
     * @param {string} selector - The selector for the dropdown element.
     * @param {string} value - The value to select.
     */
    async selectByValue(selector, value) {
        await this.page.selectOption(selector, { value });
    }

    /**
     * Selects a dropdown option by its visible label/text.
     * @param {string} selector - The selector for the dropdown element.
     * @param {string} label - The label/text to select.
     */
    async selectByLabel(selector, label) {
        await this.page.selectOption(selector, { label });
    }

    /**
     * Selects a dropdown option by its index.
     * @param {string} selector - The selector for the dropdown element.
     * @param {number} index - The index of the option to select.
     */
    async selectByIndex(selector, index) {
        const options = await this.page.$$(selector + ' option');
        if (options[index]) {
            const value = await options[index].getAttribute('value');
            await this.page.selectOption(selector, { value });
        } else {
            throw new Error('Dropdown option index out of range');
        }
    }
}

module.exports = { DropdownUtil };