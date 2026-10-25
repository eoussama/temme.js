/**
 * @description
 * The error thrown when a sub-option is not recognised.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a sub-option is not recognised.
 */
export default class InvalidSubOptionNameError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidSubOptionNameError";


  /**
   * @description
   * Constructs the error.
   *
   * @param option The offending option name.
   * @param subOption The offending sub-option name.
   */
  constructor(option: string, subOption: string) {
    super(option.length > 0 || subOption.length > 0 ? `The “${option}” option doesn't recognize “${subOption}” as a valid sub-option` : "", "A sub-option is not valid");
  }
}
