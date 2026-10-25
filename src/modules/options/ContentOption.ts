/**
 * @description
 * The "content" option model — manages the text or HTML content of a hierarchy element.
 */


import type { Content, Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";
import ContentTypeSubOption from "./sub-options/ContentTypeSubOption";
import ValueSubOption from "./sub-options/ValueSubOption";



/**
 * @description
 * Defines the `content` option, which controls the inner text or HTML of an element.
 */
export default class ContentOption extends Option {
  /**
   * @description
   * Constructs a ContentOption with its `type` and `value` sub-options.
   */
  constructor() {
    super("content", "object", [], undefined, {
      type: new ContentTypeSubOption(),
      value: new ValueSubOption(),
    });
  }


  /**
   * @description
   * Inherits non-empty content. In "append" mode the incoming value is appended after the
   * existing one (separated by a space) and the existing type is kept; empty existing content
   * simply takes the incoming content. Otherwise the incoming content replaces it.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param content The content object to inherit.
   * @returns {void}
   */
  public override inherit(hierarchy: Hierarchy, content: unknown): void {
    const incoming = content as Content;

    if (incoming.value === "") {
      return;
    }

    if (hierarchy.from.mode === "append" && hierarchy.content.value !== "") {
      hierarchy.content = { ...hierarchy.content, value: `${hierarchy.content.value} ${incoming.value}` };
    }
    else {
      hierarchy.content = { ...incoming };
    }
  }


  /**
   * @description
   * Reads the content of an outer element as HTML.
   *
   * @param element The HTML element to read content from.
   * @returns {Content} The element's inner HTML as a content object.
   */
  public override getKeyFromElement(element: Element): unknown {
    return { type: "html", value: element.innerHTML };
  }


  /**
   * @description
   * Applies non-empty content to the target HTML element.
   *
   * @param element The HTML element to set content on.
   * @param hierarchy The hierarchy object supplying the content.
   * @returns {void}
   */
  public override parse(element: HTMLElement, hierarchy: Hierarchy): void {
    if (hierarchy.content.value === "") {
      return;
    }

    if (hierarchy.content.type === "text") {
      element.textContent = hierarchy.content.value;
    }
    else {
      element.innerHTML = hierarchy.content.value;
    }
  }
}
