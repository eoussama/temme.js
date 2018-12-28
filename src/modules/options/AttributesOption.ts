/**
 * The attributes option model.
 */


import Option, { IParser } from "../models/Option";
import { Hierarchy } from "../models/Hierarchy";


export default class AttributesOption extends Option implements IParser {

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

        const attr: any = attributes;

        if (hierarchy.from.mode === 'append') {

            for (const key in hierarchy.attributes) {

                attr[key] = hierarchy.attributes[key];
            }
        } else {

            for (const key in hierarchy.attributes) {

                if (!(key in attr)) {

                    attr[key] = hierarchy.attributes[key];
                }
            }
        }

        hierarchy.attributes = attr;
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


    /**
     * Sets the attributes for an HTML element.
     * 
     * @param element The HTML element to set the attributes for
     */
    public parse (element: HTMLElement, hierarchy: Hierarchy) {

        for (const dataKey in hierarchy.attributes) {
            
            element.setAttribute(dataKey, (<any>hierarchy).attributes[dataKey]);
        }
    }
}
