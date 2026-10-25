/**
 * @description
 * The registry of all supported hierarchy options.
 */


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
 * The option labels that are not permitted inside template hierarchies.
 */
export const forbiddenOptions: ReadonlyArray<string> = ["name", "childNodes", "templates"];


/**
 * @description
 * The lazily created option instances; built on first use so that importing
 * this module has no side effects.
 */
let registry: ReadonlyArray<Option> | undefined;


/**
 * @description
 * Returns the ordered list of all recognised hierarchy options.
 * The order is the order in which options are sanitized and rendered.
 *
 * @returns {ReadonlyArray<Option>} The option instances.
 */
export function getOptions(): ReadonlyArray<Option> {
  registry ??= [
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

  return registry;
}


/**
 * @description
 * Finds a top-level option by its label.
 *
 * @param label The option label.
 * @returns {Option | undefined} The matching option, if any.
 */
export function findOption(label: string): Option | undefined {
  return getOptions().find((option: Option) => option.label === label);
}
