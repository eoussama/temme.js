/**
 * @description
 * Everything related to assigning internal temmeId identifiers to hierarchy objects.
 */


import type { Hierarchy } from "./models/Hierarchy";
import type { Template } from "./models/Template";



/**
 * @description
 * Assigns a unique temmeId trail to a hierarchy object and all of its descendants.
 *
 * @param hierarchy The hierarchy object to assign a temmeId to.
 * @param temmeIds The series of temmeIds leading up to the current hierarchy object.
 * @param mode When `false` (default) the generated id is 6 characters (hierarchy);
 *             when `true` it is 4 characters (template).
 * @returns {void}
 */
export function idfy(hierarchy: Hierarchy, temmeIds: Array<string> = [], mode: boolean = false): void {
  const temmeId: string = generateTemmeId(mode);

  hierarchy.temmeIds = [...temmeIds, temmeId];

  if ("childNodes" in hierarchy) {
    (hierarchy.childNodes as Array<Hierarchy>).forEach((child: Hierarchy) => {
      idfy(child, hierarchy.temmeIds);
    });
  }

  if ("templates" in hierarchy) {
    (hierarchy.templates as Array<Hierarchy>).forEach((template: Hierarchy) => {
      idfy(template, hierarchy.temmeIds, true);
    });
  }
}


/**
 * @description
 * Returns the last (innermost) temmeId of a hierarchy or template object.
 *
 * @param hierarchy The hierarchy or template to read the temmeId from.
 * @returns {string} The innermost temmeId string.
 */
export function getTemmeId(hierarchy: Hierarchy | Template): string {
  return hierarchy.temmeIds[hierarchy.temmeIds.length - 1];
}


/**
 * @description
 * Generates a random temmeId string.
 * Hierarchy IDs are 6 characters; template IDs are 4 characters.
 *
 * @param mode `false` for a 6-character hierarchy id, `true` for a 4-character template id.
 * @returns {string} The generated temmeId.
 */
function generateTemmeId(mode: boolean = false): string {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
  const max = mode === false ? 6 : 4;

  let key = "";

  for (let i = 0; i < max; i++) {
    const index = Math.floor(Math.random() * chars.length);
    const uppercase = Math.floor(Math.random() * 2);

    key += uppercase === 1 ? chars[index].toUpperCase() : chars[index];
  }

  return key;
}
