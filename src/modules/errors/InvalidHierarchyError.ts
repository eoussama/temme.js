/**
 * @description
 * The error thrown when a hierarchy is not a valid plain object.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a hierarchy is not a valid plain object.
 */
export default class InvalidHierarchyError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidHierarchyError";


  /**
   * @description
   * Constructs the error.
   *
   * @param message The message of the error; a generic one is used when empty.
   * @param options The standard error options, e.g. the `cause`.
   */
  constructor(message: string, options?: ErrorOptions) {
    super(message, "The hierarchy object is not valid", options);
  }
}
