/**
 * The error thrown when an option
 * is not valid.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidOptionNameError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidOptionNameError";

    /**
     * The message of the error.
     */
    public message: string = "An option is not valid";

    /**
     * Constructor with parameters.
     * 
     * @param option The invalid option's name.
     */
    constructor(option: string) {

        // Calling the parent class `Error`.
        super("");

        // Constructing the error message.
        const message: string = `“${option}” is not a valid option`;

        // Updating the error's message.
        this.message = option.length > 0 ? message : this.message;
    }
}
