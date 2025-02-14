import { test, expect } from "@playwright/test";

test("Child window", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("[href*='documents-request']").click();
  const page1 = await context.waitForEvent("page");

  const newpage = page1;
  await newpage.getByRole("heading", { name: "Documents request" }).waitFor();
  const result = await newpage
    .getByRole("heading", { name: "Documents request" })
    .isVisible();
  expect(result).toBeTruthy();

  await page.locator("[name='username']").fill("rahulshettyacademy");
  await page.locator("[name='password']").fill("learning");
  await page.locator("[type='submit']").click();

  await newpage.waitForTimeout(2000);
});

test("Child window handling another way", async ({ browser }) => {
  const context = await browser.newContext();
  const page2 = await context.newPage();

  await page2.goto("https://rahulshettyacademy.com/loginpagePractise/");

  const [newpage2] = await Promise.all([
    context.waitForEvent("page"),
    page2.locator("[href*='documents-request']").click(),
  ]);

  await newpage2.getByRole("heading", { name: "Documents request" }).waitFor();
  const result = await newpage2
    .getByRole("heading", { name: "Documents request" })
    .isVisible();
  expect(result).toBeTruthy();

  await page2.locator("[name='username']").fill("rahulshettyacademy");
  await page2.locator("[name='password']").fill("learning");
  await page2.locator("[type='submit']").click();

  await newpage2.waitForTimeout(3000);
});
//testS2
