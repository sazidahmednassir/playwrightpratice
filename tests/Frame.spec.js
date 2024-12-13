import { test, expect } from '@playwright/test';


test("frame test", async({page})=>{

await page.goto("https://rahulshettyacademy.com/AutomationPractice/")
const framepage= page.frameLocator("#courses-iframe")
framepage.getByRole("link", {name:"All Access plan"}).first().click()
const textresult=await framepage.locator(".text h2").textContent()
console.log(textresult)
expect(textresult).toContain("Join 13,522 Happy Subscibers!")
await page.getByRole('link', {name:'Home'}).click()
})