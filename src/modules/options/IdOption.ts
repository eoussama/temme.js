/**
 * The ID option model.
 */


import Option from "../models/Option";


export default class IdOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('id', 'string', [], '');
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param id The id to inherit.
     */
    public inherit(hierarchy: any, id: any): void {
        
        hierarchy.id = id;
    }
}
