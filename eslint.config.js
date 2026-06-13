import dx from "@eoussama/dx";



export default dx({
  ignores: [
    "build/**",
    "dist/**",
    "docs/assets/js/lib/**",
    "README.md",
    "bower.json",
    ".travis.yml",
  ],
})
  .append(
    // Jest test files — add globals and relax rules specific to test patterns
    {
      files: ["tests/**/*.js"],
      languageOptions: {
        globals: {
          describe: "readonly",
          it: "readonly",
          expect: "readonly",
          beforeEach: "readonly",
          afterEach: "readonly",
          beforeAll: "readonly",
          afterAll: "readonly",
        },
      },
      rules: {
        "no-console": "off",
        "no-sequences": "off",
      },
    },
    // Docs main JS — globals loaded via separate <script> tags
    {
      files: ["docs/assets/js/main.js"],
      languageOptions: {
        globals: {
          Temme: "readonly",
          hljs: "readonly",
        },
      },
    },
  );
