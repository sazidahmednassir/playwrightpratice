import { test, expect } from '@playwright/test';





test("Child window", async({browser})=>{

    const context= await browser.newContext();
    const page= await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("[href*='documents-request']").click()
    const page1= await context.waitForEvent('page')

    const newpage= page1
    await newpage.getByRole('heading', {name:'Documents request'}).waitFor()
    const result=await newpage.getByRole('heading', {name:'Documents request'}).isVisible()
    expect(result).toBeTruthy()

    await newpage.waitForTimeout(3000)

})   