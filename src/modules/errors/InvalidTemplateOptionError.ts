/**
 * @description
 * The error thrown when a template uses an option templates can't have.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a template uses an option templates can't have.
 */
export default class InvalidTemplateOptionError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidTemplateOptionError";


  /**
   * @description
   * Constructs the error.
   *
   * @param option The offending option name.
   */
  constructor(option: string) {
    super(option.length > 0 ? `“${option}” is not a valid option to use in templates` : "", "A template has an invalid option");
  }
}
