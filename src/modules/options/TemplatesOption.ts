/**
 * The templates option model.
 */


import Option from "../models/Option";


export default class TemplatesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('templates', 'array', [], []);
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param templates The templates to inherit.
     */
    public inherit(hierarchy: any, templates: any): void { }


    /**
     * Gets nothing from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement = (element: HTMLElement): any => null;
}
