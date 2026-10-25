/**
 * @description
 * The "include" sub-option model for the `from` option.
 */


import type { InheritableOption } from "../../models/Hierarchy";
import Option from "../../models/Option";



/**
 * @description
 * The option labels that can participate in inheritance.
 */
export const INHERITABLE: ReadonlyArray<InheritableOption> = [
  "name",
  "id",
  "classes",
  "attributes",
  "dataset",
  "content",
  "childNodes",
];


/**
 * @description
 * Specifies which option keys should be included during inheritance.
 */
export default class IncludeSubOption extends Option {
  /**
   * @description
   * Constructs an IncludeSubOption with its default metadata.
   */
  constructor() {
    super("include", "array", INHERITABLE, [...INHERITABLE]);
  }
}
