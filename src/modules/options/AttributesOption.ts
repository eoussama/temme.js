/**
 * @description
 * The "attributes" option model — manages the HTML attribute map of a hierarchy element.
 */


import type { AttributeValue, Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `attributes` option, which sets or inherits an element's HTML attributes.
 */
export default class AttributesOption extends Option {
  /**
   * @description
   * Constructs an AttributesOption with its default metadata.
   */
  constructor() {
    super("attributes", "object", [], {});
  }


  /**
   * @description
   * Inherits attributes. In "append" mode existing attributes win; otherwise incoming ones do.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param attributes The attribute map to inherit.
   * @returns {void}
   */
  public override inherit(hierarchy: Hierarchy, attributes: unknown): void {
    const incoming = attributes as Record<string, string>;

    hierarchy.attributes = hierarchy.from.mode === "append"
      ? { ...incoming, ...hierarchy.attributes }
      : { ...hierarchy.attributes, ...incoming };
  }


  /**
   * @description
   * Reads the attributes of an outer element, excluding `id`, `class` and `data-*`
   * (those are covered by their own options).
   *
   * @param element The HTML element to read attributes from.
   * @returns {Record<string, string>} A map of attribute names to values.
   */
  public override getKeyFromElement(element: Element): unknown {
    return Object.fromEntries(
      Array.from(element.attributes)
        .filter((attr: Attr) => attr.name !== "id" && attr.name !== "class" && !attr.name.startsWith("data-"))
        .map((attr: Attr) => [attr.name, attr.value]),
    );
  }


  /**
   * @description
   * Applies the attribute map to the target HTML element.
   *
   * @param element The HTML element to set attributes on.
   * @param hierarchy The hierarchy object supplying the attributes.
   * @returns {void}
   */
  public override parse(element: HTMLElement, hierarchy: Hierarchy): void {
    for (const [name, value] of Object.entries(hierarchy.attributes as Record<string, AttributeValue>)) {
      element.setAttribute(name, String(value));
    }
  }
}
