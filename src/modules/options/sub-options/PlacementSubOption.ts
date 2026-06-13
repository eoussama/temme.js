/**
 * @description
 * The "placement" sub-option model for the `children` sub-option of `from`.
 */


import type { Hierarchy } from "../../models/Hierarchy";
import Option from "../../models/Option";



/**
 * @description
 * Defines where inherited child nodes are placed ("before" | "after").
 */
export default class PlacementSubOption extends Option {
  /**
   * @description
   * Constructs a PlacementSubOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("placement", "string", ["before", "after"], "after");
  }


  /**
   * @description
   * No-op — the placement value is not directly inherited.
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
