import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";
import { Dashboard } from "../pageObjects/Dashboard";

const data = JSON.parse(JSON.stringify(require("../utils/logindata.json")));

let mylgpage;
let dashboard;

test.beforeEach(async ({ page }) => {
  mylgpage = new LoginPage(page);
  dashboard = new Dashboard(page);
  await mylgpage.launchUrl(data.url);
  await mylgpage.validLogin(data.userEmail, data.pass);
});

test("Add to Cart", async () => {
  await dashboard.searchAddtoCart(data.productName);
  await expect(dashboard.addToCartToast).toHaveText("Product Added To Cart");
});

test("View Product Details", { tag: ["@smoke", "@regression"] }, async () => {
  await dashboard.searchProductAndViewDetails(data.productName);
  await expect(dashboard.viewPageProductName).toHaveText(data.productName);
});
