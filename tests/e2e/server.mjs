/**
 * A minimal static file server over the repository root, used by the E2E tests
 * to serve the built site (`_site/`), `examples/`, `dist/` and the test fixtures.
 */

import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize, sep } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";



const root = fileURLToPath(new URL("../..", import.meta.url));
const port = Number(process.env.PORT ?? 4173);

const types = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
  ".map": "application/json",
  ".mjs": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain",
};

createServer(async (request, response) => {
  const path = normalize(join(root, decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname)));
  const file = path.endsWith(sep) ? join(path, "index.html") : path;
  const found = file.startsWith(root) && await stat(file).then(stats => stats.isFile(), () => false);

  if (!found) {
    response.writeHead(404).end("Not found");

    return;
  }

  response.writeHead(200, { "content-type": `${types[extname(file)] ?? "application/octet-stream"}; charset=utf-8` });
  createReadStream(file).pipe(response);
}).listen(port, () => process.stdout.write(`Serving ${root} on http://localhost:${port}\n`));
