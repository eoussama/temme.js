/**
 * 
 * @name:       temmejs
 * @version:    1.0.1
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/temmejs
 * 
 * Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
 * with no doubts, Emmet saved us from the headache of working with HTML and CSS, 
 * and now, Temme is doing Javascript the same favour too.
 * 
 */


import * as Validator from "./modules/validator";
import * as Sanitizer from "./modules/sanitizer";
import * as Referencer from "./modules/referencer";
import * as Parser from './modules/parser';
import * as Idfier from "./modules/idfier";
import TemmyError from "./modules/models/TemmyError";
import InvalidHierarchyError from "./modules/errors/InvalidHierarchyError";
import InvalidTargetError from "./modules/errors/InvalidTargetError";


/**
 * The entry point of Temme, it's what initiates everything
 * from sanitizing, to parsing, like a boss.
 * 
 * @param hierarchy The hierarchy object that maps the HTML skeleton.
 * @param target The HTML element that will host the parsed skeleton.
 * @param endCallback The function that execute when the skeleton has been parsed.
 * @param nodeCallback The function that executes whenever an element has been parsed.
 * 
 * @throws InvalidTargetError, InvalidHierarchyError
 */
export function parse(hierarchy: Object, target: HTMLElement, endCallback: (resultedHierarchy: any) => void = (hierarchy) => { }, nodeCallback: (temmeId: string, currentHierarchy: any) => void = () => { }): Object {

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

        // Checking if the hierarchy object contains
        // valid options.
        Validator.validateOptions(hierarchy);

        // Sanitizing the hierarchy.
        Sanitizer.sanitize(hierarchy);

        // Assigning temmeIds to the hierarchy object.
        Idfier.idfy(hierarchy);

        // Processing all of the references.
        Referencer.process(hierarchy);

        // Parsing the hierarchy into an HTML tree.
        Parser.parse(hierarchy, target, nodeCallback, true);

        // Executing the end callback.
        endCallback(hierarchy);

        // Returning the resulted hierarchy object.
        return hierarchy;
    }
    catch (e) {

        // Appending a tag in front of the error's message.
        (<TemmyError>e).message = `[Temme]: ${e.message}.`;

        // Throwing the error.
        throw e;
    }
}

/**
 * Validates the hierarchy object
 *
 * @param hierarchy The hierarchy object that maps the HTML skeleton.
 * @throws InvalidHierarchyError
 */
export function validate(hierarchy: Object): Object {
    try {

        // Validate options
        Validator.validateOptions(hierarchy);

        // Returns a valid object
        return {
            valid: true,
            error: null
        };
    } catch (err) {

        // Returns an invalid object
        return {
            valid: false,
            error: err
        }
    }
}
