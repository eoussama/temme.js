/**
 * The error thrown when a template
 * has is referencing a non-template object.
 */


import TemmyError from "../models/TemmyError";


export default class InvalidTemplateReferencingError extends TemmyError {

    /**
     * The name of the error.
     */
    public name: string = "InvalidTemplateReferencingError";

    /**
     * The message of the error.
     */
    public message: string = "Templates can only reference other templates.";

    /**
     * Constructor with parameters.
     * 
     * @param ref The template's reference.
     * @param target The reference target.
     */
    constructor(ref: string, target: string) {

        // Calling the parent class `TemmyError`.
        super("");

        // Constructing the error message.
        const message: string = `The template with the reference “${ref}” is trying to reference “${target}” a non-template object`;

        // Updating the error's message.
        this.message = ref.length > 0 ? message : this.message;
    }
}
