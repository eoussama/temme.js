/**
 * @description
 * The "mode" sub-option model for the `from` option.
 */


import Option from "../../models/Option";



/**
 * @description
 * Defines the inheritance mode ("append" | "override") for the `from` option.
 */
export default class ModeSubOption extends Option {
  /**
   * @description
   * Constructs a ModeSubOption with its default metadata.
   */
  constructor() {
    super("mode", "string", ["append", "override"], "append");
  }
}
