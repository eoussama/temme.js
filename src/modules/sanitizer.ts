/**
 * @description
 * Responsible for sanitizing hierarchy input and populating option defaults.
 */


import type { Hierarchy } from "./models/Hierarchy";
import type Option from "./models/Option";
import { forbiddenOptions, getOptions } from "./options";
import { uniqueSorted } from "./utils";



/**
 * @description
 * Sanitizes a hierarchy object in place, recursively: missing options get a fresh default,
 * and list values (classes, include, exclude) are de-duplicated and sorted.
 * Sanitizing is idempotent.
 *
 * @param hierarchy The hierarchy object to sanitize.
 * @param isTemplate Whether the object is a template (forbidden options are left out).
 * @returns {void}
 */
export function sanitize(hierarchy: Hierarchy, isTemplate: boolean = false): void {
  getOptions()
    .filter((option: Option) => !isTemplate || !forbiddenOptions.includes(option.label))
    .forEach((option: Option) => sanitizeOption(hierarchy, option));

  hierarchy.classes = uniqueSorted(hierarchy.classes);

  hierarchy.childNodes?.forEach((child: Hierarchy) => sanitize(child));
  hierarchy.templates?.forEach((template: Hierarchy) => sanitize(template, true));
}


/**
 * @description
 * Sanitizes a single option entry on a (sub-)hierarchy object: populates a fresh default
 * when it is missing, normalises restricted list values, and recurses into sub-options.
 *
 * @param target The object holding the option.
 * @param option The option descriptor to apply.
 * @returns {void}
 */
function sanitizeOption(target: Record<string, unknown>, option: Option): void {
  if (!Object.hasOwn(target, option.label)) {
    target[option.label] = option.createDefault();

    return;
  }

  if (option.type === "array" && option.values.length > 0) {
    target[option.label] = uniqueSorted(target[option.label] as Array<unknown>);
  }

  if (option.keys !== undefined) {
    const value = target[option.label] as Record<string, unknown>;

    Object.values(option.keys).forEach((subOption: Option) => sanitizeOption(value, subOption));
  }
}
