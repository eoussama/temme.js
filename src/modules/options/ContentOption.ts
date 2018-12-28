/**
 * The text option model.
 */


import Option, { IKeys } from "../models/Option";
import ValueSubOption from "./sub-options/ValueSubOption";
import ContentTypeSubOption from "./sub-options/ContentTypeSubOption";


/**
 * The content option class.
 */
export default class ContentOption extends Option implements IKeys {

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
        
        const ct: any = content;

        if (hierarchy.from.mode === 'append') {

            ct.value = `${hierarchy.content.value} ${ct.value}`;
        }

        hierarchy.content = ct;
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
}


/**
 * The ContentKeys type.
 */
type ContentKeys = {

    type: ContentTypeSubOption;
    value: ValueSubOption;
}
