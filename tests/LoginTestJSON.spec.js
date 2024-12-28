import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";

const data = JSON.parse(JSON.stringify(require("../utils/logindata.json")));

let mylgpage;

test.beforeEach(async ({ page }) => {
  mylgpage = new LoginPage(page);
  await mylgpage.launchUrl(data.url);
});

test("Check the login valid credentials", async () => {
  await mylgpage.validLogin(data.userEmail, data.pass);
  await expect(mylgpage.homePageIdetifier).toBeVisible();
});

test("Check the login invalid credentials", async () => {
  await mylgpage.invalidLogin(data.userEmail, data.invalidpass);
  await expect(mylgpage.errorMessage).toHaveText(
    "Incorrect email or password."
  );
});
