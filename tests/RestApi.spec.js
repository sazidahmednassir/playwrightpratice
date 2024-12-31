import { test, expect } from "@playwright/test";

let userId;

test("Get User", async ({ request }) => {
  const response = await request.get("https://reqres.in/api/users?page=2");
  console.log(await response.json());
  expect(response.status()).toBe(200);
});

test("Create User", async ({ request }) => {
  const response = await request.post("https://reqres.in/api/users?page=2", {
    data: {
      name: "morpheus",
      job: "leader",
    },
    headers: {
      Accept: "application/json",
    },
  });
  console.log(await response.json());
  expect(response.status()).toBe(201);
  var res = await response.json();
  userId = res.id;
  console.log(userId);
});

test("Update User", async ({ request }) => {
  const response = await request.put(`https://reqres.in/api/users/${userId}`, {
    data: {
      name: "morpheus",
      job: "CEO",
    },
    headers: {
      Accept: "application/json",
    },
  });
  expect(response.status()).toBe(200);
  var res = await response.json();
  console.log(res);
});

test("Update User one data", async ({ request }) => {
  const response = await request.patch(
    `https://reqres.in/api/users/${userId}`,
    {
      data: {
        job: "Google CEO",
      },
      headers: {
        Accept: "application/json",
      },
    }
  );
  expect(response.status()).toBe(200);
  var res = await response.json();
  console.log(res);
});

test("Delete User", async ({ request }) => {
  const response = await request.delete(
    `https://reqres.in/api/users/${userId}`
  );
  expect(response.status()).toBe(204);
});
