import { test, expect } from '@playwright/test';

test("Special Locator Pratcice", async({page})=>{


    const CheckBox= page.getByLabel("Check me out if you Love IceCreams!")
    const student= page.getByLabel("Student")
    // const sucessmsg= page.getByRole('alert', { class: 'alert alert-success' })
    const sucessmsg=page.locator(".alert.alert-success")
    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByPlaceholder("Password").fill("Cse1234@")
    await CheckBox.check()
    await expect(CheckBox).toBeChecked()
    await page.getByLabel("Gender").selectOption("Male")
    await student.check()
    const btn= page.getByRole("button", {name:'submit'}).nth(0)
    await btn.click()
    const sucess= await sucessmsg.textContent()
    // expect(sucess).toBe("Success! The Form has been submitted successfully!.")
    expect(sucess).toContain("Success! The Form has been submitted successfully!.");
    // expect(sucess).toHaveText("Success! The Form has been submitted successfully!.")
    await page.waitForTimeout(3000)

})