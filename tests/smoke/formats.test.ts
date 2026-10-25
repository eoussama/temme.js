/**
 * Loads every published format from `dist/` in plain Node.js (no DOM globals)
 * and checks that each one exposes the same, working API.
 */

import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { runInNewContext } from "node:vm";
import { Window } from "happy-dom";
import { describe, expect, it } from "vitest";



type TemmeModule = typeof import("../../src/temme");

const dist = new URL("../../dist/", import.meta.url);
const require = createRequire(import.meta.url);

const expectedExports = [
  "CircularReferenceError",
  "InvalidHierarchyError",
  "InvalidOptionNameError",
  "InvalidOptionTypeError",
  "InvalidOptionValueError",
  "InvalidReferenceError",
  "InvalidReferenceOptionValueError",
  "InvalidReferencingOptionError",
  "InvalidSubOptionNameError",
  "InvalidSubOptionTypeError",
  "InvalidSubOptionValueError",
  "InvalidTargetError",
  "InvalidTemplateError",
  "InvalidTemplateOptionError",
  "InvalidTemplateReferencingError",
  "ReferenceOutOfScopeError",
  "TemmyError",
  "parse",
  "validate",
];

const source = async (file: string): Promise<string> => readFile(new URL(file, dist), "utf8");

/**
 * Runs a script bundle in a fresh context and returns that context.
 *
 * @param file The bundle's file name in `dist/`.
 * @param context The globals of the context.
 * @returns {Promise<Record<string, unknown>>} The context, after the script ran.
 */
async function runScript(file: string, context: Record<string, unknown> = {}): Promise<Record<string, unknown>> {
  runInNewContext(await source(file), context);

  return context;
}

/**
 * Checks the export surface and renders a small tree with a happy-dom element.
 *
 * @param temme The loaded module.
 */
function exercise(temme: TemmeModule): void {
  expect(Object.keys(temme).filter(key => key !== "default").sort()).toEqual(expectedExports);

  const window = new Window();
  const target = window.document.createElement("div");

  temme.parse({ classes: ["root"], childNodes: [{ name: "p", content: { value: "hi" } }] }, target as unknown as HTMLElement);

  expect(target.outerHTML).toBe("<div class=\"root\"><p>hi</p></div>");
  expect(temme.validate({ bogus: 1 }).error).toBeInstanceOf(temme.InvalidOptionNameError);
  expect(() => temme.parse({}, {} as HTMLElement)).toThrow(temme.InvalidTargetError);

  window.close();
}


describe("published formats.", () => {
  it("eSM (dist/temme.mjs).", async () => {
    exercise(await import(new URL("temme.mjs", dist).href) as TemmeModule);
  });

  it("commonJS (dist/temme.cjs).", () => {
    exercise(require(new URL("temme.cjs", dist).pathname) as TemmeModule);
  });

  it("package exports resolve to the ESM and CommonJS builds.", async () => {
    expect(require.resolve("temmejs")).toMatch(/dist[/\\]temme\.cjs$/);
    // A variable specifier: the package's own types only exist once it's built.
    const self = "temmejs";

    expect(await import(self)).toBe(await import(new URL("temme.mjs", dist).href));
  });

  it("browser ESM (dist/temme.browser.mjs) is self-contained.", async () => {
    expect(await source("temme.browser.mjs")).not.toMatch(/\bfrom\s*["']|\bimport\s*\(/);
    exercise(await import(new URL("temme.browser.mjs", dist).href) as TemmeModule);
  });

  it("uMD (dist/temme.umd.js) as a browser global.", async () => {
    const context = await runScript("temme.umd.js");

    exercise(context.Temme as TemmeModule);
  });

  it("uMD (dist/temme.umd.js) as CommonJS.", async () => {
    const module = { exports: {} };

    await runScript("temme.umd.js", { module, exports: module.exports });
    exercise(module.exports as TemmeModule);
  });

  it("uMD (dist/temme.umd.js) as AMD.", async () => {
    let factory: ((exports: object) => void) | undefined;
    const define = Object.assign((deps: Array<string>, fn: (exports: object) => void) => {
      expect(deps).toEqual(["exports"]);
      factory = fn;
    }, { amd: true });

    await runScript("temme.umd.js", { define });

    const exports = {};

    factory?.(exports);
    exercise(exports as TemmeModule);
  });

  it("iIFE (dist/temme.iife.js) as a browser global.", async () => {
    const context = await runScript("temme.iife.js");

    exercise(context.Temme as TemmeModule);
  });

  it("every bundle carries the license banner.", async () => {
    const { version } = require("../../package.json") as { version: string };

    for (const file of ["temme.mjs", "temme.cjs", "temme.browser.mjs", "temme.umd.js", "temme.iife.js"]) {
      expect((await source(file)).startsWith(`/*! temmejs v${version} | MIT |`)).toBe(true);
    }
  });
});
