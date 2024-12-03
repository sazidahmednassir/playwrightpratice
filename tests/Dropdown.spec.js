import { test, expect } from '@playwright/test';

test("Another Login test", async({page})=>{

    

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.fill(".form-group>>[name='name']", "salekin")
    await page.fill(".form-group>>[name='email']", "salekin23@yopmail.com")
    await page.fill("#exampleInputPassword1", "test")
    await page.check("#exampleCheck1")
    await page.check("//label[@for='inlineRadio1']")
    await page.selectOption("#exampleFormControlSelect1", "Male")
    await page.fill("//input[@name='bday']", '2024-11-24');
    await page.click("[type='submit']")
    // await page.waitForTimeout(5000)
    await expect(page.locator('text=Success! The Form has been submitted successfully!.')).toBeVisible();
})