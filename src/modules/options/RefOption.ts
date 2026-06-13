/**
 * @description
 * The "ref" option model — stores the reference key of a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `ref` option, which identifies a hierarchy element for later referencing.
 */
export default class RefOption extends Option {
  /**
   * @description
   * Constructs a RefOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("ref", "string", [], "");
  }


  /**
   * @description
   * No-op — the reference key is not inherited from other elements.
   *
   * @param _hierarchy The hierarchy object that inherits.
   * @param _ref The ref value to inherit.
   * @returns {void}
   */
  public inherit(_hierarchy: Hierarchy, _ref: unknown): void {}


  /**
   * @description
   * Not applicable — returns `null` for any element.
   *
   * @param _element The HTML element to target.
   * @returns {null} Always `null`.
   */
  public getKeyFromElement = (_element: HTMLElement): unknown => null;
}
