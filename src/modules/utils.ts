/**
 * @description
 * Small, dependency-free helpers shared by the hierarchy pipeline.
 */


import { isObject } from "@eoussama/core";



/**
 * @description
 * The hierarchy objects whose inheritance has already been applied.
 * Re-parsing such an object renders it as-is instead of inheriting a second time.
 */
const resolved: WeakSet<object> = /* @__PURE__ */ new WeakSet();


/**
 * @description
 * Checks whether a hierarchy object has already been through reference resolution.
 *
 * @param hierarchy The hierarchy object to check.
 * @returns {boolean} `true` when the hierarchy has been resolved before.
 */
export function isResolved(hierarchy: object): boolean {
  return resolved.has(hierarchy);
}


/**
 * @description
 * Marks a hierarchy object as resolved.
 *
 * @param hierarchy The hierarchy object to mark.
 * @returns {void}
 */
export function markResolved(hierarchy: object): void {
  resolved.add(hierarchy);
}


/**
 * @description
 * Deep-copies plain data (arrays and plain objects), leaving every other value as-is.
 * The resolved state of copied hierarchy objects is carried over to their copies.
 *
 * @param value The value to copy.
 * @returns {T} The copy.
 */
export function clone<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(clone) as T;
  }

  if (isObject(value)) {
    const copy: Record<string, unknown> = {};

    for (const [key, entry] of Object.entries(value)) {
      copy[key] = clone(entry);
    }

    if (isResolved(value)) {
      markResolved(copy);
    }

    return copy as T;
  }

  return value;
}


/**
 * @description
 * Returns the distinct entries of a list, sorted.
 *
 * @param list The list to normalise.
 * @returns {Array<T>} A new sorted list without duplicates.
 */
export function uniqueSorted<T>(list: Array<T>): Array<T> {
  return [...new Set(list)].sort();
}
