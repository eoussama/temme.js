import { expect, test } from "@playwright/test";



test.describe("documentation site", () => {
  test.beforeEach(async ({ page }) => {
    // Keep the run hermetic: the GitHub star/fork buttons are third-party iframes.
    await page.route("https://ghbtns.com/**", route => route.abort());
  });

  test("is fully rendered by Temme, with highlighted snippets and no errors", async ({ page }) => {
    const errors: Array<string> = [];

    page.on("pageerror", error => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error" && !message.text().includes("ghbtns.com") && !message.text().includes("ERR_FAILED")) {
        errors.push(message.text());
      }
    });

    await page.goto("/_site/index.html");

    await expect(page.locator("body")).not.toHaveClass(/loader/);
    await expect(page.locator("header h1.title")).toHaveText("Temme JS");
    await expect(page.locator("header img.logo")).toHaveAttribute("src", "assets/img/logo.svg");
    await expect(page.locator("header iframe")).toHaveCount(2);
    await expect(page.locator("main > section")).toHaveCount(5);
    await expect(page.locator("main h3")).toHaveText(["Description", "How does it work?", "Syntax", "Usage", "Advantages"]);
    await expect(page.locator("pre > code")).toHaveCount(6);
    await expect(page.locator("pre > code.hljs")).toHaveCount(6);
    await expect(page.locator("a[href='https://github.com/eoussama/temmejs/wiki']")).toBeVisible();

    expect(errors).toEqual([]);
  });

  test("inherits the fork button from the star button", async ({ page }) => {
    await page.goto("/_site/index.html");

    const buttons = page.locator("header iframe");

    await expect(buttons).toHaveCount(2);
    await expect(buttons.nth(0)).toHaveAttribute("src", /type=star/);
    await expect(buttons.nth(1)).toHaveAttribute("src", /type=fork/);

    for (const button of await buttons.all()) {
      await expect(button).toHaveAttribute("width", "80px");
      await expect(button).toHaveAttribute("height", "30px");
    }
  });
});
