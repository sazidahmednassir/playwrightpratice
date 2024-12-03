import { test, expect } from '@playwright/test';

test("Date Picker", async({page})=>{

    await page.goto('https://testautomationpractice.blogspot.com/')
    // await page.fill('#datepicker', '11/24/2024')
    // await page.waitForTimeout(3000)

    const year="2025"
    const month="July"
    const date="24"

    await page.click('#datepicker')

    while(true){
      
       const currentYear=await page.textContent('.ui-datepicker-year')
       const currentMonth=await page.textContent('.ui-datepicker-month')

       if(currentYear==year&&currentMonth==month){
          break;
       }

       await page.click('[title="Next"]')
    //    await page.click('[title="Prev"]')
    
    }
     
    /*const dates=await page.$$("//a[@class='ui-state-default']")

    for(const dt of dates){

        if(await dt.textContent()==date){

            await dt.click()
            break;
        }
    }
    Another way*/

    await page.click(`//a[@class='ui-state-default'][text()='${date}']`)

    await page.waitForTimeout(3000)


})