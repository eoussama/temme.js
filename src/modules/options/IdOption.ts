/**
 * The ID option model.
 */


import Option, { IParser } from "../models/Option";
import { Hierarchy } from "../models/Hierarchy";


export default class IdOption extends Option implements IParser {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('id', 'string', [], '', true);
    }


    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param id The id to inherit.
     */
    public inherit(hierarchy: any, id: any): void {

        if (id !== '') {

            if (hierarchy.from.mode === 'append') {

                if (hierarchy.id === '') {

                    hierarchy.id = id;
                }
            } else {

                hierarchy.id = id;
            }
        }
    }


    /**
     * Gets the id from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement = (element: HTMLElement): any => element.id;


    /**
     * Sets the id for an HTML element.
     * 
     * @param element The HTML element to set the id for
     */
    public parse(element: HTMLElement, hierarchy: Hierarchy) {

        if (hierarchy.id != "") {

            element.id = hierarchy.id;
        }
    }
}
