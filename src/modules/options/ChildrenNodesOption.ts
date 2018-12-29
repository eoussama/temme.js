/**
 * The children option model.
 */


import Option from "../models/Option";


export default class ChildNodesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('childNodes', 'array', [], []);
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param childNodes The childNodes to inherit.
     */
    public inherit(hierarchy: any, childNodes: any): void {

        let children: any = [ ...hierarchy.childNodes ];

        if (hierarchy.from.children.allow === true) {
            
            if (hierarchy.from.mode === 'append') {
                
                if (hierarchy.from.children.placement === 'before') {
                    
                    children.unshift(...childNodes);
                } else {

                    children.push(...childNodes);
                }
            } else {

                children = childNodes;
            }
        }

        hierarchy.childNodes = children;
    }


    /**
     * Gets children from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement = (element: HTMLElement): any => element.innerHTML;
}
