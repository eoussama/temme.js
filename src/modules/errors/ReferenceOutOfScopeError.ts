/**
 * @description
 * The error thrown when a hierarchy references an element out of its scope.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a hierarchy references an element out of its scope.
 */
export default class ReferenceOutOfScopeError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "ReferenceOutOfScopeError";


  /**
   * @description
   * Constructs the error.
   *
   * @param message The message of the error; a generic one is used when empty.
   * @param options The standard error options, e.g. the `cause`.
   */
  constructor(message: string, options?: ErrorOptions) {
    super(message, "An object is referencing an element out of its scope", options);
  }
}
