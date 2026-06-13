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
   *
   * @returns {void}
   */
  constructor() {
    super("name", "string", [], "div", true);
  }


  /**
   * @description
   * Inherits the tag name from a referenced hierarchy when mode is "override".
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param name The tag name to inherit.
   * @returns {void}
   */
  public inherit(hierarchy: Hierarchy, name: unknown): void {
    if (name != null) {
      if (hierarchy.from.mode === "override") {
        hierarchy.name = name as string;
      }
    }
  }


  /**
   * @description
   * Not applicable for the name option — returns `null` for any element.
   *
   * @param _element The HTML element to target.
   * @returns {null} Always `null`.
   */
  public getKeyFromElement = (_element: HTMLElement): unknown => null;
}
