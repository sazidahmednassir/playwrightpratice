class Dashboard {
  constructor(page) {
    this.page = page;
    this.products = page.locator("div.card-body");
    // this.productTexts = products.locator("b").allTextContents();
    this.addToCardBtn = page.getByRole("button", { name: "Add to Cart" });
    this.addToCartToast = page.locator("#toast-container");
    this.viewPageProductName = page.locator("div h2");
  }

  async searchAddtoCart(productName) {
    // const productTexts = await products.locator("b").allTextContents();
    // await products.count();
    // console.log(productTexts);
    await this.products.first().waitFor();
    const count = await this.products.count();
    for (let i = 0; i < count; i++) {
      const productText = await this.products.nth(i).locator("b").textContent();
      if (productText == productName) {
        await this.products
          .nth(i)
          .getByRole("button", { name: "Add to Cart" })
          .click();
        break;
      }
    }
    /*this is wait FOR ELEMENTS for Pom 
    await this.products.first().waitFor();*/
    // await this.page.waitForTimeout(2000);
    // await expect(page.locator("#toast-container")).toBeVisible();
  }

  async searchProductAndViewDetails(productName) {
    await this.products.first().waitFor();
    const countOfProducts = await this.products.count();
    for (let i = 0; i < countOfProducts; i++) {
      const productText = await this.products.nth(i).locator("b").textContent();
      if (productText === productName) {
        await this.products.nth(i).locator("button .fa-eye").click();
        break;
      }
    }
  }
}

module.exports = { Dashboard };
