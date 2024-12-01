import { test, expect } from '@playwright/test';

test("test", async function({browser}){

    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await page.locator("input[name='username']").fill("rahulshettyacademy")
    await page.locator("input[name='password']").fill("learning")
    await page.locator("input[type='submit']").click()
    await console.log(page.title());
    // const title = await page.title();
    // await expect(title).toContain("ProtoCommerce")
    await expect(page).toHaveTitle("ProtoCommerce")
})

test("first test with page fixture", async ({page})=>{

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("div.form-group  input#username").fill("rahulshettyacademy")
    await page.locator("input[name='password']").fill("learning")
    await page.locator("input[type='submit']").click()
    await console.log(page.title());
    // const title = await page.title();
    // await expect(title).toContain("ProtoCommerce")
    await expect(page).toHaveTitle("ProtoCommerce")

})

//div.form-group  input#username
//['text=Username']