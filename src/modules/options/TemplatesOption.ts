/**
 * @description
 * The "templates" option model — holds the template hierarchy objects for a hierarchy element.
 */


import Option from "../models/Option";



/**
 * @description
 * Defines the `templates` option, which stores template sub-hierarchies used for inheritance.
 */
export default class TemplatesOption extends Option {
  /**
   * @description
   * Constructs a TemplatesOption with its default metadata.
   */
  constructor() {
    super("templates", "array", [], []);
  }
}
