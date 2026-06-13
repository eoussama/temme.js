/**
 * @description
 * The "temmeIds" option model — stores the internal path identifiers for a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `temmeIds` option, which tracks the internal ID trail through the hierarchy tree.
 */
export default class TemmeIdsOption extends Option {
  /**
   * @description
   * Constructs a TemmeIdsOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("temmeIds", "array", [], []);
  }


  /**
   * @description
   * No-op — temmeIds are assigned by the idfier module, not inherited.
   *
   * @param _hierarchy The hierarchy object that inherits.
   * @param _temmeIds The temmeIds value to inherit.
   * @returns {void}
   */
  public inherit(_hierarchy: Hierarchy, _temmeIds: unknown): void {}


  /**
   * @description
   * Not applicable — returns `null` for any element.
   *
   * @param _element The HTML element to target.
   * @returns {null} Always `null`.
   */
  public getKeyFromElement = (_element: HTMLElement): unknown => null;
}
