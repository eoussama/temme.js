/**
 * The text option model.
 */


import Option from "../models/Option";


export default class TextOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('text', 'string', '', []);
    }

    /**
     * Checks if the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
