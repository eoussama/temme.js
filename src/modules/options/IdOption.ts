/**
 * @description
 * The "id" option model — manages the HTML element id attribute.
 */


import type { Hierarchy } from "../models/Hierarchy";
import type { IParser } from "../models/Option";
import Option from "../models/Option";



/**
 * @description
 * Defines the `id` option, which sets or inherits the HTML element's id attribute.
 */
export default class IdOption extends Option implements IParser {
  /**
   * @description
   * Constructs an IdOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("id", "string", [], "", true);
  }


  /**
   * @description
   * Inherits the id from a referenced hierarchy.
   * In "append" mode the id is only applied when the current element has none.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param id The id value to inherit.
   * @returns {void}
   */
  public inherit(hierarchy: Hierarchy, id: unknown): void {
    if (id !== "") {
      if (hierarchy.from.mode === "append") {
        if (hierarchy.id === "") {
          hierarchy.id = id as string;
        }
      }
      else {
        hierarchy.id = id as string;
      }
    }
  }


  /**
   * @description
   * Extracts the id from an existing HTML element.
   *
   * @param element The HTML element to read the id from.
   * @returns {string} The element's id attribute value.
   */
  public getKeyFromElement = (element: HTMLElement): unknown => element.id;


  /**
   * @description
   * Applies the id to the target HTML element.
   *
   * @param element The HTML element to set the id on.
   * @param hierarchy The hierarchy object supplying the id value.
   * @returns {void}
   */
  public parse(element: HTMLElement, hierarchy: Hierarchy): void {
    if (hierarchy.id !== "") {
      element.id = hierarchy.id;
    }
  }
}
