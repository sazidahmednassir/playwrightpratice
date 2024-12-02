import { test, expect } from '@playwright/test';

test("Login with valid credentials", async function({page}){

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    // await page.locator('id=username').fill("rahulshettyacademy")
    await page.fill('id=username', "rahulshettyacademy")
    await page.locator('//*[@name="password"]').fill("learning")
    // await page.locator('#signInBtn').click()
    await page.click('#signInBtn')
    // await page.locator('.navbar-brand').nth(1).waitFor();
    
    /* more wait
    await page.locator('.navbar-brand').nth(1).waitFor({ timeout: 60000 });
    const homepage=await page.locator('.navbar-brand').nth(1).isVisible()
    expect(homepage).toBeTruthy();
    Better way */

    await expect(page.locator('.navbar-brand').nth(1)).toBeVisible();
})