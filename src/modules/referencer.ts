/**
 * What processes all of the references.
 */


import { Hierarchy } from "./models/Hierarchy";
import { Template } from "./models/Template";
import { validateReferences, validateTemplateReference, validateParentToChildReference } from "./validator";


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
        
        // Checking if templates are inheriting hierarchy objects.
        validateTemplateReference(hierarchy, references);

        // Checking if a parent is trying to reference their childern.
        validateParentToChildReference(hierarchy, references);
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

    // Incrementing the depth.
    depth++;

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
            
            // Substracting 1 to make templates on the same depth level
            // as their hierarchy parent.
            references.push(...getReferences(template, depth - 1));
        });
    }

    // Returning all found references.
    return references;
}
