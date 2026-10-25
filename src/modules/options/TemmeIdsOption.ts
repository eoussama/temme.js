/**
 * @description
 * The "temmeIds" option model — stores the internal path identifiers for a hierarchy element.
 */


import Option from "../models/Option";



/**
 * @description
 * Defines the `temmeIds` option, which tracks the internal ID trail through the hierarchy tree.
 */
export default class TemmeIdsOption extends Option {
  /**
   * @description
   * Constructs a TemmeIdsOption with its default metadata.
   */
  constructor() {
    super("temmeIds", "array", [], []);
  }
}
