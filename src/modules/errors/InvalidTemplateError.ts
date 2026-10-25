/**
 * @description
 * The error thrown when a template does not have a `ref` option.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a template does not have a `ref` option.
 */
export default class InvalidTemplateError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidTemplateError";


  /**
   * @description
   * Constructs the error.
   *
   * @param message The message of the error; a generic one is used when empty.
   * @param options The standard error options, e.g. the `cause`.
   */
  constructor(message: string, options?: ErrorOptions) {
    super(message, "A template does not have a “ref” option", options);
  }
}
