/**
 * The name option model.
 */


import Option from "../models/Option";


export default class NameOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('name', 'string', [], 'div', true);
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param name The name to inherit.
     */
    public inherit(hierarchy: any, name: any): void {
        
        if (name != null) {
            
            hierarchy.name = name;
        }
    }


    /**
     * Gets the nothing from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement = (element: HTMLElement): any => null;
}
