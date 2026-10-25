import { expect, test } from "@playwright/test";



test.describe("script tag builds", () => {
  for (const format of ["iife", "umd"]) {
    test(`${format} exposes the Temme global`, async ({ page }) => {
      await page.goto(`/tests/e2e/fixtures/${format}.html`);

      await expect(page.locator("#target")).toHaveClass(format);
      await expect(page.locator("#target > p")).toHaveText("rendered");
      expect(await page.evaluate(() => Object.keys((window as unknown as { Temme: object }).Temme).length)).toBe(19);
    });
  }
});


test.describe("in a real browser", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tests/e2e/fixtures/module.html");
    await page.waitForFunction(() => (window as unknown as { ready?: boolean }).ready === true);
  });

  test("renders into elements of another realm (iframe)", async ({ page }) => {
    const html = await page.evaluate(async () => {
      const { parse } = (window as unknown as { Temme: typeof import("../../src/temme") }).Temme;
      const frame = document.getElementById("frame") as HTMLIFrameElement;

      await new Promise(resolve => (frame.contentDocument?.readyState === "complete" ? resolve(null) : frame.addEventListener("load", resolve)));

      const inside = frame.contentDocument!.getElementById("inside")!;

      parse({ childNodes: [{ name: "span", content: { value: "cross-realm" } }] }, inside);

      return inside.innerHTML;
    });

    expect(html).toBe("<span>cross-realm</span>");
  });

  test("inherits from outer elements", async ({ page }) => {
    const html = await page.evaluate(() => {
      const { parse } = (window as unknown as { Temme: typeof import("../../src/temme") }).Temme;
      const target = document.getElementById("target")!;

      parse({ childNodes: [{ name: "p", from: { ref: "@#outer", exclude: ["id"] } }] }, target);

      return target.innerHTML;
    });

    expect(html).toBe("<p class=\"outer\" title=\"outer title\">outer</p>");
  });

  test("reports errors with Temme error classes", async ({ page }) => {
    const result = await page.evaluate(() => {
      const Temme = (window as unknown as { Temme: typeof import("../../src/temme") }).Temme;

      try {
        Temme.parse({ from: { ref: "@#missing" } }, document.getElementById("target")!);

        return "no error";
      }
      catch (error) {
        return `${error instanceof Temme.InvalidReferenceOptionValueError} ${(error as Error).message}`;
      }
    });

    expect(result).toBe("true [Temme]: No outer element corresponds to the selector \"#missing\".");
  });
});
