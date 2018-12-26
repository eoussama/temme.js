/**
 * What parses the hierarchy to an HTML tree.
 */


/**
 * Parses the hierarchy object into an HTML element.
 * 
 * @param hierarchy The hierarchy object to parse.
 * @param nodeCallback The callback that executes whenever an HTML element has been created.
 */
export function parse(hierarchy: any, nodeCallback: (temmeId: string, currentHierarchy: any, depth: number) => void): void {

    try {

        console.log('parsing...');
    }
    catch(e) {

        throw e;
    }
}
