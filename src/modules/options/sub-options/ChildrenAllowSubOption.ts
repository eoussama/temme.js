/**
 * The allow sub option model for the from-children option.
 */


import Option from "../../models/Option";


export default class ChildrenAllowSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('allow', 'boolean', [], false);
    }
    
    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param value The value to inherit.
     */
    public inherit(hierarchy: any, value: any): void { }
}
