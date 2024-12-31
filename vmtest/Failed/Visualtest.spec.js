import { test, expect } from "@playwright/test";

test("full page screenshot", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");

  await page.screenshot({
    path: "../playwrightpratice/Screenshots/Fullpage3.png",
  });
});

test("specific element  screenshot", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#login").screenshot({
    path: "../playwrightpratice/Screenshots/Loginbtn1.png",
  });
});

test("visual testing", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/client");
  expect(await page.screenshot()).toMatchSnapshot("visual.png");
});
