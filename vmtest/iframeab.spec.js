const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {

  // const context= await browser.newContext();
  // const page= await context.newPage();
  // await page.setViewportSize({ width: 1920, height: 1080 });
  await page.goto("https://author-p50407-e476655.adobeaemcloud.com/ui#/aem/libs/cq/workflow/admin/console/content/models.html");
  await page.getByLabel('Email address').fill('nassir.sazidahmed@abbvie.com')
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.locator('#username').fill('SAZIDNX')
  await page.locator('#password').fill('One@500#$')
  await page.getByText('Sign On').click()
  
  await page.waitForTimeout(5000)
  // await page.evaluate(() => {   window.scrollBy(0, 300);  });
  // await page.waitForTimeout(2000);
  // await page.pause();
  
  await page.mouse.wheel(0, 1000);
  await page.pause();

  const framepage=page.frameLocator("//iframe[@name='Main Content']")

  // await page.evaluate(() => {
  //   window.scrollTo(0, document.body.scrollHeight);
  // });
  framepage.locator('(//coral-card-info)[61]').hover()
  // framepage.locator("/coral-icon[@icon='check' and @size='S']").waitFor()
  await framepage.locator("//coral-quickactions[@id='coral-id-409']//button[@title='Select']").click();




// Now perform the click action  
// await element.click();
  // await page.locator("//coral-card-title[text()='OUS Commercial Preview Activate']").hover()
  // await page.locator("._coral-Icon--sizeS _coral-Icon").click()
 await page.waitForTimeout(5000)

})