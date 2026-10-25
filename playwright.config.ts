import type { PlaywrightTestConfig } from "@playwright/test";
import process from "node:process";
import { defineConfig, devices } from "@playwright/test";



const port = 4173;

const config: PlaywrightTestConfig = defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [["github"], ["html", { open: "never" }]] : "list",
  use: {
    baseURL: `http://localhost:${port}`,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  // Serves the repository root so the built site (`_site/`), `examples/` and `dist/` are all reachable.
  webServer: {
    command: `pnpm exec vite --config tests/e2e/vite.config.ts --port ${port} --strictPort`,
    url: `http://localhost:${port}/_site/index.html`,
    reuseExistingServer: !process.env.CI,
  },
});

export default config;
