/**
 * @description
 * The "mode" sub-option model for the `from` option.
 */


import type { Hierarchy } from "../../models/Hierarchy";
import Option from "../../models/Option";



/**
 * @description
 * Defines the inheritance mode ("append" | "override") for the `from` option.
 */
export default class ModeSubOption extends Option {
  /**
   * @description
   * Constructs a ModeSubOption with its default metadata.
   * The default mode is "append" — inherited values are merged with existing ones.
   *
   * @returns {void}
   */
  constructor() {
    super("mode", "string", ["append", "override"], "append");
  }


  /**
   * @description
   * No-op — the inheritance mode is not itself inherited.
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
