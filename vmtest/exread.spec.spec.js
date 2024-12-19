import { test } from "@playwright/test";
import fs from "fs";
import path from "path";
import xlsx from "xlsx"; // For Excel handling

// Read paths from Excel (XLSX file)
const filePath = path.join(__dirname, "../tags.xlsx"); // Input Excel file
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const records = xlsx.utils.sheet_to_json(sheet); // Parse the data

// Failed paths collection
const failedPaths = [];

// Iterate over the records
for (const record of records) {
  test(`preview ${record.tags}`, async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Directly navigate to the target page
      await page.goto(
        "https://author-p50407-e476655.adobeaemcloud.com/ui#/aem/libs/cq/workflow/admin/console/content/models.html"
      );
      await page
        .getByLabel("Email address")
        .fill("nassir.sazidahmed@abbvie.com");
      await page.getByRole("button", { name: "Continue" }).click();
      await page.waitForTimeout(4000);
      await page.locator("#username").fill("SAZIDNX");
      await page.locator("#password").fill("One@500#$");
      await page.getByText("Sign On").click();
      await page.waitForTimeout(15000);

      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByRole("button", { name: "Open left rail for additional" })
        .click();
      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByLabel("List")
        .getByText("alt+1Search")
        .click();
      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByLabel("Enter Keyword")
        .fill("OUS Commercial Preview Activate");
      await page.waitForTimeout(3000);
      await page.keyboard.press("Enter");
      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByLabel("Card View")
        .click();

      await page.waitForTimeout(2000);
      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByRole("checkbox", { name: "Select", exact: true })
        .click();
      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByRole("button", { name: "Start Workflow" })
        .click();
      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByLabel("Payload *")
        .fill(record.tags);
      await page
        .locator('iframe[name="Main Content"]')
        .contentFrame()
        .getByRole("button", { name: "Run" })
        .click();

      await page.waitForTimeout(3000);
      console.log(`Success: ${record.tags}`);
    } catch (error) {
      console.error(`Failed: ${record.tags}`);
      failedPaths.push({ tags: record.tags }); // Add failed path to collection
    } finally {
      await context.close();
    }
  });
}

// After all tests, write failed paths to a new Excel file
test.afterAll(() => {
  if (failedPaths.length > 0) {
    const outputWorkbook = xlsx.utils.book_new();
    const outputSheet = xlsx.utils.json_to_sheet(failedPaths);
    xlsx.utils.book_append_sheet(outputWorkbook, outputSheet, "FailedPaths");
    const outputFilePath = path.join(__dirname, "../failed_paths.xlsx");
    xlsx.writeFile(outputWorkbook, outputFilePath);
    console.log(`Failed paths written to: ${outputFilePath}`);
  } else {
    console.log("No failed paths to write.");
  }
});
