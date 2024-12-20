import { test } from "@playwright/test";
import fs from "fs";
import path from "path";
import xlsx from "xlsx"; // For Excel handling

// File paths
const filePath = path.join(__dirname, "../tags.xlsx"); // Input Excel file
const outputFilePath = path.join(__dirname, "../failed_paths.xlsx"); // Output Excel file

// Read paths from Excel
const workbook = xlsx.readFile(filePath);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const records = xlsx.utils.sheet_to_json(sheet); // Parse the data

// Failed paths collection (shared across workers via a temporary file)
const failedPathsTempFile = path.join(__dirname, "failedPaths.json");

test.beforeAll(() => {
  // Clear any previous failed paths
  if (fs.existsSync(failedPathsTempFile)) {
    fs.unlinkSync(failedPathsTempFile);
  }
});

test(`preview tags`, async ({ browser }, testInfo) => {
  // Get the specific task for this test (from the records array)
  const record = records[testInfo.workerIndex % records.length]; // Map worker index to record

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Navigate and perform the task
    await page.goto(
      "https://author-p50407-e476655.adobeaemcloud.com/ui#/aem/libs/cq/workflow/admin/console/content/models.html"
    );
    await page.getByLabel("Email address").fill("nassir.sazidahmed@abbvie.com");
    await page.getByRole("button", { name: "Continue" }).click();
    await page.locator("#username").fill("SAZIDNX");
    await page.locator("#password").fill("One@500#$");
    await page.getByText("Sign On").click();
    await page.waitForTimeout(15000);

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
    // Write failed path to temporary file (thread-safe)
    const failedPath = { tags: record.tags };
    const failedPaths = fs.existsSync(failedPathsTempFile)
      ? JSON.parse(fs.readFileSync(failedPathsTempFile, "utf8"))
      : [];
    failedPaths.push(failedPath);
    fs.writeFileSync(failedPathsTempFile, JSON.stringify(failedPaths, null, 2));
  } finally {
    await context.close();
  }
});

test.afterAll(() => {
  // Combine all failed paths from temporary file and write to Excel
  if (fs.existsSync(failedPathsTempFile)) {
    const failedPaths = JSON.parse(
      fs.readFileSync(failedPathsTempFile, "utf8")
    );
    if (failedPaths.length > 0) {
      const outputWorkbook = xlsx.utils.book_new();
      const outputSheet = xlsx.utils.json_to_sheet(failedPaths);
      xlsx.utils.book_append_sheet(outputWorkbook, outputSheet, "FailedPaths");
      xlsx.writeFile(outputWorkbook, outputFilePath);
      console.log(`Failed paths written to: ${outputFilePath}`);
    } else {
      console.log("No failed paths to write.");
    }
  }
});
