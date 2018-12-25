/**
 * Here goes's everything that ID-fies
 * anything to do with the hierarchy object.
 */


/**
 * Assigns temmeIds to a hierarchy object.
 * 
 * @param hierarchy The hierarchy object to assing a temmeId to.
 * @param temmeIds The series of temmeIds leading to the current hierarchy object.
 * @param mode The mode of the temmeId, if it's false, the temmeId will be of 6 characters
 * indicating it's a hierarchy object, if it's true, it'll have 4 characters indicating it's
 * a template.
 */
export function idfy(hierarchy: any, temmeIds: Array<string>, mode: boolean = false) {
    
    // Generating a temme Id.
    const temmeId: string = generateTemmeId(mode);
    
    // Assigning a temmeId.
    hierarchy.temmeIds = [...temmeIds, temmeId];
    
    // Checking of the hierarchy object has any children.
    if ('childNodes' in hierarchy) {
        
        hierarchy.childNodes.forEach((child: Object) => {
            
            idfy(child, hierarchy.temmeIds);
        });
    }

    // Checking of the hierarchy object has any templates.
    if ('templates' in hierarchy) {

        hierarchy.templates.forEach((template: Object) => {

            idfy(template, hierarchy.temmeIds, true);
        });
    }
}


/**
 * Generates a unique temmeId.
 */
function generateTemmeId(mode: boolean = false) {

    const
        chars = "0123456789abcdefghijklmnopqrstuvwxyz",
        max = (mode === false) ? 6 : 4;

    let key = '';

    for (let i = 0; i<max; i++) {

        const
            index = Math.floor((Math.random() * chars.length)),
            uppercase = Math.floor(Math.random() * 2);

        key += uppercase === 1 ? chars[index].toUpperCase() : chars[index];
    }

    return key;
}
