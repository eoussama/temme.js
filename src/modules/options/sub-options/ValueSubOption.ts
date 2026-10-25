/**
 * @description
 * The "value" sub-option model for the `content` option.
 */


import Option from "../../models/Option";



/**
 * @description
 * Holds the actual content string value for an element's `content` option.
 */
export default class ValueSubOption extends Option {
  /**
   * @description
   * Constructs a ValueSubOption with its default metadata.
   */
  constructor() {
    super("value", "string", [], "");
  }
}
