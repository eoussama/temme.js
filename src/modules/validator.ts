/**
 * The module responsible for validating the input.
 */


import Option, { IKeys } from "./models/Option";
import { options, getSubOptions } from "./options";
import InvalidTemplateOptionError from "./errors/InvalidTemplateOptionError";
import InvalidOptionNameError from "./errors/InvalidOptionNameError";
import InvalidOptionTypeError from "./errors/InvalidOptionTypeError";
import InvalidOptionValueError from "./errors/InvalidOptionValueError";
import InvalidSubOptionNameError from "./errors/InvalidSubOptionNameError";
import InvalidSubOptionTypeError from "./errors/InvalidSubOptionTypeError";
import InvalidSubOptionValueError from "./errors/InvalidSubOptionValueError";
import InvalidReferencingOptionError from "./errors/InvalidReferencingOptionError";


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
 * 
 * @throws InvalidOptionNameError, InvalidOptionTypeError, InvalidOptionValueError, InvalidSubOptionNameError, InvalidSubOptionTypeError, InvalidSubOptionValueError, InvalidTemplateOptionError
 */
export function validateOptions(hierarchy: any): void {

    try {

        // Looping through the hierarchy's options.
        for (const option in hierarchy) {

            const
                matchingOption: Option = <Option>options.filter((opt: Option) => opt.label === option)[0],
                optionValue: any = hierarchy[option];

            // Validating the option's name.
            if (Option.validateOptionName(matchingOption) === false) {
                throw new InvalidOptionNameError(option);
            }

            // Validating the option's type.
            const typeValidation: { valid: boolean, type: string } = Option.validateOptionType(optionValue, matchingOption);

            if (typeValidation.valid === false) {
                throw new InvalidOptionTypeError(option, typeValidation.type);
            }

            // Validating the option's value.
            if (Option.validateOptionValue(optionValue, matchingOption) === false) {
                throw new InvalidOptionValueError(option, optionValue);
            }

            // Repeating the same check for options that have keys.
            if ('keys' in matchingOption) {

                // Getting the option's sub-options.
                const subOptions = (<IKeys>matchingOption).keys;

                // Validating the sub-options.
                validateSubOptions(option, optionValue, subOptions);
            }
        }

        // Validating references.
        if (validateReferences(hierarchy) === false) {
            throw new InvalidReferencingOptionError("The “from” option must always have a “ref” sub-option");
        }

        // Checking if the hierarchy object contains any templates.
        if ('templates' in hierarchy) {

            hierarchy.templates.forEach((template: Object) => {
                validateTemplates(template);
            });
        }

        // Repeating the same check for the hierarchy's children.
        if ('childrenNodes' in hierarchy) {

            hierarchy.childrenNodes.forEach((child: Object) => {
                validateOptions(child);
            });
        }
    }
    catch (e) {

        throw e;
    }
}


/**
 * Validates the templates in a hierarchy object.
 * 
 * @param template The template object to validate.
 * 
 * @throws InvalidOptionNameError, InvalidOptionTypeError, InvalidOptionValueError, InvalidSubOptionNameError, InvalidSubOptionTypeError, InvalidSubOptionValueError, InvalidTemplateOptionError
 */
export function validateTemplates(template: any): void {

    // The options that are not allowed for templates.
    const forbiddenOptions: Array<string> = ['name', 'children', 'templates'];

    try {

        // Looping through the options of the template.
        for (const option in template) {

            // Checking if the template contains any invalid options.
            if (forbiddenOptions.indexOf(option) > -1) {
                throw new InvalidTemplateOptionError(option);
            } else {
                validateOptions(template);
            }
        }
    }
    catch (e) {

        throw e;
    }
}


/**
 * Validates the sub-options of another option.
 * @param optionName The name of the option to validate the sub-options for. 
 * @param optionValue The sub-options to validate.
 * @param subOptions The expected sub-options.
 */
function validateSubOptions(optionName: string, optionValue: any, subOptions: IKeys): void {

    // Looping through the expected sub-options.
    for (const subOption in optionValue) {

        const
            matchingSubOption: Option = getSubOptions(optionName).filter((subOptions: Option) => subOptions.label === subOption)[0],
            subOptionValue: any = optionValue[subOption];

        // Checking if a sub-option is in the parent option.
        if (subOption in subOptions) {

            // Validating the sub-option's name.
            if (Option.validateOptionName(matchingSubOption) === false) {
                throw new InvalidSubOptionNameError(optionName, subOption);
            }

            // Validating the sub-options's data type.
            const typeValidation: { valid: boolean, type: string } = Option.validateOptionType(subOptionValue, matchingSubOption);

            if (typeValidation.valid === false) {
                throw new InvalidSubOptionTypeError(subOption, typeValidation.type);
            }

            // Validating the sub-option's value.
            if (Option.validateOptionValue(subOptionValue, matchingSubOption) === false) {
                throw new InvalidSubOptionValueError(subOption, subOptionValue);
            }

            if ('keys' in matchingSubOption) {

                // Getting the option's sub-options.
                const subOptionValue = optionValue[subOption];

                validateSubOptions(subOption, subOptionValue, (<IKeys>matchingSubOption).keys);
            }

        } else {
            
            throw new InvalidSubOptionNameError(optionName, subOption);
        }
    }
}


/**
 * Validates the references in a hierarchy object.
 * 
 * @param hierarchy The hierarchy object to validate the references for.
 */
function validateReferences(hierarchy: any): boolean {

    if ('from' in hierarchy) {

        return 'ref' in hierarchy.from;
    }

    return true;
}
