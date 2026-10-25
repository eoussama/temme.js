/**
 * @description
 * The error thrown when a target is not a valid HTML element.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a target is not a valid HTML element.
 */
export default class InvalidTargetError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidTargetError";


  /**
   * @description
   * Constructs the error.
   *
   * @param message The message of the error; a generic one is used when empty.
   * @param options The standard error options, e.g. the `cause`.
   */
  constructor(message: string, options?: ErrorOptions) {
    super(message, "The target is not a valid HTML element", options);
  }
}
