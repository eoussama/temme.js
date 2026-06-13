/**
 * The children sub option model.
 */


import type { IKeys } from "../../models/Option";
import Option from "../../models/Option";
import ChildrenAllowSubOption from "./ChildrenAllowSubOption";
import PlacementSubOption from "./PlacementSubOption";



/**
 * The children sub option class
 * of the from option.
 */
export default class ChildrenSubOption extends Option implements IKeys {
  /**
   * The keys of the `children` sub option.
   */
  public keys: FromChildrenKeys = {
    allow: new ChildrenAllowSubOption(),
    placement: new PlacementSubOption(),
  };

  /**
   * Parameterless constructor.
   */
  constructor() {
    super("children", "object", [], {
      allow: (new ChildrenAllowSubOption()).default,
      placement: (new PlacementSubOption()).default,
    });
  }

  /**
   * Performs inheritance process on an option.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param value The value to inherit.
   */
  public inherit(hierarchy: any, value: any): void { }


  /**
   * Gets nothing from a given HTML element.
   *
   * @param element The HTML element to target.
   */
  public getKeyFromElement = (element: HTMLElement): any => null;
}


/**
 * The FromChildrenKeys type.
 */
type FromChildrenKeys = {

  /**
   * Whether or not to allow children inheritance.
   */
  allow: ChildrenAllowSubOption;

  /**
   * The inheritance mode.
   */
  placement: PlacementSubOption;
};
