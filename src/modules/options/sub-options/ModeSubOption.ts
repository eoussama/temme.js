/**
 * The mode sub option model.
 */


import Option from "../../models/Option";


export default class ModeSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('mode', 'string', ['append', 'override'], 'append');
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param value The value to inherit.
     */
    public inherit(hierarchy: any, value: any): void { }
}
