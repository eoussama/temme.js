import type { UserConfig, UserConfigExport } from "tsdown";
import { defineConfig } from "tsdown";
import pkg from "./package.json" with { type: "json" };



const banner = `/*! ${pkg.name} v${pkg.version} | ${pkg.license} | ${pkg.homepage} */`;

const shared: UserConfig = {
  entry: { temme: "src/temme.ts" },
  outDir: "dist",
  target: "es2020",
  banner,
};

/**
 * Self-contained browser bundles: every dependency is inlined and the output is minified.
 */
const browser: UserConfig = {
  ...shared,
  platform: "browser",
  minify: true,
  sourcemap: true,
  clean: false,
  dts: false,
  deps: { alwaysBundle: [/.*/] },
};



const config: UserConfigExport = defineConfig([
  // Modern ESM (`.mjs` + `.d.mts`) and CommonJS (`.cjs` + `.d.cts`) for bundlers and Node.js.
  {
    ...shared,
    format: ["esm", "cjs"],
    platform: "neutral",
    fixedExtension: true,
    sourcemap: true,
    dts: true,
    clean: true,
    publint: true,
    attw: { profile: "node16", level: "error" },
  },

  // Minified ESM for `<script type="module">` and CDNs.
  {
    ...browser,
    format: "esm",
    outExtensions: () => ({ js: ".browser.mjs" }),
  },

  // UMD (AMD, CommonJS or the `Temme` global).
  {
    ...browser,
    format: "umd",
    globalName: "Temme",
  },

  // IIFE for a classic `<script>` tag, exposing the `Temme` global.
  {
    ...browser,
    format: "iife",
    globalName: "Temme",
  },
]);

export default config;
