import type { Hierarchy, HierarchyInput, ValidationResult } from "temmejs";
import { CircularReferenceError, parse, TemmyError, validate } from "temmejs";



const input: HierarchyInput = {
  classes: ["card"],
  attributes: { "tabindex": 0, "aria-hidden": false },
  templates: [{ ref: "base", classes: ["base"] }],
  childNodes: [{ name: "p", content: { type: "html", value: "<b>hi</b>" }, from: { ref: "base", include: ["classes"] } }],
};

const result: Hierarchy = parse(input, document.createElement("div"), async (hierarchy: Hierarchy) => {
  hierarchy.childNodes.forEach(child => child.temmeIds.at(-1));
}, (temmeId: string) => temmeId.length);
const outcome: ValidationResult = validate(result);
const isTemmeError: boolean = outcome.error instanceof TemmyError || outcome.error instanceof CircularReferenceError;

// @ts-expect-error: unknown content types are rejected.
const invalid: HierarchyInput = { content: { type: "markdown" } };

export { invalid, isTemmeError };
