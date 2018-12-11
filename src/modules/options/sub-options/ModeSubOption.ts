/**
 * The mode sub option model.
 */


import Option from "../../models/Option";


export default class ModeSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('mode', 'string', 'append', ['append', 'override']);
    }

    /**
     * Checks if the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
