import { defineConfig } from "tsup";


export default defineConfig({
  entry: { temme: "src/temme.ts" },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  outDir: "dist",
  treeshake: true,
  target: "es2020",
});
