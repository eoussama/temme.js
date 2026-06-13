/**
 * @description
 * Responsible for parsing hierarchy objects into live HTML trees.
 */


import type { Hierarchy } from "./models/Hierarchy";
import type { IParser } from "./models/Option";
import type Option from "./models/Option";
import { getTemmeId } from "./idfier";
import { options } from "./options";



/**
 * @description
 * Recursively parses a hierarchy object into HTML elements and appends
 * each one to its parent element.
 *
 * @param hierarchy The hierarchy object to parse.
 * @param parent The HTML element that will host the parsed element.
 * @param nodeCallback A callback invoked after each element is created,
 *   receiving the element's temmeId and its hierarchy descriptor.
 * @param topParent When `true` the hierarchy maps to `parent` directly
 *   (no new element is created at the root level).
 * @returns {void}
 */
export function parse(
  hierarchy: Hierarchy,
  parent: HTMLElement,
  nodeCallback: (temmeId: string, currentHierarchy: Hierarchy) => void,
  topParent: boolean = false,
): void {
  const element: HTMLElement = parseElement(hierarchy, parent, topParent);

  nodeCallback(getTemmeId(hierarchy), hierarchy);

  if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
    hierarchy.childNodes.forEach((child: Hierarchy) => {
      parse(child, element, nodeCallback);
    });
  }
}


/**
 * @description
 * Converts a single hierarchy descriptor into an HTML element,
 * applies all option parsers, and appends it to the parent.
 *
 * @param hierarchy The hierarchy descriptor to convert.
 * @param parent The HTML element to append the new element to.
 * @param topParent When `true` the hierarchy maps to `parent` itself — no element is created.
 * @returns {HTMLElement} The created (or reused) HTML element.
 */
function parseElement(
  hierarchy: Hierarchy,
  parent: HTMLElement,
  topParent: boolean = false,
): HTMLElement {
  const element: HTMLElement = topParent === true
    ? parent
    : document.createElement(hierarchy.name);

  options.forEach((opt: Option | IParser) => {
    if (typeof (opt as IParser).parse === "function") {
      (opt as IParser).parse(element, hierarchy);
    }
  });

  if (topParent === false) {
    parent.appendChild(element);
  }

  return element;
}
