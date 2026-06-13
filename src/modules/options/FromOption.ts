/**
 * @description
 * The "from" option model — defines the referencing and inheritance configuration.
 */


import type { Hierarchy } from "../models/Hierarchy";
import type { IKeys } from "../models/Option";
import Option from "../models/Option";
import RefOption from "./RefOption";
import ChildrenSubOption from "./sub-options/ChildrenSubOption";
import ExcludeSubOption from "./sub-options/ExcludeSubOption";
import IncludeSubOption from "./sub-options/IncludeSubOption";
import ModeSubOption from "./sub-options/ModeSubOption";



/**
 * @description
 * Defines the `from` option, which controls how a hierarchy element inherits
 * properties from another referenced element.
 */
export default class FromOption extends Option implements IKeys {
  /**
   * @description
   * The sub-options of the `from` option.
   */
  public keys: FromKeys = {
    ref: new RefOption(),
    mode: new ModeSubOption(),
    children: new ChildrenSubOption(),
    include: new IncludeSubOption(),
    exclude: new ExcludeSubOption(),
  };


  /**
   * @description
   * Constructs a FromOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("from", "object", [], {
      ref: (new RefOption()).default,
      mode: (new ModeSubOption()).default,
      children: (new ChildrenSubOption()).default,
      include: (new IncludeSubOption()).default,
      exclude: (new ExcludeSubOption()).default,
    });
  }


  /**
   * @description
   * No-op — the `from` configuration is not inherited from other elements.
   *
   * @param _hierarchy The hierarchy object that inherits.
   * @param _from The from value to inherit.
   * @returns {void}
   */
  public inherit(_hierarchy: Hierarchy, _from: unknown): void {}


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
 * The key shape for the `from` option.
 */
type FromKeys = {

  /** The reference key sub-option. */
  ref: RefOption;

  /** The inheritance mode sub-option. */
  mode: ModeSubOption;

  /** The children inheritance sub-option. */
  children: ChildrenSubOption;

  /** The include list sub-option. */
  include: IncludeSubOption;

  /** The exclude list sub-option. */
  exclude: ExcludeSubOption;
};
