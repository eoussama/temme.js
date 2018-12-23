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
import ChildrenOption from "./options/ChildrenOption";
import AttributesOption from "./options/AttributesOption";
import DatasetOption from "./options/DatasetOption";
import FromOption from "./options/FromOption";


export const options: Array<Option> = [
    new RefOption(),
    new NameOption(),
    new IdOption(),
    new ContentOption(),
    new TemmeIdsOption(),
    new TemplatesOption(),
    new ClassesOption(),
    new ChildrenOption(),
    new AttributesOption(),
    new DatasetOption(),
    new FromOption()
];


/**
 * Gets all the sub-options of an option.
 * 
 * @param option The parent option's name.
 */
export function getSubOptions(option: string): Array<Option> {

    const subOptions: Array<Option> = [];

    // Looping through all of the options.
    options.forEach((opt: Option) => {

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
