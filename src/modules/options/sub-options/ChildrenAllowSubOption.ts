/**
 * @description
 * The "allow" sub-option for the `children` sub-option of `from`.
 */


import type { Hierarchy } from "../../models/Hierarchy";
import Option from "../../models/Option";



/**
 * @description
 * Defines whether child nodes are included when inheriting from a referenced hierarchy.
 */
export default class ChildrenAllowSubOption extends Option {
  /**
   * @description
   * Constructs a ChildrenAllowSubOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("allow", "boolean", [], false);
  }


  /**
   * @description
   * No-op — the "allow" flag is not directly inherited onto a hierarchy.
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
