/**
 * @description
 * The error thrown when an option's value has the wrong type.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when an option's value has the wrong type.
 */
export default class InvalidOptionTypeError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidOptionTypeError";


  /**
   * @description
   * Constructs the error.
   *
   * @param option The offending option name.
   * @param type The offending value type.
   */
  constructor(option: string, type: string) {
    super(option.length > 0 ? `The "${option}" option doesn't accept values of type "${type}"` : "", "An option doesn't have a valid value type");
  }
}
