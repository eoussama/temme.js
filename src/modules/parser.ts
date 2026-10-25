/**
 * @description
 * Responsible for rendering hierarchy objects into live HTML trees.
 */


import type { Hierarchy } from "./models/Hierarchy";
import type Option from "./models/Option";
import { getTemmeId } from "./idfier";
import { getOptions } from "./options";



/**
 * @description
 * Recursively renders a sanitized hierarchy into HTML elements, appending each one to its parent.
 *
 * @param hierarchy The hierarchy object to render.
 * @param parent The HTML element that will host the rendered element.
 * @param nodeCallback Invoked after each element is rendered, with its temmeId and hierarchy.
 * @param topParent When `true` the hierarchy maps to `parent` itself (no element is created).
 * @returns {void}
 */
export function parse(
  hierarchy: Hierarchy,
  parent: HTMLElement,
  nodeCallback: (temmeId: string, currentHierarchy: Hierarchy) => void,
  topParent: boolean = false,
): void {
  const element = topParent ? parent : parent.ownerDocument.createElement(hierarchy.name);

  getOptions().forEach((option: Option) => option.parse(element, hierarchy));

  if (!topParent) {
    parent.appendChild(element);
  }

  nodeCallback(getTemmeId(hierarchy), hierarchy);

  hierarchy.childNodes.forEach((child: Hierarchy) => parse(child, element, nodeCallback));
}
