/**
 * The module responsible for validating the input.
 */


/**
 * Checks if an object is a valid hierarchy object.
 * 
 * @param hierarchy The object to check.
 */
export const isValidHierarchy = (hierarchy: Object): boolean => hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy);


/**
 * Checks if an object is a valid HTML element.
 * 
 * @param target The object to check.
 */
export const isValidHTMLElement = (target: HTMLElement): boolean => target != null && target instanceof HTMLElement;


/**
 * Validates the options in a hierarchy object for any
 * options it has or values it contains.
 * 
 * @param hierarchy The hierarchy object to validate the options for.
 */
export function validateOptions(hierarchy: Object): void {
    console.log(hierarchy);
}
