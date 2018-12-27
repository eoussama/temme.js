/**
 * What's responsible for sanitizing the input
 * and populating the defaults.
 */


import Option, { IKeys } from "./models/Option";
import { options, forbiddenOptions } from "./options";


/**
 * Sanitizes a hierarchy object into an apropriate one.
 * 
 * @param hierarchy The hierarchy object to sanitize.
 */
export function sanitize(hierarchy: any): void {

    try {

        // Looping through the available options.
        options.forEach((opt: Option) => {

            if (!(opt.label in hierarchy)) {

                // Populating a default.
                hierarchy[opt.label] = opt.default;
            } else {

                // Sanitizing the sub-option.
                if ('keys' in opt) {

                    for (const key in (<IKeys>opt).keys) {

                        // Getting the sub-option.
                        const subOption: Option = (<IKeys>opt).keys[key];

                        // Sanitizing the sub-option.
                        sanitizeOption(hierarchy[(<Option>opt).label], subOption);
                    }
                }
            }

        });

        // Removing duplicates.
        hierarchy.classes = hierarchy.classes.filter((cls: string, index: number) => hierarchy.classes.indexOf(cls) === index);

        // Sorting the classes.
        hierarchy.classes.sort();

        // Checking if the hierarchy has children.
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {

            hierarchy.childNodes.forEach((child: any) => {

                sanitize(child);
            });
        }

        // Checking if the hierarchy has templates.
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {

            hierarchy.templates.forEach((template: any) => {

                sanitizeTemplate(template);
            });
        }
    }
    catch (e) {

        throw e;
    }
}


/**
 * Sanitizes an option.
 * 
 * @param hierarchy The hierarchy object to sanitize the option for.
 * @param option The option to sanitize.
 */
function sanitizeOption(hierarchy: any, option: Option): void {

    try {

        if (!(option.label in hierarchy)) {

            hierarchy[option.label] = option.default;
        }

        if ('keys' in option) {

            for (const key in (<IKeys>option).keys) {

                const
                    subHierarchy: any = hierarchy[(<Option>option).label],
                    subOption = (<IKeys>option).keys[key];

                sanitizeOption(subHierarchy, subOption);
            }
        }
    }
    catch (e) {

        throw e;
    }
}


/**
 * Sanitizes templates.
 * 
 * @param template The template to sanitize.
 */
function sanitizeTemplate(template: any): void {

    try {

        // Looping through the allowed options in templates.
        options
            .filter((opt: Option) => forbiddenOptions.indexOf(opt.label) === -1)
            .forEach((opt: Option) => {

                // Checking of the template doesn't have a said option.
                if (!(opt.label in template)) {

                    // Populating a default.
                    template[opt.label] = opt.default;
                } else {

                    // Sanitizing the sub-option.
                    if ('keys' in opt) {

                        for (const key in (<IKeys>opt).keys) {

                            // Getting the sub-option.
                            const subOption: Option = (<IKeys>opt).keys[key];

                            // Sanitizing the sub-option.
                            sanitizeOption(template[(<Option>opt).label], subOption);
                        }
                    }
                }
            });
    }
    catch (e) {

        throw e;
    }
}
