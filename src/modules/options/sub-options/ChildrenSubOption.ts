/**
 * @description
 * The "children" sub-option model for the `from` option.
 */


import type { Hierarchy } from "../../models/Hierarchy";
import type { IKeys } from "../../models/Option";
import Option from "../../models/Option";
import ChildrenAllowSubOption from "./ChildrenAllowSubOption";
import PlacementSubOption from "./PlacementSubOption";



/**
 * @description
 * Defines the child-node inheritance behaviour inside the `from` option.
 */
export default class ChildrenSubOption extends Option implements IKeys {
  /**
   * @description
   * The keys of the `children` sub-option.
   */
  public keys: FromChildrenKeys = {
    allow: new ChildrenAllowSubOption(),
    placement: new PlacementSubOption(),
  };


  /**
   * @description
   * Constructs a ChildrenSubOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("children", "object", [], {
      allow: (new ChildrenAllowSubOption()).default,
      placement: (new PlacementSubOption()).default,
    });
  }


  /**
   * @description
   * No-op — children inheritance is handled by the parent `from` option logic.
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


/**
 * @description
 * The key shape for the `children` sub-option.
 */
type FromChildrenKeys = {

  /** Whether child nodes should be inherited. */
  allow: ChildrenAllowSubOption;

  /** Where to place the inherited children. */
  placement: PlacementSubOption;
};
