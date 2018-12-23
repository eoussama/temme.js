/**
 * The error thrown when a 
 * froù option is not valid
 */


import TemmyError from "../models/TemmyError";


export default class InvalidReferencingOptionError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidReferencingOptionError";

    /**
     * The message of the error.
     */
    public message: string = "A referencing option is not valid";

    /**
     * Constructor with parameters.
     * 
     * @param message The error's message.
     */
    constructor(message: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Updating the error's message.
        this.message = message.length > 0 ? message : this.message;
    }
}
