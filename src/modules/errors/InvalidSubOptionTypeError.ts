/**
 * The error thrown when a sub-ption
 * is not of a valid data type.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidSubOptionTypeError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidSubOptionTypeError";

    /**
     * The message of the error.
     */
    public message: string = "A sub-option doesn't have a valid value type";

    /**
     * Constructor with parameters.
     * 
     * @param subOption The invalid sub-option's name.
     * @param value The invalid sub-option's value.
     */
    constructor(subOption: string, type: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Constructing the error message.
        const message: string = `The “${subOption}” sub-option doesn't accept values of type “${type}”`;

        // Updating the error's message.
        this.message = subOption.length > 0 || type.length > 0 ? message : this.message;
    }
}
