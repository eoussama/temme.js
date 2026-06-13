/**
 * @description
 * The "include" sub-option model for the `from` option.
 */


import type { Hierarchy } from "../../models/Hierarchy";
import Option from "../../models/Option";



/** The option labels that can participate in inheritance. */
const INHERITABLE: Array<string> = [
  "name",
  "id",
  "classes",
  "attributes",
  "dataset",
  "content",
  "childNodes",
];


/**
 * @description
 * Specifies which option keys should be included during inheritance.
 * Defaults to all inheritable options when the user does not specify an explicit list.
 */
export default class IncludeSubOption extends Option {
  /**
   * @description
   * Constructs an IncludeSubOption with the full list of inheritable options as default.
   *
   * @returns {void}
   */
  constructor() {
    super("include", "array", INHERITABLE, [...INHERITABLE]);
  }


  /**
   * @description
   * No-op — the include list is not directly inherited.
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
