/**
 * The list of supported options.
 */


import Option, { IKeys } from "./models/Option";
import RefOption from "./options/RefOption";
import NameOption from "./options/NameOption";
import IdOption from "./options/IdOption";
import ContentOption from "./options/ContentOption";
import TemmeIdsOption from "./options/TemmeIdsOption";
import TemplatesOption from "./options/TemplatesOption";
import ClassesOption from "./options/ClassesOption";
import ChildrenNodesOption from "./options/ChildrenNodesOption";
import AttributesOption from "./options/AttributesOption";
import DatasetOption from "./options/DatasetOption";
import FromOption from "./options/FromOption";


/**
 * All the global options.
 */
export const options: Array<Option> = [
    new RefOption(),
    new NameOption(),
    new IdOption(),
    new ContentOption(),
    new TemmeIdsOption(),
    new TemplatesOption(),
    new ClassesOption(),
    new ChildrenNodesOption(),
    new AttributesOption(),
    new DatasetOption(),
    new FromOption()
];


/**
 * The of the options available (including sub-options).
 */
export const allOptions = getAllOptions();


/**
 * Gets all the sub-options of an option.
 * 
 * @param option The parent option's name.
 */
export function getSubOptions(option: string): Array<Option> {

    const subOptions: Array<any> = [];

    // Looping through all of the options.
    allOptions.forEach((opt: Option) => {

        if ('keys' in opt && (<Option>opt).label === option) {
            
            for (const key in (<IKeys>opt).keys) {

                // Getting the sub-option.
                const subOption = (<IKeys>opt).keys[key];

                // Pushing the sub-option.
                subOptions.push(subOption);
            }
        }
    });

    // Returning the found sub-options.
    return subOptions;
}


/**
 * Gets all of the options and sub-options.
 */
function getAllOptions(): Array<Option> {

    let allOptions: Array<Option> = [];

    options.forEach((opt: Option) => {

        allOptions.push(opt);

        if ('keys' in opt) {

            // Getting all of the sub-options.
            const subOptions: Array<Option> = getAllSubOptions(opt);

            allOptions = allOptions.concat(subOptions);
        }
    });

    return allOptions;
}


/**
 * Gets all the sub-options of an option.
 * 
 * @param opt The option to get the sub-options of.
 */
function getAllSubOptions(option: Option): Array<Option> {

    let allSubOptions: Array<Option> = [];

    for (const key in (<any>option).keys) {

        const subOption: Option = (<any>option).keys[key];

        allSubOptions.push(subOption);

        if ('keys' in subOption) {

            const opts: Array<Option> = getAllSubOptions(subOption);

            allSubOptions = allSubOptions.concat(opts);
        }
    }

    return allSubOptions;
}
