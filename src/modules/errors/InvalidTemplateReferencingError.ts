/**
 * @description
 * The error thrown when a template references a non-template object.
 */


import TemmyError from "../models/TemmyError";



/**
 * @description
 * The error thrown when a template references a non-template object.
 */
export default class InvalidTemplateReferencingError extends TemmyError {
  /** The name of the error. */
  public override readonly name: string = "InvalidTemplateReferencingError";


  /**
   * @description
   * Constructs the error.
   *
   * @param ref The template reference.
   * @param target The referenced key.
   */
  constructor(ref: string, target: string) {
    super(ref.length > 0 ? `The template with the reference “${ref}” is trying to reference “${target}” a non-template object` : "", "Templates can only reference other templates.");
  }
}
