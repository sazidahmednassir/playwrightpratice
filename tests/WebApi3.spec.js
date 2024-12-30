import { test, expect, request } from "@playwright/test";

const productName = "IPHONE 13 PRO";
const payload = {
  userEmail: "sazidahmednx23@yopmail.com",
  userPassword: "One@500#$",
};
const orderpayload = {
  orders: [
    { country: "Bangladesh", productOrderedId: "6581ca979fd99c85e8ee7faf" },
  ],
};
let token;
let orderId;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    {
      data: payload,
    }
  );
  // console.log(await loginResponse.json());
  const loginResponseJson = await loginResponse.json();
  token = await loginResponseJson.token;
  console.log(token);
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",

    {
      data: orderpayload,
      headers: {
        authorization: token,
      },
    }
  );
  const orderresjson = await orderResponse.json();
  console.log(orderresjson);
  orderId = await orderresjson.orders[0];
});

test("Place Order", { tag: "@API" }, async ({ page }) => {
  // const context = await browser.newContext({
  //   viewport: {
  //     width: 1920, // Set to your screen's width
  //     height: 1080, // Set to your screen's height
  //   },
  // });
  // const page = await context.newPage();
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
  await page.goto("https://rahulshettyacademy.com/client");
  // await page.pause();
  // await page
  //   .getByPlaceholder("email@example.com")
  //   .fill("sazidahmednx23@yopmail.com");
  // await page.getByPlaceholder("enter your passsword").fill("One@500#$");
  // await page.locator("#login").click();

  await page.locator("[routerlink='/dashboard/myorders']").nth(0).click();
  await page.waitForTimeout(3000);
  await page.locator("tbody").waitFor();
  const rows = page.locator("tbody tr");
  const rowscount = await rows.count();

  for (let k = 0; k < rowscount; k++) {
    const orderIdText = await rows.nth(k).locator("th").textContent();
    if (orderId.includes(orderIdText)) {
      await rows.nth(k).locator("button").first().click();
      break;
    }
  }
  await page.waitForTimeout(3000);
  const orderSummaryID = await page.locator("div.col-text").textContent();
  console.log(orderSummaryID);
  expect(orderId.includes(orderSummaryID)).toBeTruthy();
});
