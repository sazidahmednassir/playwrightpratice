import { test, expect } from "@playwright/test";
import { LoginPage } from "../pageObjects/LoginPage";

const url = "https://rahulshettyacademy.com/client";

const userEmail = "sazidahmednx23@yopmail.com";
const pass = "One@500#$";

const invmail = "tesnx23@yopmail.com";
const invpass = "1234";

let mylgpage;

test.beforeEach(async ({ page }) => {
  mylgpage = new LoginPage(page);
  await mylgpage.launchUrl(url);
});

test("Check the login valid credentials", async () => {
  await mylgpage.validLogin(userEmail, pass);
  await expect(mylgpage.homePageIdetifier).toBeVisible();
});

test("Check the login invalid credentials", async () => {
  await mylgpage.invalidLogin(invmail, invpass);
  await expect(mylgpage.errorMessage).toHaveText(
    "Incorrect email or password."
  );
});
