/**
 * @description
 * The "children" sub-option model for the `from` option.
 */


import Option from "../../models/Option";
import ChildrenAllowSubOption from "./ChildrenAllowSubOption";
import PlacementSubOption from "./PlacementSubOption";



/**
 * @description
 * Defines the child-node inheritance behaviour inside the `from` option.
 */
export default class ChildrenSubOption extends Option {
  /**
   * @description
   * Constructs a ChildrenSubOption with its `allow` and `placement` sub-options.
   */
  constructor() {
    super("children", "object", [], undefined, {
      allow: new ChildrenAllowSubOption(),
      placement: new PlacementSubOption(),
    });
  }
}
