import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";

const datas = JSON.parse(JSON.stringify(require("../utils/dataDriven.json")));

let mylgpage;

for (const data of datas) {
  test.beforeEach(async ({ page }) => {
    mylgpage = new LoginPage(page);
    await mylgpage.launchUrl(data.url);
  });

  test.skip(`Check the login valid credentials ${data.userEmail}`, async () => {
    await mylgpage.validLogin(data.userEmail, data.pass);
    await expect(mylgpage.homePageIdetifier).toBeVisible();
  });

  test(`Check the login invalid credentials ${data.userEmail}`, async () => {
    await mylgpage.invalidLogin(data.userEmail, data.invalidpass);
    await expect(mylgpage.errorMessage).toHaveText(
      "Incorrect email or password."
    );
  });
}
