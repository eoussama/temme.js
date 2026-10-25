/**
 * @description
 * The "allow" sub-option for the `children` sub-option of `from`.
 */


import Option from "../../models/Option";



/**
 * @description
 * Defines whether child nodes are included when inheriting from a referenced hierarchy.
 */
export default class ChildrenAllowSubOption extends Option {
  /**
   * @description
   * Constructs a ChildrenAllowSubOption with its default metadata.
   */
  constructor() {
    super("allow", "boolean", [], false);
  }
}
