/**
 * @description
 * The "value" sub-option model for the `content` option.
 */


import type { Hierarchy } from "../../models/Hierarchy";
import Option from "../../models/Option";



/**
 * @description
 * Holds the actual content string value for an element's `content` option.
 */
export default class ValueSubOption extends Option {
  /**
   * @description
   * Constructs a ValueSubOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("value", "string", [], "");
  }


  /**
   * @description
   * No-op — the content value is handled by the parent `content` option logic.
   *
   * @param _hierarchy The hierarchy object that inherits.
   * @param _value The value to inherit.
   * @returns {void}
   */
  public inherit(_hierarchy: Hierarchy, _value: unknown): void {}


  /**
   * @description
   * Not applicable — returns `null` for any element.
   *
   * @param _element The HTML element to target.
   * @returns {null} Always `null`.
   */
  public getKeyFromElement = (_element: HTMLElement): unknown => null;
}
