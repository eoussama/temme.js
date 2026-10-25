import dx from "@eoussama/dx";



export default dx({
  ignores: [
    "dist/**",
    "_site/**",
    "coverage/**",
    "reports/**",
    "docs/assets/js/lib/**",
  ],
}, {
  // Deliberately uses CommonJS-only TypeScript syntax to type-check CommonJS consumers.
  files: ["tests/smoke/fixtures/consumer.cts"],
  rules: {
    "no-restricted-syntax": "off",
    "ts/no-require-imports": "off",
  },
});
