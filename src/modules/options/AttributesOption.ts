/**
 * The attributes option model.
 */


import Option from "../models/Option";


export default class AttributesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('attributes', 'object', {}, []);
    }

    /**
     * Checks ff the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
