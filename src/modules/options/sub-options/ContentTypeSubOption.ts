/**
 * @description
 * The "type" sub-option model for the `content` option.
 */


import Option from "../../models/Option";



/**
 * @description
 * Defines the content type ("text" | "html") for an element's content option.
 */
export default class ContentTypeSubOption extends Option {
  /**
   * @description
   * Constructs a ContentTypeSubOption with its default metadata.
   */
  constructor() {
    super("type", "string", ["text", "html"], "text");
  }
}
