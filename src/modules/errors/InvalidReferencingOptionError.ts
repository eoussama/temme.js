/**
 * @description
 * The error thrown when a `from` option is not valid.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a `from` option is not valid.
 */
export default class InvalidReferencingOptionError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidReferencingOptionError";


  /**
   * @description
   * Constructs the error.
   *
   * @param message The message of the error; a generic one is used when empty.
   * @param options The standard error options, e.g. the `cause`.
   */
  constructor(message: string, options?: ErrorOptions) {
    super(message, "A referencing option is not valid", options);
  }
}
