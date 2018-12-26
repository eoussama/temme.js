/**
 * The module responsible for validating the input.
 */


import Option, { IKeys } from "./models/Option";
import { options, forbiddenOptions, getSubOptions } from "./options";
import InvalidTemplateOptionError from "./errors/InvalidTemplateOptionError";
import InvalidOptionNameError from "./errors/InvalidOptionNameError";
import InvalidOptionTypeError from "./errors/InvalidOptionTypeError";
import InvalidOptionValueError from "./errors/InvalidOptionValueError";
import InvalidSubOptionNameError from "./errors/InvalidSubOptionNameError";
import InvalidSubOptionTypeError from "./errors/InvalidSubOptionTypeError";
import InvalidSubOptionValueError from "./errors/InvalidSubOptionValueError";
import InvalidReferencingOptionError from "./errors/InvalidReferencingOptionError";
import InvalidReferenceOptionValueError from "./errors/InvalidReferenceOptionValueError";
import InvalidReferenceError from "./errors/InvalidReferenceError";
import InvalidTemplateError from "./errors/InvalidTemplateError";
import { ReferenceType } from "./referencer";
import { getTemmeId } from "./idfier";
import { Hierarchy } from "./models/Hierarchy";
import { Template } from "./models/Template";
import InvalidTemplateReferencingError from "./errors/InvalidTemplateReferencingError";
import ReferenceOutOfRangeError from "./errors/ReferenceOutOfScopeError";


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
        if (validateReferencingOption(hierarchy) === false) {
            throw new InvalidReferencingOptionError("The “from” option must always have a “ref” sub-option");
        }

        // Checking if the hierarchy object contains any templates.
        if ('templates' in hierarchy) {

            hierarchy.templates.forEach((template: Object) => {
                validateTemplates(template);
            });
        }

        // Repeating the same check for the hierarchy's children.
        if ('childNodes' in hierarchy) {

            hierarchy.childNodes.forEach((child: Object) => {
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
 * @throws InvalidOptionNameError, InvalidOptionTypeError, InvalidOptionValueError, InvalidSubOptionNameError, InvalidSubOptionTypeError, InvalidSubOptionValueError, InvalidTemplateError, InvalidTemplateOptionError
 */
export function validateTemplates(template: any): void {

    try {

        if (!('ref' in template)) {
            throw new InvalidTemplateError("");
        }

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
 * Validates the references in the hierarchy object.
 * 
 * @param hierarchy The hierarchy object to validate the references for.
 * @param references The valid refernces.
 * 
 * @throws InvalidReferenceError
 */
export function validateReferences(hierarchy: any, references: Array<ReferenceType>): void {

    try {

        // Checking if the “ref” option starts with the “@” symbol.
        if (hierarchy.ref[0] === '@') {
            throw new InvalidReferenceOptionValueError("");
        } 
        
        // Checking if the object is referencing an outer element.
        if (hierarchy.from.ref[0] === '@') {

            const
                selector: string = (<string>hierarchy.from.ref).substring(1),
                element: HTMLElement | null = document.querySelector(selector);

            if (element == null) {
                throw new InvalidReferenceOptionValueError(`No outer element corresponds to the selector “${selector}”`);
            }
        } else {

            // Checking of the reference exists.
            if (validateReference(hierarchy, references) === false && hierarchy.from.ref !== "") {
                throw new InvalidReferenceError(hierarchy.from.ref);
            }
        }

        // Checking if the hierarchy object has any children.
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {

            hierarchy.childNodes.forEach((child: Hierarchy) => {

                validateReferences(child, references);
            });
        }

        // Checking if the hierarchy object has any templates.
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {

            hierarchy.templates.forEach((template: any) => {

                validateReferences(template, references);
            });
        }
    }
    catch (e) {

        throw e;
    }
}


/**
 * Validates a passed reference.
 * 
 * @param reference The reference to validate.
 * @param references The valid references.
 */
const validateReference = (hierarchy: any, references: Array<ReferenceType>): boolean => references.filter((ref: ReferenceType) => ref.hierarchy.ref === hierarchy.from.ref && getTemmeId(hierarchy) !== getTemmeId(ref.hierarchy))[0] != null;


/**
 * Validates whether templates are referencing non-template element
 * or not, in which case, an error is thrown.
 * 
 * @param hierarchy The hierarchy to validate the template inheritance for.
 * @param references There valid references.
 * 
 * @throws InvalidTemplateReferencingError
 */
export function validateTemplateReference(hierarchy: any, references: Array<ReferenceType>): void {

    try {

        // Getting the templates.
        const templates = hierarchy.templates;

        // Checking if there are any valid templates.
        if (templates.length > 0) {

            templates.forEach((template: any) => {

                // Checking if the template's referencing value is valid.
                if (template.from.ref.length > 0) {

                    const
                        referencedElement: any = references.filter((ref: ReferenceType) => (<Hierarchy>ref.hierarchy).ref === template.from.ref)[0],
                        isTemplate: boolean = getTemmeId(referencedElement.hierarchy).length === 4;
    
                    if (isTemplate === false) {
                       throw new InvalidTemplateReferencingError(template.ref, template.from.ref);
                    }
                }
            });
        }

        hierarchy.childNodes.forEach((child: any) => {

            validateTemplateReference(child, references);
        });
    }
    catch(e)
    {

        throw e;
    }
}


/**
 * Validates whether a hierarchy object is referencing its child.
 * 
 * @param hierarchy The hierarchy to validate.
 * @param references There valid references.
 * @param depth The depth of the validation.
 */
export function validateParentToChildReference(hierarchy: any, references: Array<ReferenceType>, depth: number = 0): void {

    try {

        const ref: string = hierarchy.from.ref;

        // Incrementing the depth
        depth++;

        // Checking if the reference is valid.
        if (ref !== "") {

            // Getting the referenced hierarchy.
            const referencedHierarchy: ReferenceType = references.filter((refObject: ReferenceType) => (<Hierarchy>refObject.hierarchy).ref === ref && depth >= refObject.depth)[0];

            if (referencedHierarchy == null) {
                throw new ReferenceOutOfRangeError("");
            }
        }

        // Checking if the hierarchy object has any children.
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {

            hierarchy.childNodes.forEach((child: Hierarchy) => {

                validateParentToChildReference(child, references, depth);
            });
        }

        // Checking if the hierarchy object has any templates.
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {

            hierarchy.templates.forEach((template: any) => {

                validateParentToChildReference(template, references, depth);
            });
        }
        
    }
    catch(e) {

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
function validateReferencingOption(hierarchy: any): boolean {

    if ('from' in hierarchy) {

        return 'ref' in hierarchy.from;
    }

    return true;
}
