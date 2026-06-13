/**
 * @description
 * Responsible for sanitizing hierarchy input and populating option defaults.
 */


import type { Hierarchy } from "./models/Hierarchy";
import type { IKeys } from "./models/Option";
import type Option from "./models/Option";
import { forbiddenOptions, options } from "./options";



/**
 * @description
 * Sanitizes a hierarchy object by populating missing option defaults
 * and normalising values (deduplication, sorting) recursively.
 *
 * @param hierarchy The hierarchy object to sanitize.
 * @returns {void}
 */
export function sanitize(hierarchy: Hierarchy): void {
  options.forEach((opt: Option) => {
    if (!(opt.label in hierarchy)) {
      hierarchy[opt.label] = opt.default;
    }
    else {
      if ("keys" in opt) {
        for (const key in (opt as IKeys).keys) {
          const subOption: Option = (opt as IKeys).keys[key];

          sanitizeOption(hierarchy[opt.label] as Hierarchy, subOption);
        }
      }
    }
  });

  hierarchy.classes = (hierarchy.classes as Array<string>).filter(
    (cls: string, index: number) => (hierarchy.classes as Array<string>).indexOf(cls) === index,
  );

  (hierarchy.classes as Array<string>).sort();

  if ("childNodes" in hierarchy && (hierarchy.childNodes as Array<Hierarchy>).length > 0) {
    (hierarchy.childNodes as Array<Hierarchy>).forEach((child: Hierarchy) => {
      sanitize(child);
    });
  }

  if ("templates" in hierarchy && (hierarchy.templates as Array<Hierarchy>).length > 0) {
    (hierarchy.templates as Array<Hierarchy>).forEach((template: Hierarchy) => {
      sanitizeTemplate(template);
    });
  }
}


/**
 * @description
 * Sanitizes a single option entry on a (sub-)hierarchy object by populating its default
 * when missing, or normalising array values when present.
 *
 * @param hierarchy The hierarchy (or sub-hierarchy) object to sanitize the option on.
 * @param option The option descriptor to apply.
 * @returns {void}
 */
function sanitizeOption(hierarchy: Hierarchy, option: Option): void {
  if (!(option.label in hierarchy)) {
    hierarchy[option.label] = option.default;
  }
  else if (option.label === "include" || option.label === "exclude") {
    const arr = hierarchy[option.label] as Array<string>;

    hierarchy[option.label] = arr.filter(
      (opt: string, index: number) => arr.indexOf(opt) === index,
    );

    (hierarchy[option.label] as Array<string>).sort();
  }

  if ("keys" in option) {
    for (const key in (option as IKeys).keys) {
      const subHierarchy = hierarchy[option.label] as Hierarchy;
      const subOption = (option as IKeys).keys[key];

      sanitizeOption(subHierarchy, subOption);
    }
  }
}


/**
 * @description
 * Sanitizes a template hierarchy object by populating allowed option defaults.
 * Forbidden options (e.g. `childNodes`, `templates`, `name`) are skipped.
 *
 * @param template The template hierarchy to sanitize.
 * @returns {void}
 */
function sanitizeTemplate(template: Hierarchy): void {
  options
    .filter((opt: Option) => !forbiddenOptions.includes(opt.label))
    .forEach((opt: Option) => {
      if (!(opt.label in template)) {
        template[opt.label] = opt.default;
      }
      else {
        if ("keys" in opt) {
          for (const key in (opt as IKeys).keys) {
            const subOption: Option = (opt as IKeys).keys[key];

            sanitizeOption(template[opt.label] as Hierarchy, subOption);
          }
        }
      }
    });
}
