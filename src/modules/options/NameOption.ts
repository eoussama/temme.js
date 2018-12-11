/**
 * The name option model.
 */


import Option from "../models/Option";


export default class NameOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('name', 'string', '', []);
    }

    /**
     * Checks ff the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
