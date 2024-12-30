import { test, expect } from "@playwright/test";

test("Another Login test", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.fill(".form-group>>[name='name']", "salekin");
  await page.fill(".form-group>>[name='email']", "salekin23@yopmail.com");
  await page.fill("#exampleInputPassword1", "test");
  await page.check("#exampleCheck1");
  await page.check("//label[@for='inlineRadio1']");
  await page.selectOption("#exampleFormControlSelect1", "Male");
  await page.fill("//input[@name='bday']", "2024-11-24");
  await page.click("[type='submit']");
  // await page.waitForTimeout(5000)
  await expect(
    page.locator("text=Success! The Form has been submitted successfully!.")
  ).toBeVisible();
});

test("Upload File", async ({ page }) => {
  //https://the-internet.herokuapp.com/upload

  await page.goto("https://the-internet.herokuapp.com/upload");
  await page.setInputFiles("[name='file']", "Tepkinly Widget - ERES.docx");
  await page.click("[value='Upload']");
  // await page.locator("[name='file']").setInputFiles("C:/Tepkinly Widgets Slc/Tepkinly Widget - ERES.docx")

  const filetext = await page.locator(".example >> h3");
  await expect.soft(filetext).toHaveText("File Uploaded!");
  await page.waitForTimeout(3000);
});

// test("Mouse Hover", async ({ page }) => {
//   await page.goto("https://www.spicejet.com/");
//   const addOns = page.locator("text=Add-ons").nth(0);
//   await page.waitForTimeout(3000);
//   await addOns.hover();
//   await expect
//     .soft(
//       page.locator('[data-testid="test-id-International Connection Baggage"]')
//     )
//     .toBeVisible();
// });
