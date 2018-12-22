/**
 * The error thrown when a target is not a valid
 * HTML element.
 */

import TemmyError from "../models/TemmyError";

export default class InvalidTargetError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidTargetError";

    /**
     * The message of the error.
     */
    public message: string = "The target is not a valid HTML element";

    /**
     * Constructor with parameters.
     * 
     * @param message The message of the error.
     */
    constructor(message: string) {

        // Calling the parent class `Error`.
        super("");

        // Updating the error's message.
        this.message = message.length > 0 ? message : this.message;
    }
}
