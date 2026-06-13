/**
 * @description
 * Responsible for processing all hierarchy references and template inheritance.
 */


import type { Hierarchy } from "./models/Hierarchy";
import type Option from "./models/Option";
import type { Template } from "./models/Template";
import { getTemmeId } from "./idfier";
import { options } from "./options";
import { validateParentToChildReference, validateReferences, validateTemplateReference } from "./validator";



/**
 * @description
 * The shape of a reference entry — pairs a depth level with the hierarchy it belongs to.
 */
export type ReferenceType = { depth: number; hierarchy: Hierarchy };


/**
 * @description
 * Returns `true` when a hierarchy's temmeId is 4 characters long, indicating it is a template.
 *
 * @param hierarchy The hierarchy to inspect.
 * @returns {boolean} `true` if the hierarchy is a template.
 */
export const isTemplate = (hierarchy: Hierarchy): boolean => getTemmeId(hierarchy).length === 4;


/**
 * @description
 * Processes all references and template inheritance within a hierarchy tree.
 * Validates references, then applies template and hierarchy inheritance.
 *
 * @param hierarchy The root hierarchy to process.
 * @returns {void}
 */
export function process(hierarchy: Hierarchy): void {
  const references: Array<ReferenceType> = getReferences(hierarchy);

  validateReferences(hierarchy, references);
  validateTemplateReference(hierarchy, references);
  validateParentToChildReference(hierarchy, references);

  processTemplates(hierarchy, references.filter((ref: ReferenceType) => isTemplate(ref.hierarchy)));
  processHierarchies(hierarchy, references);
}


/**
 * @description
 * Processes template-based inheritance for all templates in the hierarchy tree.
 *
 * @param hierarchy The hierarchy containing templates to process.
 * @param references The valid reference list (pre-filtered to templates only).
 * @returns {void}
 */
function processTemplates(hierarchy: Hierarchy, references: Array<ReferenceType>): void {
  if ("templates" in hierarchy && hierarchy.templates.length > 0) {
    hierarchy.templates.forEach((template: Hierarchy) => {
      if (template.from.ref !== "") {
        for (const key in template) {
          const option = options.filter((opt: Option) => opt.label === key)[0];
          const referencedHierarchy: ReferenceType = references.filter(
            (ref: ReferenceType) => (ref.hierarchy as Hierarchy).ref === template.from.ref,
          )[0];

          option.inherit(template, (referencedHierarchy.hierarchy as Hierarchy)[key]);
        }
      }
    });
  }

  if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
    hierarchy.childNodes.forEach((child: Hierarchy) => {
      processTemplates(child, references);
    });
  }
}


/**
 * @description
 * Processes non-template hierarchy inheritance, handling both outer-element
 * references (via CSS selector) and inner ref-based references.
 *
 * @param hierarchy The hierarchy to process references for.
 * @param references The full valid reference list.
 * @returns {void}
 */
function processHierarchies(hierarchy: Hierarchy, references: Array<ReferenceType>): void {
  if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
    hierarchy.childNodes.forEach((child: Hierarchy) => {
      processHierarchies(child, references);
    });
  }

  if (hierarchy.from.ref !== "") {
    if (hierarchy.from.ref[0] === "@") {
      const selector = hierarchy.from.ref.substring(1);
      const element = document.querySelector(selector);

      for (const key in hierarchy) {
        const option = options.filter((opt: Option) => opt.label === key)[0];
        const value = option.getKeyFromElement(element as HTMLElement);

        if (value != null) {
          option.inherit(hierarchy, value);
        }
      }
    }
    else {
      const referencedHierarchy: ReferenceType = references.filter(
        (ref: ReferenceType) => (ref.hierarchy as Hierarchy).ref === hierarchy.from.ref,
      )[0];

      const toInherit: Array<string> = hierarchy.from.include.filter(
        (opt: string) => !hierarchy.from.exclude.includes(opt),
      );

      toInherit.forEach((optName: string) => {
        const option: Option = options.filter((opt: Option) => opt.label === optName)[0];

        option.inherit(hierarchy, (referencedHierarchy.hierarchy as Hierarchy)[optName]);
      });
    }
  }
}


/**
 * @description
 * Collects all reference entries from a hierarchy tree, paired with their depth.
 *
 * @param hierarchy The hierarchy object to collect references from.
 * @param depth The current recursion depth (incremented on each call).
 * @returns {Array<ReferenceType>} All reference entries found in the subtree.
 */
function getReferences(hierarchy: Hierarchy, depth: number = 0): Array<ReferenceType> {
  const references: Array<ReferenceType> = [];

  depth++;

  if ((hierarchy.ref as string) !== "") {
    references.push({ depth, hierarchy });
  }

  if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
    hierarchy.childNodes.forEach((child: Hierarchy) => {
      references.push(...getReferences(child, depth));
    });
  }

  if ("templates" in hierarchy && hierarchy.templates.length > 0) {
    (hierarchy.templates as Array<Template>).forEach((template: Template) => {
      references.push(...getReferences(template as unknown as Hierarchy, depth - 1));
    });
  }

  return references;
}
