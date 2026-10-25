/**
 * Checks what `pnpm pack` would publish.
 */

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";



const root = fileURLToPath(new URL("../..", import.meta.url));


describe("published package.", () => {
  it("contains the built files and package metadata only.", () => {
    const output = execFileSync("pnpm", ["pack", "--dry-run", "--json", "--ignore-scripts"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
    const { files } = JSON.parse(output.slice(output.indexOf("{"))) as { files: Array<{ path: string }> };

    expect(files.map(file => file.path).sort()).toEqual([
      "LICENSE",
      "README.md",
      "dist/temme.browser.mjs",
      "dist/temme.browser.mjs.map",
      "dist/temme.cjs",
      "dist/temme.cjs.map",
      "dist/temme.d.cts",
      "dist/temme.d.mts",
      "dist/temme.iife.js",
      "dist/temme.iife.js.map",
      "dist/temme.mjs",
      "dist/temme.mjs.map",
      "dist/temme.umd.js",
      "dist/temme.umd.js.map",
      "package.json",
    ]);
  });
});
