/**
 * @description
 * The "attributes" option model — manages the HTML attribute map of a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import type { IParser } from "../models/Option";
import Option from "../models/Option";



/**
 * @description
 * Defines the `attributes` option, which sets or inherits an element's HTML attributes.
 */
export default class AttributesOption extends Option implements IParser {
  /**
   * @description
   * Constructs an AttributesOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("attributes", "object", [], {}, true);
  }


  /**
   * @description
   * Inherits attributes from a referenced hierarchy.
   * In "append" mode existing attributes take precedence; otherwise the incoming ones do.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param attributes The attribute map to inherit.
   * @returns {void}
   */
  public inherit(hierarchy: Hierarchy, attributes: unknown): void {
    const incoming = attributes as Record<string, string>;
    const merged: Record<string, string> = { ...incoming };

    if (hierarchy.from.mode === "append") {
      for (const attrKey in hierarchy.attributes) {
        merged[attrKey] = hierarchy.attributes[attrKey];
      }
    }
    else {
      for (const attrKey in hierarchy.attributes) {
        if (!(attrKey in merged)) {
          merged[attrKey] = hierarchy.attributes[attrKey];
        }
      }
    }

    hierarchy.attributes = merged;
  }


  /**
   * @description
   * Extracts the attribute map from an existing HTML element.
   * Excludes `id`, `class`, and `data-*` attributes.
   *
   * @param element The HTML element to read attributes from.
   * @returns {Record<string, string>} A map of attribute names to values.
   */
  public getKeyFromElement(element: HTMLElement): unknown {
    const attrs: Record<string, string> = {};

    for (const attrKey in element.attributes) {
      const attr = element.attributes[attrKey as unknown as number];

      if (
        !Number.isNaN(Number.parseInt(attrKey))
        && !["id", "class"].includes(attr.nodeName)
        && !attr.nodeName.startsWith("data-")
      ) {
        attrs[attr.nodeName] = attr.nodeValue ?? "";
      }
    }

    return attrs;
  }


  /**
   * @description
   * Applies the attribute map to the target HTML element.
   *
   * @param element The HTML element to set attributes on.
   * @param hierarchy The hierarchy object supplying the attributes.
   * @returns {void}
   */
  public parse(element: HTMLElement, hierarchy: Hierarchy): void {
    for (const attrKey in hierarchy.attributes) {
      element.setAttribute(attrKey, hierarchy.attributes[attrKey]);
    }
  }
}
