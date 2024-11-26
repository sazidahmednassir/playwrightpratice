const {test}=require('@playwright/test');

test("first test", async function({browser}){

    const context= await browser.newContext();
    const page= await context.newPage();
    await page.goto("https://parabank.parasoft.com/parabank/index.htm");

    await page.locator("input[name='username']").fill("sazid")
    await page.locator("input[name='password']").fill("sazid")
    await page.locator("input[type='submit']").click()
    // await page.pause()
})