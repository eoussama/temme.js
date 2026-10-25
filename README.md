<p align="center">
    <img src="https://raw.githubusercontent.com/eoussama/temmejs/master/docs/assets/img/logo.svg" width="150" alt="Temme JS logo" />
    <h1 align="center">Temme JS</h1>
    <p align="center">
        <a href="https://www.npmjs.com/package/temmejs"><img src="https://img.shields.io/npm/v/temmejs" alt="npm version" /></a>
        <a href="https://github.com/eoussama/temmejs/releases/latest"><img src="https://img.shields.io/github/v/release/eoussama/temmejs" alt="Latest GitHub release" /></a>
        <a href="https://github.com/eoussama/temmejs/actions/workflows/ci.yml"><img src="https://github.com/eoussama/temmejs/actions/workflows/ci.yml/badge.svg" alt="CI status" /></a>
        <a href="https://www.jsdelivr.com/package/npm/temmejs"><img src="https://img.shields.io/jsdelivr/npm/hm/temmejs" alt="jsDelivr hits" /></a>
        <a href="https://bundlephobia.com/package/temmejs"><img src="https://img.shields.io/bundlephobia/minzip/temmejs" alt="Minified and gzipped size" /></a>
        <a href="https://github.com/eoussama/temmejs/blob/master/LICENSE"><img src="https://img.shields.io/github/license/eoussama/temmejs" alt="License" /></a>
    </p>
</p>

---

## Description

Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS, with no doubts, Emmet saved us from the headache of working with HTML and CSS, and now, it's about time Javascript had the same quirk too.

Temme works with javascript objects instead of plain text: give it a hierarchy object describing an HTML skeleton and an element to host it, and it builds the DOM tree for you. The library is dependency-light, fully typed and tree-shakeable.

## Install

```bash
pnpm add temmejs
```

```bash
npm install temmejs
```

```bash
yarn add temmejs
```

