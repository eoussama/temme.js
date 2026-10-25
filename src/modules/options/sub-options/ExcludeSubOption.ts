/**
 * @description
 * The "exclude" sub-option model for the `from` option.
 */


import Option from "../../models/Option";
import { INHERITABLE } from "./IncludeSubOption";



/**
 * @description
 * Specifies which option keys should be excluded from inheritance.
 */
export default class ExcludeSubOption extends Option {
  /**
   * @description
   * Constructs an ExcludeSubOption with its default metadata.
   */
  constructor() {
    super("exclude", "array", INHERITABLE, []);
  }
}
