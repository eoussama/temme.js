/**
 * The error thrown when a 
 * ref option starts with the symbole “@”.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidReferenceOptionValueError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidReferenceOptionValueError";

    /**
     * The message of the error.
     */
    public message: string = "“ref” options must not begin with the “@” symbol";

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
