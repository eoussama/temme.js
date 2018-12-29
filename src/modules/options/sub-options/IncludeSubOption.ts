/**
 * The include sub-option.
 */


import Option from "../../models/Option";


export default class IncludeSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('include', 'array', ['name', 'id', 'classes', 'attributes', 'dataset', 'content', 'childNodes'], ['name', 'id', 'classes', 'attributes', 'dataset', 'content', 'childNodes']);
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param value The value to inherit.
     */
    public inherit(hierarchy: any, value: any): void { }


    /**
     * Gets nothing from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement = (element: HTMLElement): any => null;
}
