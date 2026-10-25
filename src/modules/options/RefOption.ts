/**
 * @description
 * The "ref" option model — stores the reference key of a hierarchy element.
 */


import Option from "../models/Option";



/**
 * @description
 * Defines the `ref` option, which identifies a hierarchy element for later referencing.
 */
export default class RefOption extends Option {
  /**
   * @description
   * Constructs a RefOption with its default metadata.
   */
  constructor() {
    super("ref", "string", [], "");
  }
}
