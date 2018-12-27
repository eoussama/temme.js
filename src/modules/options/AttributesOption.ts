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
}
