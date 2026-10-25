/**
 * Assembles the GitHub Pages site into `_site/`: the static `docs/` sources plus the
 * freshly built browser bundle, which the docs page imports from `assets/js/lib/temme.js`.
 */

import { cp, mkdir, rm } from "node:fs/promises";
import process from "node:process";
import { fileURLToPath } from "node:url";



const root = fileURLToPath(new URL("..", import.meta.url));
const site = `${root}_site`;
const lib = `${site}/assets/js/lib`;

await rm(site, { recursive: true, force: true });
await cp(`${root}docs`, site, { recursive: true });
await mkdir(lib, { recursive: true });
await cp(`${root}dist/temme.browser.mjs`, `${lib}/temme.js`);
await cp(`${root}dist/temme.browser.mjs.map`, `${lib}/temme.browser.mjs.map`);

process.stdout.write(`Site assembled in ${site}\n`);
