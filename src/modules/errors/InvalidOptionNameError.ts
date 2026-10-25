/**
 * @description
 * The error thrown when an option is not recognised.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when an option is not recognised.
 */
export default class InvalidOptionNameError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidOptionNameError";


  /**
   * @description
   * Constructs the error.
   *
   * @param option The offending option name.
   */
  constructor(option: string) {
    super(option.length > 0 ? `“${option}” is not a valid option` : "", "An option is not valid");
  }
}
