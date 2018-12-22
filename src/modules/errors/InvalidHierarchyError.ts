/**
 * The error thrown when a hierarchy object
 * is not valid.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidHierarchyError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidHierarchyError";

    /**
     * The message of the error.
     */
    public message: string = "The hierarchy object is not valid";

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
