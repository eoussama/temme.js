/**
 * The error thrown when a a hierarchy objecy
 * is referencing an element out of its scope.
 */


import TemmyError from "../models/TemmyError";


export default class ReferenceOutOfScopeError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "ReferenceOutOfScopeError";

    /**
     * The message of the error.
     */
    public message: string = "An object is referencing an element out of its scope";

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
