/**
 * @description
 * The error thrown when a sub-option's value is not allowed.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a sub-option's value is not allowed.
 */
export default class InvalidSubOptionValueError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidSubOptionValueError";


  /**
   * @description
   * Constructs the error.
   *
   * @param subOption The offending sub-option name.
   * @param value The offending value.
   */
  constructor(subOption: string, value: string) {
    super(subOption.length > 0 || value.length > 0 ? `The “${subOption}” sub-option doesn't accept “${value}” as a value` : "", "A sub-option doesn't have a valid value");
  }
}
