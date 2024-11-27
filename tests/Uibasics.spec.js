import { test } from '@playwright/test';

test.only("Second test", async function({page}){

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator('id=username').fill("rahulshettyacademy")
    await page.locator('//*[@name="password"]').fill("learning")
    await page.locator('#signInBtn').click()
    // await page.pause()
})