/**
 * The error thrown when an option
 * is not of a valid value.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidOptionTypeError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidOptionTypeError";

    /**
     * The message of the error.
     */
    public message: string = "An option doesn't have a valid value type";

    /**
     * Constructor with parameters.
     * 
     * @param option The invalid option's name.
     * @param value The invalid option's value.
     */
    constructor(option: string, type: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Constructing the error message.
        const message: string = `The “${option}” option doesn't accept values of type “${type}”`;

        // Updating the error's message.
        this.message = option.length > 0 ? message : this.message;
    }
}
