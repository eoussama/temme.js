/**
 * @description
 * The "id" option model — manages the HTML element id attribute.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `id` option, which sets or inherits the HTML element's id attribute.
 */
export default class IdOption extends Option {
  /**
   * @description
   * Constructs an IdOption with its default metadata.
   */
  constructor() {
    super("id", "string", [], "");
  }


  /**
   * @description
   * Inherits a non-empty id. In "append" mode an existing id is kept.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param id The id to inherit.
   * @returns {void}
   */
  public override inherit(hierarchy: Hierarchy, id: unknown): void {
    if (id !== "" && (hierarchy.from.mode === "override" || hierarchy.id === "")) {
      hierarchy.id = id as string;
    }
  }


  /**
   * @description
   * Reads the id of an outer element.
   *
   * @param element The HTML element to read from.
   * @returns {string} The element's id.
   */
  public override getKeyFromElement(element: Element): unknown {
    return element.id;
  }


  /**
   * @description
   * Applies a non-empty id to the target HTML element.
   *
   * @param element The HTML element to set the id on.
   * @param hierarchy The hierarchy object supplying the id.
   * @returns {void}
   */
  public override parse(element: HTMLElement, hierarchy: Hierarchy): void {
    if (hierarchy.id !== "") {
      element.id = hierarchy.id;
    }
  }
}
