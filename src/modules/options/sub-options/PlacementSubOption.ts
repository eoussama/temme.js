/**
 * @description
 * The "placement" sub-option model for the `children` sub-option of `from`.
 */


import Option from "../../models/Option";



/**
 * @description
 * Defines where inherited child nodes are placed ("before" | "after").
 */
export default class PlacementSubOption extends Option {
  /**
   * @description
   * Constructs a PlacementSubOption with its default metadata.
   */
  constructor() {
    super("placement", "string", ["before", "after"], "after");
  }
}
