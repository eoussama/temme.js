/**
 * The classes option model.
 */


import Option from "../models/Option";


export default class ClassesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('classes', 'array', [], []);
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param classes The classes to inherit.
     */
    public inherit(hierarchy: any, classes: any): void {
        
        if (hierarchy.from.mode === 'append') {

            hierarchy.classes.push(...classes);
        } else {

            hierarchy.classes = classes;
        }
        
        // Removing duplicates.
        hierarchy.classes = hierarchy.classes.filter((cls: string, index: number) => hierarchy.classes.indexOf(cls) === index);

        // Sorting the classes.
        hierarchy.classes.sort();
    }


    /**
     * Gets classes from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement(element: HTMLElement): any {
      
        let classes: Array<string> = [];

        element.classList.forEach((cls: string) => classes.push(cls));

        return classes;
    };
}
