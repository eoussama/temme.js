/**
 * @description
 * The base class of every error Temme throws.
 */
export default class TemmyError extends Error {
  /** The name of the error. */
  public override readonly name: string = "TemmyError";


  /**
   * @description
   * Constructs a Temme error.
   *
   * @param message The message of the error; when empty, `fallback` is used instead.
   * @param fallback The generic message describing this kind of error.
   * @param options The standard error options, e.g. the `cause`.
   */
  constructor(message: string, fallback: string = "Temme isn't feeling good", options?: ErrorOptions) {
    super(message.length > 0 ? message : fallback, options);
  }
}
