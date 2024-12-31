import { test, expect } from '@playwright/test';

test("Assetions Pratice", async({page})=>{

    await page.goto('https://demo.nopcommerce.com/register')

    await expect(page).toHaveURL('https://demo.nopcommerce.com/register')
    await expect(page).toHaveTitle('nopCommerce demo store. Register')

    const logo=await page.locator('.header-logo')
    await expect(logo).toBeVisible()

    const searchbox=await page.locator("//input[@id='small-searchterms']")
    await expect(searchbox).toBeEnabled()

    await page.click('#gender-male')

    const radioval= await page.locator('#gender-male')
    await expect(radioval).toBeChecked()

    const checkbox= await page.locator("//input[@id='Newsletter']")
    await expect(checkbox).toBeChecked()

    const registerbtn= await page.locator('#register-button')
    await expect(registerbtn).toHaveAttribute('type', 'submit')
    console.log('✔ Custom Pass: Register button type attribute is correctly set to "submit".');

    const registerText= await page.locator('.page-title >> h1')
    await expect(registerText).toHaveText('Register')

    await expect(page.locator("//strong[normalize-space()='Your Personal Details']")).toContainText('Persona')

    const emailwithval= await page.locator('#Email')
    await page.fill('#Email', 'sazid23@yopmail.com')
    await expect(emailwithval).toHaveValue('sazid23@yopmail.com')
    
    const options= await page.locator("select[name='DateOfBirthMonth'] option")
    await expect(options).toHaveCount(13)
    
    

})