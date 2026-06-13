/**
 * @description
 * The "classes" option model — manages the CSS class list of a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import type { IParser } from "../models/Option";
import Option from "../models/Option";



/**
 * @description
 * Defines the `classes` option, which sets or inherits the element's CSS class list.
 */
export default class ClassesOption extends Option implements IParser {
  /**
   * @description
   * Constructs a ClassesOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("classes", "array", [], [], true);
  }


  /**
   * @description
   * Inherits CSS classes from a referenced hierarchy.
   * In "append" mode the incoming classes are merged; otherwise they replace existing ones.
   * Duplicates are removed and the list is sorted after merging.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param classes The class list to inherit.
   * @returns {void}
   */
  public inherit(hierarchy: Hierarchy, classes: unknown): void {
    const cls = classes as Array<string>;

    if (hierarchy.from.mode === "append") {
      hierarchy.classes.push(...cls);
    }
    else {
      hierarchy.classes = cls;
    }

    hierarchy.classes = hierarchy.classes.filter(
      (c: string, index: number) => hierarchy.classes.indexOf(c) === index,
    );

    hierarchy.classes.sort();
  }


  /**
   * @description
   * Extracts the CSS class list from an existing HTML element.
   *
   * @param element The HTML element to read classes from.
   * @returns {Array<string>} An array of class name strings.
   */
  public getKeyFromElement(element: HTMLElement): unknown {
    const classList: Array<string> = [];

    element.classList.forEach((cls: string) => classList.push(cls));

    return classList;
  }


  /**
   * @description
   * Applies the class list to the target HTML element.
   *
   * @param element The HTML element to add classes to.
   * @param hierarchy The hierarchy object supplying the class list.
   * @returns {void}
   */
  public parse(element: HTMLElement, hierarchy: Hierarchy): void {
    if (hierarchy.classes.length > 0) {
      element.classList.add(...hierarchy.classes);
    }
  }
}
