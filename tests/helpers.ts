/**
 * Shared test helpers.
 */


import type { Hierarchy, HierarchyInput } from "../src/temme";
import { sanitize } from "../src/modules/sanitizer";



/**
 * Types a raw hierarchy literal as a (not yet sanitized) hierarchy, for internal APIs.
 *
 * @param input The hierarchy literal.
 * @returns {Hierarchy} The same object.
 */
export function asHierarchy(input: HierarchyInput | Record<string, unknown> = {}): Hierarchy {
  return input as Hierarchy;
}


/**
 * Builds a sanitized hierarchy from a literal.
 *
 * @param input The hierarchy literal.
 * @returns {Hierarchy} The sanitized hierarchy.
 */
export function sanitized(input: HierarchyInput | Record<string, unknown> = {}): Hierarchy {
  const hierarchy = asHierarchy(input);

  sanitize(hierarchy);

  return hierarchy;
}


/**
 * Creates a detached host element.
 *
 * @param name The tag name.
 * @returns {HTMLElement} The element.
 */
export function createTarget(name: string = "div"): HTMLElement {
  return document.createElement(name);
}


/**
 * Returns the child element at an index, failing loudly when it is missing.
 *
 * @param parent The parent element.
 * @param index The child index.
 * @returns {HTMLElement} The child element.
 */
export function childAt(parent: Element, index: number): HTMLElement {
  const child = parent.children[index];

  if (!(child instanceof HTMLElement)) {
    throw new TypeError(`No element child at index ${index}`);
  }

  return child;
}


/**
 * Runs a function and returns what it threw.
 *
 * @param fn The function expected to throw.
 * @returns {Error} The thrown error.
 */
export function thrown(fn: () => unknown): Error {
  try {
    fn();
  }
  catch (error) {
    return error as Error;
  }

  throw new Error("Expected the function to throw");
}
