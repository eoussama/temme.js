import { expect, test } from "@playwright/test";



test("the example page renders five cards", async ({ page }) => {
  const errors: Array<string> = [];

  page.on("pageerror", error => errors.push(error.message));

  await page.goto("/examples/index.html");

  const cards = page.locator("#target.container > .card");

  await expect(cards).toHaveCount(5);
  await expect(cards.locator(".card-header h3")).toHaveText(Array.from<string>({ length: 5 }).fill("Card header"));
  await expect(cards.nth(4).locator(".card-body p b")).toHaveText("Temme JS");

  expect(errors).toEqual([]);
});
