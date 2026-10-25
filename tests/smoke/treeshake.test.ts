/**
 * Bundles small consumer entries with Rolldown to check that unused parts of the
 * library are dropped.
 */

import { rolldown } from "rolldown";
import { describe, expect, it } from "vitest";



/**
 * Bundles an entry module (given as source) and returns the minified output.
 *
 * @param code The entry module's source.
 * @returns {Promise<string>} The minified bundle.
 */
async function bundle(code: string): Promise<string> {
  const build = await rolldown({
    input: "entry.js",
    platform: "browser",
    plugins: [{
      name: "virtual-entry",
      resolveId: (id: string) => (id === "entry.js" ? id : null),
      load: (id: string) => (id === "entry.js" ? code : null),
    }],
  });
  const { output } = await build.generate({ format: "esm", minify: true });

  await build.close();

  return output[0].code;
}


describe("tree-shaking.", () => {
  it("drops everything when nothing is used.", async () => {
    expect((await bundle("import \"temmejs\";")).trim()).toBe("");
  });

  it("drops everything when only types or unused bindings are imported.", async () => {
    expect((await bundle("import { parse, validate, TemmyError } from \"temmejs\";")).trim()).toBe("");
  });

  it("keeps the DOM rendering code out of validate-only bundles.", async () => {
    const code = await bundle("import { validate } from \"temmejs\"; console.log(validate({}));");

    expect(code).toContain("console.log");
    expect(code).not.toContain("createElement");
    expect(code).not.toContain("appendChild");
  });

  it("keeps a lone error class small.", async () => {
    const code = await bundle("import { InvalidTargetError } from \"temmejs\"; console.log(new InvalidTargetError(\"\"));");

    expect(code).not.toContain("querySelector");
    expect(code).not.toContain("createElement");
    expect(code.length).toBeLessThan(400);
  });

  it("includes the rendering code when parse is used.", async () => {
    const code = await bundle("import { parse } from \"temmejs\"; parse({}, document.body);");

    expect(code).toContain("createElement");
  });
});
