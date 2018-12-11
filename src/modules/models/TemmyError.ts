/**
 * Temme's custom errors.
 */
export default class TemmyError extends Error {

    /**
     * The name of the error.
     */
    public readonly name: string = 'TemmyError';

    /**
     * The message of the error.
     */
    public message: string = "Temme isn't feeling good";

    /**
     * Constructor with parameters.
     * 
     * @param message The message of the error.
     */
    constructor(message: string) {

        // Calling the parent class `Error`.
        super();

        // Updating the error's message.
        this.message = message;
    }
}
