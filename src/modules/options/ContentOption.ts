/**
 * @description
 * The "content" option model — manages the text or HTML content of a hierarchy element.
 */


import type { Content, Hierarchy } from "../models/Hierarchy";
import type { IKeys, IParser } from "../models/Option";
import Option from "../models/Option";
import ContentTypeSubOption from "./sub-options/ContentTypeSubOption";
import ValueSubOption from "./sub-options/ValueSubOption";



/**
 * @description
 * Defines the `content` option, which controls the inner text or HTML of an element.
 */
export default class ContentOption extends Option implements IKeys, IParser {
  /**
   * @description
   * The sub-options for the `content` option.
   */
  public keys: ContentKeys = {
    type: new ContentTypeSubOption(),
    value: new ValueSubOption(),
  };


  /**
   * @description
   * Constructs a ContentOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("content", "object", [], {
      type: (new ContentTypeSubOption()).default,
      value: (new ValueSubOption()).default,
    }, true);
  }


  /**
   * @description
   * Inherits the content object from a referenced hierarchy.
   * In "append" mode the incoming value is concatenated onto the existing one.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param content The content object to inherit.
   * @returns {void}
   */
  public inherit(hierarchy: Hierarchy, content: unknown): void {
    const incoming = content as Content;
    let ct: string = incoming.value;

    if (incoming.value !== "") {
      if (hierarchy.from.mode === "append") {
        ct = `${hierarchy.content.value}${ct.length > 0 ? " " : ""}${ct}`;
      }
      else {
        hierarchy.content = incoming;
      }

      hierarchy.content.value = ct;
    }
  }


  /**
   * @description
   * Extracts the content from an existing HTML element as an HTML content object.
   *
   * @param element The HTML element to read content from.
   * @returns {Content} The content object with type "html" and the element's innerHTML.
   */
  public getKeyFromElement(element: HTMLElement): unknown {
    return {
      type: "html",
      value: element.innerHTML,
    };
  }


  /**
   * @description
   * Applies the content to the target HTML element.
   *
   * @param element The HTML element to set content on.
   * @param hierarchy The hierarchy object supplying the content.
   * @returns {void}
   */
  public parse(element: HTMLElement, hierarchy: Hierarchy): void {
    if (hierarchy.content.value !== "") {
      if (hierarchy.content.type === "text") {
        element.textContent = hierarchy.content.value;
      }
      else {
        element.innerHTML = hierarchy.content.value;
      }
    }
  }
}


/**
 * @description
 * The key shape for the `content` option.
 */
type ContentKeys = {

  /** The content type sub-option. */
  type: ContentTypeSubOption;

  /** The content value sub-option. */
  value: ValueSubOption;
};
