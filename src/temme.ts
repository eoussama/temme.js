/**
 *
 * @name:       temmejs
 * @version:    1.0.6
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/temmejs
 *
 * Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
 * with no doubts, Emmet saved us from the headache of working with HTML and CSS,
 * and now, Temme is doing Javascript the same favour too.
 */


import type { Hierarchy } from "./modules/models/Hierarchy";

import type TemmyError from "./modules/models/TemmyError";
import { isPromise } from "@eoussama/core";
import InvalidHierarchyError from "./modules/errors/InvalidHierarchyError";
import InvalidTargetError from "./modules/errors/InvalidTargetError";
import * as Idfier from "./modules/idfier";
import * as Parser from "./modules/parser";
import * as Referencer from "./modules/referencer";
import * as Sanitizer from "./modules/sanitizer";
import * as Validator from "./modules/validator";



/**
 * @description
 * The entry point of Temme — sanitizes, validates, id-fies and parses a
 * hierarchy object into a live HTML tree.
 *
 * @param hierarchy The hierarchy object that maps the HTML skeleton.
 * @param target The HTML element that will host the parsed skeleton.
 * @param endCallback The function that executes when the skeleton has been fully parsed.
 *   May be async — any returned promise has its rejection forwarded as a `console.warn`
 *   so synchronous callers are never affected.
 * @param nodeCallback The function that executes whenever an individual element is parsed.
 * @returns {object} The (mutated) hierarchy object after parsing.
 * @throws {InvalidTargetError} When `target` is not a valid HTML element.
 * @throws {InvalidHierarchyError} When `hierarchy` is not a valid plain object.
 */
export function parse(
  hierarchy: object,
  target: HTMLElement,
  endCallback: (resultedHierarchy: Hierarchy) => void | Promise<void> = () => {},
  nodeCallback: (temmeId: string, currentHierarchy: Hierarchy) => void = () => {},
): object {
  try {
    if (!Validator.isValidHTMLElement(target)) {
      throw new InvalidTargetError("");
    }

    if (!Validator.isValidHierarchy(hierarchy)) {
      throw new InvalidHierarchyError("");
    }

    // From this point `hierarchy` satisfies the Hierarchy contract
    // (remaining required fields are populated by the sanitizer).
    const h = hierarchy as Hierarchy;

    Validator.validateOptions(h);
    Sanitizer.sanitize(h);
    Idfier.idfy(h);
    Referencer.process(h);
    Parser.parse(h, target, nodeCallback, true);

    const cbResult = endCallback(h);

    if (isPromise(cbResult)) {
      (cbResult as Promise<void>).catch((e: unknown) => {
        console.warn("[Temme]: async end-callback rejected:", e);
      });
    }

    return h;
  }
  catch (e) {
    (<TemmyError>e).message = `[Temme]: ${(e as Error).message}.`;
    throw e;
  }
}


/**
 * @description
 * Validates a hierarchy object without parsing it.
 * Returns a result object instead of throwing.
 *
 * @param hierarchy The hierarchy object to validate.
 * @returns {{ valid: boolean; error: unknown }} Validation result — `valid` is `true` when
 *   the hierarchy is well-formed, `false` otherwise with the caught error in `error`.
 */
export function validate(hierarchy: object): { valid: boolean; error: unknown } {
  try {
    Validator.validateOptions(hierarchy as Hierarchy);

    return { valid: true, error: null };
  }
  catch (err) {
    return { valid: false, error: err };
  }
}
