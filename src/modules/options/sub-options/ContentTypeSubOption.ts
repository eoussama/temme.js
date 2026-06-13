/**
 * @description
 * The "type" sub-option model for the `content` option.
 */


import type { Hierarchy } from "../../models/Hierarchy";
import Option from "../../models/Option";



/**
 * @description
 * Defines the content type ("text" | "html") for an element's content option.
 */
export default class ContentTypeSubOption extends Option {
  /**
   * @description
   * Constructs a ContentTypeSubOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("type", "string", ["text", "html"], "text");
  }


  /**
   * @description
   * No-op — the content type is not directly inherited.
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
