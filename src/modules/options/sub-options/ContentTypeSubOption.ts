/**
 * The content type sub option model.
 */


import Option from "../../models/Option";


export default class ContentTypeSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('type', 'string', ['text', 'html'], 'text');
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param value The value to inherit.
     */
    public inherit(hierarchy: any, value: any): void { }
}
