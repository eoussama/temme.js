/**
 * The attributes option model.
 */


import Option from "../models/Option";
import { isTemplate } from "../referencer";


export default class AttributesOption extends Option {
        
    /**
     * Parameterless constructor.
     */
    constructor() {

        super('attributes', 'object', [], {});
    }
    

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param attributes The attributes to inherit.
     */
    public inherit(hierarchy: any, attributes: any): void {

        if (hierarchy.from.mode === 'append') {

            for (const key in attributes) {

                if (!(key in hierarchy.attributes)) {

                    hierarchy.attributes[key] = attributes[key];
                }
            }
        } else {

            for (const key in attributes) {

                hierarchy.attributes[key] = attributes[key];
            }
        }
    }


    /**
     * Gets attributes from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement(element: HTMLElement): any {
        
        let attributes: any = {};

        for (const attrKey in element.attributes) {

            if (!isNaN(parseInt(attrKey)) && ['id', 'class'].indexOf(element.attributes[attrKey].nodeName) === -1 && element.attributes[attrKey].nodeName.substring(0, 5) !== 'data-') {
                
                attributes[element.attributes[attrKey].nodeName] = element.attributes[attrKey].nodeValue;
            }
        }

        return attributes;
    }
}
