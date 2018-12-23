/**
 * The error thrown when a sub-option
 * is not of a valid value.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidSubOptionValueError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidSubOptionValueError";

    /**
     * The message of the error.
     */
    public message: string = "A sub-option doesn't have a valid value";

    /**
     * Constructor with parameters.
     * 
     * @param subOption The invalid sub-option's name.
     * @param value The invalid sub-option's value.
     */
    constructor(subOption: string, value: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Constructing the error message.
        const message: string = `The “${subOption}” sub-option doesn't accept “${value}” as a value`;

        // Updating the error's message.
        this.message = subOption.length > 0 || value.length > 0 ? message : this.message;
    }
}
