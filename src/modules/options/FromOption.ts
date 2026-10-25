/**
 * @description
 * The "from" option model — defines the referencing and inheritance configuration.
 */


import Option from "../models/Option";
import RefOption from "./RefOption";
import ChildrenSubOption from "./sub-options/ChildrenSubOption";
import ExcludeSubOption from "./sub-options/ExcludeSubOption";
import IncludeSubOption from "./sub-options/IncludeSubOption";
import ModeSubOption from "./sub-options/ModeSubOption";



/**
 * @description
 * Defines the `from` option, which controls how a hierarchy element inherits
 * properties from another referenced element.
 */
export default class FromOption extends Option {
  /**
   * @description
   * Constructs a FromOption with its sub-options.
   */
  constructor() {
    super("from", "object", [], undefined, {
      ref: new RefOption(),
      mode: new ModeSubOption(),
      children: new ChildrenSubOption(),
      include: new IncludeSubOption(),
      exclude: new ExcludeSubOption(),
    });
  }
}
