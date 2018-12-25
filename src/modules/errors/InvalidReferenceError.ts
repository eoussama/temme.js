/**
 * The error thrown when a ref option
 * references an invalid object.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidReferenceError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidReferenceError";

    /**
     * The message of the error.
     */
    public message: string = "A reference is invalid";

    /**
     * Constructor with parameters.
     * 
     * @param reference The invalid reference.
     */
    constructor(reference: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Updating the error's message.
        this.message = reference.length > 0 ? `“${reference}” is an invalid reference` : this.message;
    }
}
