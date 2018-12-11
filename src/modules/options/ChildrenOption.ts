/**
 * The children option model.
 */


import Option from "../models/Option";


export default class ChildrenOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('children', 'array', [], []);
    }

    /**
     * Checks ff the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
