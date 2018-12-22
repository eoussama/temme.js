/**
 * The error thrown when a template
 * has a forbidden option.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidTemplateOptionError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidTemplateOptionError";

    /**
     * The message of the error.
     */
    public message: string = "A template has an invalid option";

    /**
     * Constructor with parameters.
     * 
     * @param option The invalid option's name.
     */
    constructor(option: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Constructing the error message.
        const message: string = `“${option}” is not a valid option to use in templates`;

        // Updating the error's message.
        this.message = option.length > 0 ? message : this.message;
    }
}
