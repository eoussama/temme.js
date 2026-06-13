/**
 * @description
 * The "exclude" sub-option model for the `from` option.
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
 * Specifies which option keys should be excluded from inheritance.
 * Defaults to an empty list (nothing excluded) when the user does not specify an explicit list.
 */
export default class ExcludeSubOption extends Option {
  /**
   * @description
   * Constructs an ExcludeSubOption with an empty default (exclude nothing by default).
   *
   * @returns {void}
   */
  constructor() {
    super("exclude", "array", INHERITABLE, []);
  }


  /**
   * @description
   * No-op — the exclude list is not directly inherited.
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
