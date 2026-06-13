/**
 * @description
 * The "childNodes" option model — manages the child hierarchy list of an element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `childNodes` option, which sets or inherits the element's child hierarchy list.
 */
export default class ChildNodesOption extends Option {
  /**
   * @description
   * Constructs a ChildNodesOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("childNodes", "array", [], [], true);
  }


  /**
   * @description
   * Inherits child nodes from a referenced hierarchy.
   * Respects the `allow`, `mode`, and `placement` sub-options from `from.children`.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param childNodes The child node list to inherit.
   * @returns {void}
   */
  public inherit(hierarchy: Hierarchy, childNodes: unknown): void {
    const incoming = childNodes as Array<Hierarchy>;
    let children: Array<Hierarchy> = [...hierarchy.childNodes];

    if (hierarchy.from.children.allow === true) {
      if (hierarchy.from.mode === "append") {
        if (hierarchy.from.children.placement === "before") {
          children.unshift(...incoming);
        }
        else {
          children.push(...incoming);
        }
      }
      else {
        children = incoming;
      }
    }

    hierarchy.childNodes = children;
  }


  /**
   * @description
   * Not applicable — returns the innerHTML of the element rather than a proper child list.
   *
   * @param element The HTML element to read from.
   * @returns {string} The element's innerHTML.
   */
  public getKeyFromElement = (element: HTMLElement): unknown => element.innerHTML;
}
