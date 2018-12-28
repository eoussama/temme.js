/**
 * What parses the hierarchy to an HTML tree.
 */


import { Hierarchy } from './models/Hierarchy'
import { getTemmeId } from './idfier';
import { options } from './options';
import Option, { IParser } from './models/Option';


/**
 * Parses the hierarchy object into an HTML element.
 * 
 * @param hierarchy The hierarchy object to parse.
 * @param parent The HTML element to host the parsed element.
 * @param nodeCallback The callback that executes whenever an HTML element has been created.
 */
export function parse(hierarchy: any, parent: HTMLElement, nodeCallback: (temmeId: string, currentHierarchy: any) => void): void {

    try {

        // Parsing the element.
        const element: HTMLElement = parseElement(hierarchy, parent);

        // Executing the node callback.
        nodeCallback(getTemmeId(hierarchy), hierarchy);

        // Checking if the hierarchy object has any children.
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {

            hierarchy.childNodes.forEach((child: Hierarchy) => {

                parse(child, element, nodeCallback);
            });
        }
    }
    catch (e) {

        throw e;
    }
}


/**
 * Converts a hierarchy into an HTML element.
 * 
 * @param hierarchy The hierarchy to parse.
 * @param parent The HTML element to host the parsed hierarchy.
 */
function parseElement(hierarchy: Hierarchy, parent: HTMLElement): HTMLElement {

    try {

        // Creating an HTML tag out of the hierarchy.
        const element: HTMLElement = document.createElement(hierarchy.name);

        // Appending the appropriate values.
        options.forEach((opt: Option | IParser) => {

            if (typeof (<IParser>opt).parse === 'function') {

                (<IParser>opt).parse(element, hierarchy);
            }
        });        

        // Appending the created element.
        parent.appendChild(element);

        // Returning the parsed element.
        return element;
    }
    catch(e) {

        throw e;
    }
}
