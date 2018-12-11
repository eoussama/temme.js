/**
 * The reference option model.
 */


import Option from "../models/Option";


export default class RefOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('ref', 'string', '', []);
    }

    /**
     * Checks if the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
