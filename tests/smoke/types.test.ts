/**
 * Type-checks consumer code (ESM and CommonJS) against the published declarations.
 */

import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";



const tsc = fileURLToPath(new URL("../../node_modules/@typescript/native/bin/tsc", import.meta.url));
const project = fileURLToPath(new URL("fixtures/tsconfig.json", import.meta.url));


describe("published types.", () => {
  it("type-check ESM and CommonJS consumers.", () => {
    expect(() => execFileSync(process.execPath, [tsc, "-p", project], { encoding: "utf8", stdio: "pipe" })).not.toThrow();
  });
});
