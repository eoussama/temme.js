/**
 * 
 * @name:       temmejs
 * @version:    1.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/temmejs
 * 
 * Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
 * with no doubts, Emmet saved us from the headache of working with HTML and CSS, 
 * and now, Temme is doing Javascript the same favour too.
 * 
 */

import { Hierarchy } from "./modules/models/Hierarchy";
import * as Validator from "./modules/validator";
import { options } from "./modules/options/options";
import TemmyError from "./modules/models/TemmyError";
import InvalidHierarchyError from "./modules/errors/InvalidHierarchyError";
import InvalidTargetError from "./modules/errors/InvalidTargetError";

/**
 * `Parse` is the entry point of Temme, it's what initiates everything
 * from sanitizing, to parsing, like a boss.
 * 
 * @param hierarchy The hierarchy object that maps the HTML skeleton.
 * @param target The HTML element that will host the parsed skeleton.
 * @param endBallback The function that execute when the skeleton has been parsed.
 * @param nodeCallback The function that executes whenever an element has been parsed.
 */
export function parse(hierarchy: Hierarchy, target: HTMLElement, endBallback: () => {}, nodeCallback: (temmeId: string, currentHierarchy: Hierarchy, depth: number) => {}) {
    console.log(options);
    try {

        // Checking if the target is a valid HTML element and throwing
        // an error if it's not.
        if (!Validator.isValidHTMLElement(target)) {
            throw new InvalidTargetError("");
        }

        // Checking if the hierarchy object is and throwing
        // an error if it's not.
        if (!Validator.isValidHierarchy(hierarchy)) {
            throw new InvalidHierarchyError("");
        }

        // Executing the end callback.
        endBallback();
    }
    catch (e) {

        // Appending a tag in front of the error's message.
        (<TemmyError>e).message = `[Temme]: ${e.message}.`;

        // Throwing the error.
        throw e;
    }
}
