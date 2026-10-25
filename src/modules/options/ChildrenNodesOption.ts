/**
 * @description
 * The "childNodes" option model — holds the child hierarchies of a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `childNodes` option, which lists (and can inherit) an element's children.
 * Children are never read from outer elements, as DOM nodes do not map to hierarchies.
 */
export default class ChildNodesOption extends Option {
  /**
   * @description
   * Constructs a ChildNodesOption with its default metadata.
   */
  constructor() {
    super("childNodes", "array", [], []);
  }


  /**
   * @description
   * Inherits child nodes when `from.children.allow` is set. In "append" mode they are placed
   * before or after the existing children (`from.children.placement`); otherwise they replace them.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param childNodes The (already copied) child hierarchies to inherit.
   * @returns {void}
   */
  public override inherit(hierarchy: Hierarchy, childNodes: unknown): void {
    const incoming = childNodes as Array<Hierarchy>;
    const { allow, placement } = hierarchy.from.children;

    if (!allow) {
      return;
    }

    if (hierarchy.from.mode === "override") {
      hierarchy.childNodes = incoming;
    }
    else {
      hierarchy.childNodes = placement === "before"
        ? [...incoming, ...hierarchy.childNodes]
        : [...hierarchy.childNodes, ...incoming];
    }
  }
}
