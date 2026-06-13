/**
 * @description
 * The registry of all supported hierarchy options.
 */


import type { IKeys } from "./models/Option";
import type Option from "./models/Option";
import AttributesOption from "./options/AttributesOption";
import ChildNodesOption from "./options/ChildrenNodesOption";
import ClassesOption from "./options/ClassesOption";
import ContentOption from "./options/ContentOption";
import DatasetOption from "./options/DatasetOption";
import FromOption from "./options/FromOption";
import IdOption from "./options/IdOption";
import NameOption from "./options/NameOption";
import RefOption from "./options/RefOption";
import TemmeIdsOption from "./options/TemmeIdsOption";
import TemplatesOption from "./options/TemplatesOption";



/**
 * @description
 * The global ordered list of all recognised hierarchy options.
 */
export const options: Array<Option> = [
  new RefOption(),
  new NameOption(),
  new IdOption(),
  new ContentOption(),
  new TemmeIdsOption(),
  new TemplatesOption(),
  new ClassesOption(),
  new ChildNodesOption(),
  new AttributesOption(),
  new DatasetOption(),
  new FromOption(),
];


/**
 * @description
 * The flat list of all options and their sub-options combined.
 */
export const allOptions = getAllOptions();


/**
 * @description
 * The option labels that are not permitted inside template hierarchies.
 */
export const forbiddenOptions: Array<string> = ["name", "childNodes", "templates"];


/**
 * @description
 * Returns all direct sub-options of the option identified by the given label.
 *
 * @param option The parent option's label.
 * @returns {Array<Option>} The list of matching sub-option instances.
 */
export function getSubOptions(option: string): Array<Option> {
  const subOptions: Array<Option> = [];

  allOptions.forEach((opt: Option) => {
    if ("keys" in opt && opt.label === option) {
      for (const key in (opt as unknown as IKeys).keys) {
        subOptions.push((opt as unknown as IKeys).keys[key]);
      }
    }
  });

  return subOptions;
}


/**
 * @description
 * Builds a flat array of every option and all of its nested sub-options.
 *
 * @returns {Array<Option>} All options and sub-options in registration order.
 */
function getAllOptions(): Array<Option> {
  let all: Array<Option> = [];

  options.forEach((opt: Option) => {
    all.push(opt);

    if ("keys" in opt) {
      all = all.concat(getAllSubOptions(opt));
    }
  });

  return all;
}


/**
 * @description
 * Recursively collects all sub-options (and their own sub-options) of a given option.
 *
 * @param option The option to collect sub-options from.
 * @returns {Array<Option>} All nested sub-option instances.
 */
function getAllSubOptions(option: Option): Array<Option> {
  let allSubOptions: Array<Option> = [];

  for (const key in (option as unknown as IKeys).keys) {
    const subOption: Option = (option as unknown as IKeys).keys[key];

    allSubOptions.push(subOption);

    if ("keys" in subOption) {
      allSubOptions = allSubOptions.concat(getAllSubOptions(subOption));
    }
  }

  return allSubOptions;
}
