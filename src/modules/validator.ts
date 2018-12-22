/**
 * The module responsible for validating the input.
 */


import Option from "./models/Option";
import InvalidOptionNameError from "./errors/InvalidOptionNameError";
import InvalidOptionTypeError from "./errors/InvalidOptionTypeError";
import InvalidOptionValueError from "./errors/InvalidOptionValueError";
import { options } from "./options";


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
export function validateOptions(hierarchy: any): void {

    // Looping through the hierarchy's options.
    for (const option in hierarchy) {

        // Getting the matching option.
        const 
            matchingOption: Option = options.filter(opt => opt.name === option)[0],
            optionValue: any = hierarchy[option];

        // Validating the option's name.
        validateOptionName(option, matchingOption);

        // Validating the option's type.
        validateOptionType(option, optionValue, matchingOption);

        // Validating the option's value.
        validateOptionValue(option, optionValue, matchingOption);
    }

    // Repeating the same check for the hierarchy's children.
    if ('children' in hierarchy) {

        hierarchy.children.forEach((child: Object) => {
            validateOptions(child);
        });
    }
}


/**
 * Validates the option's name.
 * 
 * @param option The option to check.
 * @param matchingOption The option object with the matching name.
 */
function validateOptionName(option: string, matchingOption: Option): void {

    // If the option is invalid, throw an error.
    if (matchingOption == null) {
        throw new InvalidOptionNameError(option);
    }
}


/**
 * Validates the data type of the option.
 * 
 * @param option The option to check.
 * @param value The value of the option.
 * @param matchingOption The option object with the matching name.
 */
function validateOptionType(option: string, value: any, matchingOption: Option): void {

    let optionType: string = "";

    // Getting the appropriate data type.
    if (Array.isArray(value)) {
        optionType = "array";
    } else {
        optionType = typeof value;
    }

    if (optionType !== matchingOption.type) {
        throw new InvalidOptionTypeError(option, optionType);
    }
}


/**
 * Validates the option's value.
 * 
 * @param option The option to check.
 * @param value The value to check.
 * @param matchingOption The option object with the matching name.
 */
function validateOptionValue(option: string, value: any, matchingOption: Option): void {

    // Checking if the matching object is valid.
    if (matchingOption != null && matchingOption.values.length > 0) {

        // Checking if the value is not a valid one.
        if (matchingOption.values.indexOf(value) === -1) {
            throw new InvalidOptionValueError(option, value);
        }
    }
}
