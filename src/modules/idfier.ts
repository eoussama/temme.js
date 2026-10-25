/**
 * @description
 * Everything related to assigning internal temmeId identifiers to hierarchy objects.
 */


import type { Hierarchy } from "./models/Hierarchy";



/** The length of a hierarchy's temmeId. */
export const HIERARCHY_ID_LENGTH = 6;

/** The length of a template's temmeId. */
export const TEMPLATE_ID_LENGTH = 4;

/** The characters temmeIds are made of. */
const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";


/**
 * @description
 * Assigns a temmeId trail to a hierarchy object and all of its descendants and templates.
 * Every temmeId is unique within the tree.
 *
 * @param hierarchy The hierarchy object to assign a temmeId to.
 * @param temmeIds The trail of temmeIds leading up to the current hierarchy object.
 * @param isTemplate Whether the object is a template (4-character id) or not (6-character id).
 * @param used The temmeIds already handed out in this tree.
 * @returns {void}
 */
export function idfy(
  hierarchy: Hierarchy,
  temmeIds: Array<string> = [],
  isTemplate: boolean = false,
  used: Set<string> = new Set(),
): void {
  const length = isTemplate ? TEMPLATE_ID_LENGTH : HIERARCHY_ID_LENGTH;
  let temmeId = generateTemmeId(length);

  while (used.has(temmeId)) {
    temmeId = generateTemmeId(length);
  }

  used.add(temmeId);
  hierarchy.temmeIds = [...temmeIds, temmeId];

  hierarchy.childNodes?.forEach((child: Hierarchy) => idfy(child, hierarchy.temmeIds, false, used));
  hierarchy.templates?.forEach((template: Hierarchy) => idfy(template, hierarchy.temmeIds, true, used));
}


/**
 * @description
 * Returns the last (innermost) temmeId of a hierarchy or template object.
 *
 * @param hierarchy The hierarchy or template to read the temmeId from.
 * @returns {string} The innermost temmeId.
 */
export function getTemmeId(hierarchy: Hierarchy): string {
  return hierarchy.temmeIds[hierarchy.temmeIds.length - 1] as string;
}


/**
 * @description
 * Generates a random temmeId of the given length.
 *
 * @param length The number of characters.
 * @returns {string} The generated temmeId.
 */
export function generateTemmeId(length: number): string {
  let key = "";

  for (let i = 0; i < length; i++) {
    key += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }

  return key;
}
