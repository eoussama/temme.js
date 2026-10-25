/**
 * @description
 * The "name" option model — defines the HTML tag name of a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `name` option, which sets the HTML element tag (e.g. "div", "span").
 */
export default class NameOption extends Option {
  /**
   * @description
   * Constructs a NameOption with its default metadata.
   */
  constructor() {
    super("name", "string", [], "div");
  }


  /**
   * @description
   * Inherits the tag name from a referenced hierarchy, in "override" mode only.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param name The tag name to inherit.
   * @returns {void}
   */
  public override inherit(hierarchy: Hierarchy, name: unknown): void {
    if (hierarchy.from.mode === "override") {
      hierarchy.name = name as string;
    }
  }
}
