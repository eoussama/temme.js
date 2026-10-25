/**
 * @description
 * The error thrown when a sub-option's value has the wrong type.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a sub-option's value has the wrong type.
 */
export default class InvalidSubOptionTypeError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidSubOptionTypeError";


  /**
   * @description
   * Constructs the error.
   *
   * @param subOption The offending sub-option name.
   * @param type The offending value type.
   */
  constructor(subOption: string, type: string) {
    super(subOption.length > 0 || type.length > 0 ? `The "${subOption}" sub-option doesn't accept values of type "${type}"` : "", "A sub-option doesn't have a valid value type");
  }
}