The package is also published to GitHub Packages as `@eoussama/temmejs`. More installation options are covered in [the wiki](https://github.com/eoussama/temmejs/wiki/Temme-install).

### Distribution formats

| File                     | Format           | Use it for                                                         |
| ------------------------ | ---------------- | ------------------------------------------------------------------ |
| `dist/temme.mjs`         | ES module        | Bundlers and Node.js `import` (with `temme.d.mts` types)           |
| `dist/temme.cjs`         | CommonJS         | Node.js `require` (with `temme.d.cts` types)                       |
| `dist/temme.browser.mjs` | ES module (min)  | `<script type="module">` straight from a CDN, no dependencies      |
| `dist/temme.umd.js`      | UMD (min)        | AMD, CommonJS or the `Temme` global; the CDN default               |
| `dist/temme.iife.js`     | IIFE (min)       | A classic `<script>` tag exposing the `Temme` global               |

## Syntax

```ts
declare function parse(
  hierarchy: object,
  target: HTMLElement,
  endCallback?: (hierarchy: Hierarchy) => void | Promise<void>,
  nodeCallback?: (temmeId: string, hierarchy: Hierarchy) => void,
): Hierarchy;

declare function validate(hierarchy: object): { valid: boolean; error: unknown };
```

- `parse` validates the hierarchy, completes it in place (defaults, inherited values, temmeIds), renders it into `target` and returns it. Parsing the returned object again renders the same tree.
- `validate` runs every check `parse` runs, on a copy, without rendering anything.
- Invalid input throws one of the exported error classes, all extending `TemmyError`, with a message prefixed by `[Temme]: `.
- The `HierarchyInput` type describes valid hierarchy objects, for type-checked hierarchies in TypeScript.

## Example for the browser

```html
<!-- The element we're going to append the HTML skeleton to. -->
<div id="target"></div>

<!-- Including Temme JS, which exposes the `Temme` global. -->
<script src="https://cdn.jsdelivr.net/npm/temmejs/dist/temme.iife.js"></script>

<!-- Putting Temme to do its thing. -->
<script>
  Temme.parse(
    {
      classes: ["card", "card-dark"],
      templates: [{ ref: "paragraph", classes: ["text"] }],
      childNodes: [
        {
          name: "div",
          classes: ["card-header"],
          childNodes: [
            {
              name: "h2",
              classes: ["title", "bold"],
              attributes: { contenteditable: true },
              content: { value: "Card header" },
            },
          ],
        },
        {
          name: "div",
          classes: ["card-body"],
          dataset: { source: "example.com", id: 536 },
          childNodes: [
            {
              name: "p",
              content: { value: "Plain text, <b>escaped</b>." },
              from: { ref: "paragraph" },
            },
            {
              name: "p",
              content: { type: "html", value: "Some <b>bold</b> HTML." },
              from: { ref: "paragraph" },
            },
          ],
        },
      ],
    },
    document.getElementById("target"),
  );
</script>
```

Simply that, giving Temme a target element and a skeleton object, it will render the following.

```html
<div id="target" class="card card-dark">
  <div class="card-header">
    <h2 class="bold title" contenteditable="true">Card header</h2>
  </div>
  <div class="card-body" data-source="example.com" data-id="536">
    <p class="text">Plain text, &lt;b&gt;escaped&lt;/b&gt;.</p>
    <p class="text">Some <b>bold</b> HTML.</p>
  </div>
</div>
```

With a `<script type="module">`, import the self-contained browser build instead:

```js
import { parse } from "https://cdn.jsdelivr.net/npm/temmejs/dist/temme.browser.mjs";
```

## Example with a bundler or Node.js

```js
// ESM
import { parse, validate } from "temmejs";
```

```js
// CommonJS
const { parse, validate } = require("temmejs");
```

Temme needs a DOM to render into: the browser's, or one from a library such as [happy-dom](https://github.com/capricorn86/happy-dom) or [jsdom](https://github.com/jsdom/jsdom) in Node.js.

```js
const target = document.createElement("div");

try {
  parse({ classes: ["red"], childNodes: [{ name: "p", content: { value: "Hello" } }] }, target);
}
catch (error) {
  console.error(error.name, error.message);
}

validate({ bogus: true });
// { valid: false, error: InvalidOptionNameError: “bogus” is not a valid option }
```

More on how to use Temme can be found [at the documentation web page](https://eoussama.github.io/temmejs/) and even more in-depth [in the wiki](https://github.com/eoussama/temmejs/wiki), including [the options](https://github.com/eoussama/temmejs/wiki/Temme-options) and [inheritance](https://github.com/eoussama/temmejs/wiki/Temme-inheritance).

## Development

Requires Node.js 24 or later and pnpm 12 (npm and yarn are refused).

```bash
pnpm install
pnpm check
```

| Command              | Description                                                                        |
| -------------------- | ---------------------------------------------------------------------------------- |
| `pnpm build`         | Builds every format into `dist/` with tsdown, then checks the package with publint and attw. |
| `pnpm dev`           | Rebuilds on change.                                                                |
| `pnpm build:site`    | Assembles the documentation site (`docs/` and the browser build) into `_site/`.    |
| `pnpm typecheck`     | Type checks with the TypeScript 7 native compiler.                                 |
| `pnpm lint`          | Lints with [@eoussama/dx](https://github.com/eoussama/dx) (`pnpm lint:fix` fixes). |
| `pnpm test`          | Runs the unit and integration tests, failing below 100% coverage.                  |
| `pnpm test:smoke`    | Tests the built `dist/`: every format, the types, tree-shaking and the package.    |
| `pnpm test:e2e`      | Tests the documentation site and the examples in Chromium with Playwright.         |
| `pnpm test:mutation` | Runs Stryker mutation testing, failing below a 95% score.                          |
| `pnpm check`         | Runs all of the above, plus `pnpm audit`.                                          |

More about [building](https://github.com/eoussama/temmejs/wiki/Temme-build) and [testing](https://github.com/eoussama/temmejs/wiki/Temme-tests) in the wiki.

## Credits

Icon made by [Freepik](https://www.freepik.com/) from [Flaticon](https://www.flaticon.com) and licensed by [Creative Commons BY 3.0](http://creativecommons.org/licenses/by/3.0/).
