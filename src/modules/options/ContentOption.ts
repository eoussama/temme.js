/**
 * The text option model.
 */


import Option, { IKeys, IParser } from "../models/Option";
import { Hierarchy } from '../models/Hierarchy';
import ValueSubOption from "./sub-options/ValueSubOption";
import ContentTypeSubOption from "./sub-options/ContentTypeSubOption";


/**
 * The content option class.
 */
export default class ContentOption extends Option implements IKeys, IParser {

    /**
     * The keys of the `content` option.
     */
    public keys: ContentKeys = {
        type: new ContentTypeSubOption(),
        value: new ValueSubOption()
    };

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('content', 'object', [], {
            type: (new ContentTypeSubOption()).default,
            value: (new ValueSubOption()).default
        });
    }


    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param content The content to inherit.
     */
    public inherit(hierarchy: any, content: any): void {
        
        let ct: string = content.value;

        if (hierarchy.from.mode === 'append') {

            ct = `${hierarchy.content.value}${ct.length > 0 ? ' ' : ''}${ct}`;
        } else {

            hierarchy.content = content;
        }

        hierarchy.content.value = ct;
    }


    /**
     * Gets content from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement(element: HTMLElement): any { 

        return {
            type: "html",
            value: element.innerHTML
        }
    };


    /**
     * Sets the content for an HTML element.
     * 
     * @param element The HTML element to set the content for
     */
    public parse (element: HTMLElement, hierarchy: Hierarchy) {

        if ((<any>hierarchy).content.value != "") {

            if ((<any>hierarchy).content.type === 'text') {

                element.textContent = (<any>hierarchy).content.value;
            } else {

                element.innerHTML = (<any>hierarchy).content.value;
            }
        }
    }
}


/**
 * The ContentKeys type.
 */
type ContentKeys = {

    type: ContentTypeSubOption;
    value: ValueSubOption;
}
