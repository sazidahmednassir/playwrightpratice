import { test, expect } from '@playwright/test';

test("Another Login test", async({page})=>{

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.fill(".form-group>>[name='name']", "salek")
    await page.fill(".form-group>>[name='email']", "salek23@yopmail.com")
    await page.fill("#exampleInputPassword1", "test")
    await page.check("#exampleCheck1")
    await page.check("//label[@for='inlineRadio1']")
    await page.selectOption("#exampleFormControlSelect1", "Male")
    await page.waitForTimeout(5000)
})