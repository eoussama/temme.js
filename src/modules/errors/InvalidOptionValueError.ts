/**
 * The error thrown when an option
 * is not of a valid value.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidOptionValueError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidOptionValueError";

    /**
     * The message of the error.
     */
    public message: string = "An option doesn't have a valid value";

    /**
     * Constructor with parameters.
     * 
     * @param option The invalid option's name.
     * @param value The invalid option's value.
     */
    constructor(option: string, value: string) {

        // Calling the parent class `Error`.
        super("");

        // Constructing the error message.
        const message: string = `The “${option}” option doesn't accept “${value}” as a type`;

        // Updating the error's message.
        this.message = option.length > 0 ? message : this.message;
    }
}
