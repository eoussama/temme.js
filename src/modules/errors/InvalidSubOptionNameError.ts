/**
 * The error thrown when a sub-option
 * is not valid.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidSubOptionNameError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidSubOptionNameError";

    /**
     * The message of the error.
     */
    public message: string = "A sub-option is not valid";

    /**
     * Constructor with parameters.
     * 
     * @param option The parent option's name.
     * @param subOption The invalid sub-option's name.
     */
    constructor(option: string, subOption: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Constructing the error message.
        const message: string = `The “${option}” option doesn't not recognize “${subOption}” as a valid sub-option`;

        // Updating the error's message.
        this.message = option.length > 0 || subOption.length > 0 ? message : this.message;
    }
}
