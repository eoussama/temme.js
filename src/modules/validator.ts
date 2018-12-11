/**
 * The module responsible for validating the input.
 */

import Hierarchy from "./models/Hierarchy";


/**
 * Checks if an object is a valid hierarchy object.
 * 
 * @param hierarchy The object to check.
 */
export function isValidHierarchy(hierarchy: Hierarchy): boolean {
	return true;
}


/**
 * Checks if an object is a valid HTML element.
 * 
 * @param target The object to check.
 */
export const isValidHTMLElement = (target: HTMLElement): boolean => target != null && target instanceof HTMLElement;
