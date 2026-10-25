/**
 * @description
 * The error thrown when a reference points to nothing.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a reference points to nothing.
 */
export default class InvalidReferenceError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidReferenceError";


  /**
   * @description
   * Constructs the error.
   *
   * @param reference The offending reference.
   */
  constructor(reference: string) {
    super(reference.length > 0 ? `“${reference}” is an invalid reference` : "", "A reference is invalid");
  }
}
