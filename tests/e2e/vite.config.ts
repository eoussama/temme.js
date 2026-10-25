import type { UserConfig } from "vite";
import { defineConfig } from "vite";



// A plain static server over the repository root: no transforms are needed for the E2E pages.
const config: UserConfig = defineConfig({
  root: new URL("../..", import.meta.url).pathname,
  appType: "mpa",
  logLevel: "warn",
  server: { hmr: false },
  optimizeDeps: { noDiscovery: true, include: [] },
});

export default config;
