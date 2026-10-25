/**
 * @description
 * The "classes" option model — manages the CSS class list of a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";
import { uniqueSorted } from "../utils";



/**
 * @description
 * Defines the `classes` option, which sets or inherits the element's CSS class list.
 */
export default class ClassesOption extends Option {
  /**
   * @description
   * Constructs a ClassesOption with its default metadata.
   */
  constructor() {
    super("classes", "array", [], []);
  }


  /**
   * @description
   * Inherits CSS classes. In "append" mode they are merged with the existing ones,
   * otherwise they replace them. The result is de-duplicated and sorted.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param classes The class list to inherit.
   * @returns {void}
   */
  public override inherit(hierarchy: Hierarchy, classes: unknown): void {
    const incoming = classes as Array<string>;
    const merged = hierarchy.from.mode === "append" ? [...hierarchy.classes, ...incoming] : incoming;

    hierarchy.classes = uniqueSorted(merged);
  }


  /**
   * @description
   * Reads the class list of an outer element.
   *
   * @param element The HTML element to read classes from.
   * @returns {Array<string>} The element's class names.
   */
  public override getKeyFromElement(element: Element): unknown {
    return [...element.classList];
  }


  /**
   * @description
   * Applies the class list to the target HTML element.
   *
   * @param element The HTML element to add classes to.
   * @param hierarchy The hierarchy object supplying the class list.
   * @returns {void}
   */
  public override parse(element: HTMLElement, hierarchy: Hierarchy): void {
    // Some DOM implementations create an empty `class` attribute when adding no class.
    if (hierarchy.classes.length > 0) {
      element.classList.add(...hierarchy.classes);
    }
  }
}
