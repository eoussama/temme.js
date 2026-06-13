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
 * The entry point of Temme, it's what initiates everything
 * from sanitizing, to parsing, like a boss.
 *
 * @param hierarchy The hierarchy object that maps the HTML skeleton.
 * @param target The HTML element that will host the parsed skeleton.
 * @param endCallback The function that executes when the skeleton has been parsed.
 *                    May be async — any returned promise is awaited and rejection
 *                    is forwarded as a console warning so sync callers are not affected.
 * @param nodeCallback The function that executes whenever an element has been parsed.
 * @throws InvalidTargetError, InvalidHierarchyError
 */
export function parse(
  hierarchy: object,
  target: HTMLElement,
  endCallback: (resultedHierarchy: any) => void | Promise<void> = () => {},
  nodeCallback: (temmeId: string, currentHierarchy: any) => void = () => {},
): object {
  try {
    // Checking if the target is a valid HTML element and throwing
    // an error if it's not.
    if (!Validator.isValidHTMLElement(target)) {
      throw new InvalidTargetError("");
    }

    // Checking if the hierarchy object is valid and throwing
    // an error if it's not.
    if (!Validator.isValidHierarchy(hierarchy)) {
      throw new InvalidHierarchyError("");
    }

    // Checking if the hierarchy object contains valid options.
    Validator.validateOptions(hierarchy);

    // Sanitizing the hierarchy.
    Sanitizer.sanitize(hierarchy);

    // Assigning temmeIds to the hierarchy object.
    Idfier.idfy(hierarchy);

    // Processing all of the references.
    Referencer.process(hierarchy);

    // Parsing the hierarchy into an HTML tree.
    Parser.parse(hierarchy, target, nodeCallback, true);

    // Executing the end callback. If it returns a promise (async callback),
    // attach a rejection handler so unhandled-rejection warnings are avoided.
    const cbResult = endCallback(hierarchy);

    if (isPromise(cbResult)) {
      (cbResult as Promise<void>).catch((e: unknown) => {
        console.warn("[Temme]: async end-callback rejected:", e);
      });
    }

    // Returning the resulted hierarchy object.

    return hierarchy;
  }
  catch (e) {
    // Appending a tag in front of the error's message.
    (<TemmyError>e).message = `[Temme]: ${(e as Error).message}.`;

    // Throwing the error.
    throw e;
  }
}


/**
 * Validates the hierarchy object.
 *
 * @param hierarchy The hierarchy object that maps the HTML skeleton.
 * @throws InvalidHierarchyError
 */
export function validate(hierarchy: object): object {
  try {
    // Validate options.
    Validator.validateOptions(hierarchy);

    // Returns a valid object.

    return {
      valid: true,
      error: null,
    };
  }
  catch (err) {
    // Returns an invalid object.

    return {
      valid: false,
      error: err,
    };
  }
}
