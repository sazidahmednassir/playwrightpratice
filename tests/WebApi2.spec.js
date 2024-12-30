import { test, expect } from "@playwright/test";

const productName = "IPHONE 13 PRO";

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page
    .getByPlaceholder("email@example.com")
    .fill("sazidahmednx23@yopmail.com");
  await page.getByPlaceholder("enter your passsword").fill("One@500#$");
  await page.locator("#login").click();
  await page.waitForTimeout(2000);
  await expect(page.getByRole("button", { name: "Home" })).toBeVisible();
  await context.storageState({ path: "state.json" });
});

test("Place Order", { tag: "@API" }, async ({ browser }) => {
  // await page.pause()
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator("div.card-body");
  const productTexts = await products.locator("b").allTextContents();
  await products.count();
  console.log(productTexts);

  // for(let product of products){

  //     const productText= await product.locator('b').textContent()

  //     if(productText==productName){
  //        await product.getByRole('button', {name:"Add to Cart"}).click()
  //     }

  // }
  const count = await products.count();
  for (let i = 0; i < count; i++) {
    const productText = await products.nth(i).locator("b").textContent();
    if (productText == productName) {
      await products
        .nth(i)
        .getByRole("button", { name: "Add to Cart" })
        .click();
      break;
    }
  }
  await page.waitForTimeout(2000);
  await expect(page.locator("#toast-container")).toBeVisible();
  await page.locator("[routerlink='/dashboard/cart']").click();
  await page.waitForTimeout(4000);
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  const dropdownsvalues = page.locator(".ta-results button");
  await dropdownsvalues.first().waitFor();
  const countdrop = await dropdownsvalues.count();
  await page.waitForTimeout(3000);

  const countyval = " India";
  for (let j = 0; j < countdrop; j++) {
    const dropdownText = await dropdownsvalues.nth(j).textContent();
    if (dropdownText == countyval) {
      await dropdownsvalues.nth(j).click();
      break;
    }
  }
  await page.getByText("Place Order ").click();
  await page.waitForTimeout(3000);
  await expect(page.locator(".hero-primary")).toHaveAttribute(
    "class",
    "hero-primary"
  );
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  await page.waitForTimeout(3000);
  await page.locator("[routerlink='/dashboard/myorders']").nth(0).click();
  await page.waitForTimeout(3000);
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  const rowscount = await rows.count();

  for (let k = 0; k < rowscount; k++) {
    const orderIdText = await rows.nth(k).locator("th").textContent();
    if (orderId.includes(orderIdText)) {
      await rows.nth(k).locator("button").first().click();
      break;
    }
  }
  await page.waitForTimeout(3000);
  const orderSummaryID = await page.locator("div.col-text").textContent();
  console.log(orderSummaryID);
  expect(orderId.includes(orderSummaryID)).toBeTruthy();
});
