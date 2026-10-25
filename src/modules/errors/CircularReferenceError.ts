/**
 * @description
 * The error thrown when hierarchies (indirectly) inherit from themselves.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when hierarchies (indirectly) inherit from themselves.
 */
export default class CircularReferenceError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "CircularReferenceError";


  /**
   * @description
   * Constructs the error.
   *
   * @param reference The offending reference.
   */
  constructor(reference: string) {
    super(reference.length > 0 ? `The “${reference}” reference is part of a circular inheritance chain` : "", "A reference is part of a circular inheritance chain");
  }
}
