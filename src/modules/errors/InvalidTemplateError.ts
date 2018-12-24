/**
 * The error thrown when a template
 * is invalid (doesn't have a “ref” option).
 */


import TemmyError from "../models/TemmyError";


export default class InvalidTemplateError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidTemplateError";

    /**
     * The message of the error.
     */
    public message: string = "A template does not have a “ref” option";

    /**
     * Constructor with parameters.
     * 
     * @param message The message of the error.
     */
    constructor(message: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Updating the error's message.
        this.message = message.length > 0 ? message : this.message;
    }
}
