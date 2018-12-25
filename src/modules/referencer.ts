/**
 * What processes all of the references.
 */


import { Hierarchy } from "./models/Hierarchy";
import { Template } from "./models/Template";
import { validateReferences, validateTemplateReference } from "./validator";


/**
 * The reference type.
 */
export type ReferenceType = { depth: number, hierarchy: any };


/**
 * Takes care of all the inheritance and references stuff.
 * 
 * @param hierarchy The hierarchy to process the references for.
 */
export function process(hierarchy: any): void {

    try {
        
        const references: Array<ReferenceType> = getReferences(hierarchy);

        // Validating all of the refereces.
        validateReferences(hierarchy, references);
        
        // Check if templates are inheriting hierarchy objects.
        validateTemplateReference(hierarchy, references);

        // TODO - Check if object is inheriting their children.
    }
    catch(e) {

        throw e;
    }
}


/**
 * Getting all the references in a said hierarchy.
 * 
 * @param hierarchy The hierarchy object to get the references from.
 * @param depth The current depth in the said hierarchy object.
 */
function getReferences(hierarchy: any, depth: number = 0): Array<ReferenceType> {

    const references: Array<ReferenceType> = [];

    // Checking if the reference is valid.
    if (hierarchy.ref !== "") {

        references.push({
            depth: depth,
            hierarchy: hierarchy
        });
    }

    // Checking if the hierarchy object has any children.
    if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {

        hierarchy.childNodes.forEach((child: Hierarchy) =>  {
            
            references.push(...getReferences(child, depth));
        });
    }

    // Checking if the hierarchy object has any templates.
    if ('templates' in hierarchy && hierarchy.templates.length > 0) {

        hierarchy.templates.forEach((template: Template) =>  {
            
            references.push(...getReferences(template, depth));
        });
    }

    // Returning all found references.
    return references;
}
