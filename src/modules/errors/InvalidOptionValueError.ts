/**
 * @description
 * The error thrown when an option's value is not allowed.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when an option's value is not allowed.
 */
export default class InvalidOptionValueError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidOptionValueError";


  /**
   * @description
   * Constructs the error.
   *
   * @param option The offending option name.
   * @param value The offending value.
   */
  constructor(option: string, value: string) {
    super(option.length > 0 ? `The “${option}” option doesn't accept “${value}” as a value` : "", "An option doesn't have a valid value");
  }
}
