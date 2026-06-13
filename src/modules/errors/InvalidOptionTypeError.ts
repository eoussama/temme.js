/**
 * @description
 * The error thrown when an option value has an unexpected data type.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * Signals that a hierarchy option was supplied with a value of the wrong type.
 */
export default class InvalidOptionTypeError extends TemmyError {
  /** The name of this error class. */
  public name: string = "InvalidOptionTypeError";

  /** The default human-readable message. */
  public message: string = "An option doesn't have a valid value type";


  /**
   * @description
   * Constructs an InvalidOptionTypeError for the given option and detected type.
   *
   * @param option The name of the invalid option.
   * @param type The detected (invalid) type string.
   * @returns {void}
   */
  constructor(option: string, type: string) {
    super("");

    const message: string = `The "${option}" option doesn't accept values of type "${type}"`;

    this.message = option.length > 0 ? message : this.message;
  }
}
