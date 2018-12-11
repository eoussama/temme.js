/**
 * The from option model.
 */


import Option from "../models/Option";


export default class FromOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('from', 'object', '', []);
    }

    /**
     * Checks ff the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
