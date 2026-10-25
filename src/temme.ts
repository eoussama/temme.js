/**
 * Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
 * with no doubts, Emmet saved us from the headache of working with HTML and CSS,
 * and now, Temme is doing Javascript the same favour too.
 *
 * @license MIT
 * @see https://github.com/eoussama/temme.js
 */


import type { Hierarchy } from "./modules/models/Hierarchy";
import { isPromise, tryCatchSync } from "@eoussama/core";
import InvalidTargetError from "./modules/errors/InvalidTargetError";
import * as Idfier from "./modules/idfier";
import TemmyError from "./modules/models/TemmyError";
import * as Parser from "./modules/parser";
import * as Referencer from "./modules/referencer";
import * as Sanitizer from "./modules/sanitizer";
import { clone } from "./modules/utils";
import * as Validator from "./modules/validator";



export { default as CircularReferenceError } from "./modules/errors/CircularReferenceError";
export { default as InvalidHierarchyError } from "./modules/errors/InvalidHierarchyError";
export { default as InvalidOptionNameError } from "./modules/errors/InvalidOptionNameError";
export { default as InvalidOptionTypeError } from "./modules/errors/InvalidOptionTypeError";
export { default as InvalidOptionValueError } from "./modules/errors/InvalidOptionValueError";
export { default as InvalidReferenceError } from "./modules/errors/InvalidReferenceError";
export { default as InvalidReferenceOptionValueError } from "./modules/errors/InvalidReferenceOptionValueError";
export { default as InvalidReferencingOptionError } from "./modules/errors/InvalidReferencingOptionError";
export { default as InvalidSubOptionNameError } from "./modules/errors/InvalidSubOptionNameError";
export { default as InvalidSubOptionTypeError } from "./modules/errors/InvalidSubOptionTypeError";
export { default as InvalidSubOptionValueError } from "./modules/errors/InvalidSubOptionValueError";
export { default as InvalidTargetError } from "./modules/errors/InvalidTargetError";
export { default as InvalidTemplateError } from "./modules/errors/InvalidTemplateError";
export { default as InvalidTemplateOptionError } from "./modules/errors/InvalidTemplateOptionError";
export { default as InvalidTemplateReferencingError } from "./modules/errors/InvalidTemplateReferencingError";
export { default as ReferenceOutOfScopeError } from "./modules/errors/ReferenceOutOfScopeError";
export type { AttributeValue, Content, From, FromInput, Hierarchy, HierarchyInput, InheritableOption, TemplateInput } from "./modules/models/Hierarchy";
export { default as TemmyError } from "./modules/models/TemmyError";


/**
 * @description
 * Called once the whole tree has been rendered. May be async: a rejected promise is
 * reported with `console.warn` and never affects the caller.
 */
export type ParseEndCallback = (resultedHierarchy: Hierarchy) => void | Promise<void>;


/**
 * @description
 * Called right after each element is rendered (the root first, then depth-first).
 */
export type ParseNodeCallback = (temmeId: string, currentHierarchy: Hierarchy) => void;


/**
 * @description
 * The outcome of `validate`.
 */
export type ValidationResult = {

  /** `true` when the hierarchy can be parsed. */
  valid: boolean;

  /** The error `parse` would throw, or `null` when valid. */
  error: unknown;
};


/**
 * @description
 * The entry point of Temme — validates, sanitizes, resolves the references of and renders
 * a hierarchy object into a live HTML tree.
 *
 * The hierarchy object is completed in place (defaults, inherited values, temmeIds) and
 * returned. Parsing the returned object again renders the same tree.
 *
 * @param hierarchy The hierarchy object that maps the HTML skeleton.
 * @param target The HTML element that will host the rendered skeleton.
 * @param endCallback The function that executes when the skeleton has been fully rendered.
 * @param nodeCallback The function that executes whenever an individual element is rendered.
 * @returns {Hierarchy} The completed hierarchy object.
 * @throws {TemmyError} When the target or the hierarchy is invalid; the message is prefixed
 *   with "[Temme]: ". Errors thrown by the callbacks are re-thrown untouched.
 */
export function parse(
  hierarchy: object,
  target: HTMLElement,
  endCallback: ParseEndCallback = () => {},
  nodeCallback: ParseNodeCallback = () => {},
): Hierarchy {
  const resolved = prepare(hierarchy, target);

  Parser.parse(resolved, target, nodeCallback, true);

  const result = endCallback(resolved);

  if (isPromise(result)) {
    result.then(undefined, (error: unknown) => {
      console.warn("[Temme]: async end-callback rejected:", error);
    });
  }

  return resolved;
}


/**
 * @description
 * Validates a hierarchy object without rendering or modifying it: runs every check `parse`
 * runs (options, templates, references, scopes and cycles) on a copy.
 *
 * @param hierarchy The hierarchy object to validate.
 * @returns {ValidationResult} `valid` is `true` when the hierarchy is well-formed,
 *   otherwise `error` holds the error `parse` would throw.
 */
export function validate(hierarchy: object): ValidationResult {
  const [error] = tryCatchSync<Error, void>(() => {
    Validator.validateOptions(hierarchy);

    const copy = clone(hierarchy) as Hierarchy;

    Sanitizer.sanitize(copy);
    Referencer.process(copy, globalThis.document);
  });

  return { valid: error === null, error };
}


/**
 * @description
 * Validates and completes a hierarchy, prefixing Temme's own errors with "[Temme]: ".
 *
 * @param hierarchy The hierarchy object.
 * @param target The host element.
 * @returns {Hierarchy} The completed hierarchy.
 */
function prepare(hierarchy: object, target: HTMLElement): Hierarchy {
  try {
    if (!Validator.isValidHTMLElement(target)) {
      throw new InvalidTargetError("");
    }

    Validator.validateOptions(hierarchy);

    const completed = hierarchy as Hierarchy;

    Sanitizer.sanitize(completed);
    Referencer.process(completed, target.ownerDocument);
    Idfier.idfy(completed);

    return completed;
  }
  catch (error) {
    if (error instanceof TemmyError) {
      error.message = `[Temme]: ${error.message}.`;
    }

    throw error;
  }
}
