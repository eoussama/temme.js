/**
 * @description
 * The "templates" option model — holds the template hierarchy objects for a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `templates` option, which stores template sub-hierarchies used for inheritance.
 */
export default class TemplatesOption extends Option {
  /**
   * @description
   * Constructs a TemplatesOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("templates", "array", [], []);
  }


  /**
   * @description
   * No-op — templates are not inherited between elements.
   *
   * @param _hierarchy The hierarchy object that inherits.
   * @param _templates The templates value to inherit.
   * @returns {void}
   */
  public inherit(_hierarchy: Hierarchy, _templates: unknown): void {}


  /**
   * @description
   * Not applicable — returns `null` for any element.
   *
   * @param _element The HTML element to target.
   * @returns {null} Always `null`.
   */
  public getKeyFromElement = (_element: HTMLElement): unknown => null;
}
