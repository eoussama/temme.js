/**
 * @description
 * The error thrown when a sub-option value has an unexpected data type.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * Signals that a hierarchy sub-option was supplied with a value of the wrong type.
 */
export default class InvalidSubOptionTypeError extends TemmyError {
  /** The name of this error class. */
  public name: string = "InvalidSubOptionTypeError";

  /** The default human-readable message. */
  public message: string = "A sub-option doesn't have a valid value type";


  /**
   * @description
   * Constructs an InvalidSubOptionTypeError for the given sub-option and detected type.
   *
   * @param subOption The name of the invalid sub-option.
   * @param type The detected (invalid) type string.
   * @returns {void}
   */
  constructor(subOption: string, type: string) {
    super("");

    const message: string = `The "${subOption}" sub-option doesn't accept values of type "${type}"`;

    this.message = subOption.length > 0 || type.length > 0 ? message : this.message;
  }
}
