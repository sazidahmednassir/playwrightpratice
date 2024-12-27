import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";
import { Dashboard } from "../pageObjects/Dashboard";

const userEmail = "sazidahmednx23@yopmail.com";
const pass = "One@500#$";

const url = "https://rahulshettyacademy.com/client";

const productName = "IPHONE 13 PRO";

let mylgpage;
let dashboard;

test.beforeEach(async ({ page }) => {
  mylgpage = new LoginPage(page);
  dashboard = new Dashboard(page);
  await mylgpage.launchUrl(url);
  await mylgpage.validLogin(userEmail, pass);
});

test("Add to Cart", async () => {
  await dashboard.searchAddtoCart(productName);
  await expect(dashboard.addToCartToast).toHaveText("Product Added To Cart");
});

test("View Product Details", { tag: ["@smoke", "@regression"] }, async () => {
  await dashboard.searchProductAndViewDetails(productName);
  await expect(dashboard.viewPageProductName).toHaveText(productName);
});
