/**
 * The classes option model.
 */


import Option from "../models/Option";


export default class ClassesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('classes', 'array', [], []);
    }

    /**
     * Checks ff the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
