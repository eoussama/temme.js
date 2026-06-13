/**
 * @description
 * Responsible for validating all hierarchy input — option names, types, values,
 * references, and template constraints.
 */


import type { Hierarchy } from "./models/Hierarchy";
import type { IKeys } from "./models/Option";
import type { ReferenceType } from "./referencer";
import InvalidOptionNameError from "./errors/InvalidOptionNameError";
import InvalidOptionTypeError from "./errors/InvalidOptionTypeError";
import InvalidOptionValueError from "./errors/InvalidOptionValueError";
import InvalidReferenceError from "./errors/InvalidReferenceError";
import InvalidReferenceOptionValueError from "./errors/InvalidReferenceOptionValueError";
import InvalidReferencingOptionError from "./errors/InvalidReferencingOptionError";
import InvalidSubOptionNameError from "./errors/InvalidSubOptionNameError";
import InvalidSubOptionTypeError from "./errors/InvalidSubOptionTypeError";
import InvalidSubOptionValueError from "./errors/InvalidSubOptionValueError";
import InvalidTemplateError from "./errors/InvalidTemplateError";
import InvalidTemplateOptionError from "./errors/InvalidTemplateOptionError";
import InvalidTemplateReferencingError from "./errors/InvalidTemplateReferencingError";
import ReferenceOutOfRangeError from "./errors/ReferenceOutOfScopeError";
import { getTemmeId } from "./idfier";
import Option from "./models/Option";
import { forbiddenOptions, getSubOptions, options } from "./options";



/**
 * @description
 * Checks whether an object is a structurally valid hierarchy (non-null plain object).
 *
 * @param hierarchy The object to check.
 * @returns {boolean} `true` when the object is a non-null, non-array plain object.
 */
export function isValidHierarchy(hierarchy: object): boolean {
  return hierarchy != null && typeof hierarchy === "object" && !Array.isArray(hierarchy);
}


/**
 * @description
 * Checks whether a value is a valid HTML element.
 *
 * @param target The value to check.
 * @returns {boolean} `true` when the value is a non-null HTMLElement instance.
 */
export function isValidHTMLElement(target: HTMLElement): boolean {
  return target != null && target instanceof HTMLElement;
}


/**
 * @description
 * Validates a single reference lookup — returns `true` when a matching reference exists
 * and it does not share a temmeId with the current hierarchy (no self-reference).
 *
 * @param hierarchy The hierarchy object performing the reference lookup.
 * @param references The list of valid reference entries to search.
 * @returns {boolean} `true` when a valid, non-self reference is found.
 */
function validateReference(hierarchy: Hierarchy, references: Array<ReferenceType>): boolean {
  return references.filter(
    (ref: ReferenceType) =>
      (ref.hierarchy as Hierarchy).ref === hierarchy.from.ref
      && getTemmeId(hierarchy) !== getTemmeId(ref.hierarchy),
  )[0] != null;
}


/**
 * @description
 * Recursively validates all option names, types, values, and sub-options
 * within a hierarchy object.
 *
 * @param hierarchy The hierarchy object to validate options for.
 * @returns {void}
 * @throws {InvalidOptionNameError} When an unrecognised option key is encountered.
 * @throws {InvalidOptionTypeError} When an option's value has the wrong type.
 * @throws {InvalidOptionValueError} When an option's value is not in the allowed set.
 * @throws {InvalidSubOptionNameError} When an unrecognised sub-option key is encountered.
 * @throws {InvalidSubOptionTypeError} When a sub-option's value has the wrong type.
 * @throws {InvalidSubOptionValueError} When a sub-option's value is not in the allowed set.
 * @throws {InvalidTemplateOptionError} When a template contains a forbidden option.
 */
export function validateOptions(hierarchy: Hierarchy): void {
  for (const option in hierarchy) {
    const matchingOption: Option = options.filter(
      (opt: Option) => opt.label === option,
    )[0] as Option;
    const optionValue: unknown = hierarchy[option];

    if (Option.validateOptionName(matchingOption) === false) {
      throw new InvalidOptionNameError(option);
    }

    const typeValidation: { valid: boolean; type: string } = Option.validateOptionType(
      optionValue,
      matchingOption,
    );

    if (typeValidation.valid === false) {
      throw new InvalidOptionTypeError(option, typeValidation.type);
    }

    if (Option.validateOptionValue(optionValue, matchingOption) === false) {
      throw new InvalidOptionValueError(option, optionValue as string);
    }

    if ("keys" in matchingOption) {
      const subOptions = (matchingOption as unknown as IKeys).keys;

      validateSubOptions(option, optionValue as Hierarchy, subOptions);
    }
  }

  if (validateReferencingOption(hierarchy) === false) {
    throw new InvalidReferencingOptionError(
      "The \u201Cfrom\u201D option must always have a \u201Cref\u201D sub-option",
    );
  }

  if (validateReferencingRange(hierarchy) === false) {
    throw new InvalidReferencingOptionError(
      "The \u201Cfrom\u201D option can\u2019t have both the \u201Cinclude\u201D and \u201Cexclude\u201D sub-options at the same time",
    );
  }

  if ("templates" in hierarchy) {
    hierarchy.templates.forEach((template: Hierarchy) => {
      validateTemplates(template);
    });
  }

  if ("childNodes" in hierarchy) {
    hierarchy.childNodes.forEach((child: Hierarchy) => {
      validateOptions(child);
    });
  }
}


/**
 * @description
 * Validates that a template hierarchy has the required `ref` key and contains
 * only permitted options.
 *
 * @param template The template object to validate.
 * @returns {void}
 * @throws {InvalidTemplateError} When the template is missing a `ref` key.
 * @throws {InvalidTemplateOptionError} When the template contains a forbidden option.
 */
export function validateTemplates(template: Hierarchy): void {
  if (!("ref" in template)) {
    throw new InvalidTemplateError("");
  }

  for (const option in template) {
    if (forbiddenOptions.includes(option)) {
      throw new InvalidTemplateOptionError(option);
    }
    else {
      validateOptions(template);
    }
  }
}


/**
 * @description
 * Recursively validates all reference declarations within a hierarchy tree,
 * checking that each `from.ref` points to a real, reachable element.
 *
 * @param hierarchy The hierarchy object to validate references for.
 * @param references The list of valid reference entries.
 * @returns {void}
 * @throws {InvalidReferenceOptionValueError} When a `ref` value starts with "@" but has no matching outer element.
 * @throws {InvalidReferenceError} When a `from.ref` value points to a non-existent reference.
 */
export function validateReferences(hierarchy: Hierarchy, references: Array<ReferenceType>): void {
  if ((hierarchy.ref as string)[0] === "@") {
    throw new InvalidReferenceOptionValueError("");
  }

  if ((hierarchy.from as unknown as Hierarchy).ref !== undefined) {
    const fromRef = (hierarchy.from as unknown as Hierarchy).ref as string;

    if (fromRef[0] === "@") {
      const selector: string = fromRef.substring(1);
      const element: HTMLElement | null = document.querySelector(selector);

      if (element == null) {
        throw new InvalidReferenceOptionValueError(
          `No outer element corresponds to the selector "${selector}"`,
        );
      }
    }
    else {
      if (validateReference(hierarchy, references) === false && fromRef !== "") {
        throw new InvalidReferenceError(fromRef);
      }
    }
  }

  if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
    hierarchy.childNodes.forEach((child: Hierarchy) => {
      validateReferences(child, references);
    });
  }

  if ("templates" in hierarchy && hierarchy.templates.length > 0) {
    hierarchy.templates.forEach((template: Hierarchy) => {
      validateReferences(template, references);
    });
  }
}


/**
 * @description
 * Validates that all templates in a hierarchy only reference other templates
 * (not plain hierarchy elements).
 *
 * @param hierarchy The hierarchy to validate template references for.
 * @param references The list of valid reference entries.
 * @returns {void}
 * @throws {InvalidTemplateReferencingError} When a template references a non-template element.
 */
export function validateTemplateReference(
  hierarchy: Hierarchy,
  references: Array<ReferenceType>,
): void {
  const templates = hierarchy.templates;

  if (templates.length > 0) {
    templates.forEach((template: Hierarchy) => {
      if (template.from.ref.length > 0) {
        const referencedElement = references.filter(
          (ref: ReferenceType) => (ref.hierarchy as Hierarchy).ref === template.from.ref,
        )[0];

        const isTemplateRef: boolean = getTemmeId(referencedElement.hierarchy).length === 4;

        if (isTemplateRef === false) {
          throw new InvalidTemplateReferencingError(template.ref, template.from.ref);
        }
      }
    });
  }

  hierarchy.childNodes.forEach((child: Hierarchy) => {
    validateTemplateReference(child, references);
  });
}


/**
 * @description
 * Validates that no hierarchy element tries to reference one of its own descendants
 * (parent-to-child reference is not allowed).
 *
 * @param hierarchy The hierarchy to validate.
 * @param references The list of valid reference entries.
 * @param depth The current recursion depth; incremented on each call.
 * @returns {void}
 * @throws {ReferenceOutOfScopeError} When a hierarchy references an element outside its scope.
 */
export function validateParentToChildReference(
  hierarchy: Hierarchy,
  references: Array<ReferenceType>,
  depth: number = 0,
): void {
  const ref: string = hierarchy.from.ref;

  depth++;

  if (ref !== "" && ref[0] !== "@") {
    const referencedHierarchy: ReferenceType = references.filter(
      (refObject: ReferenceType) =>
        (refObject.hierarchy as Hierarchy).ref === ref && depth >= refObject.depth,
    )[0];

    if (referencedHierarchy == null) {
      throw new ReferenceOutOfRangeError("");
    }
  }

  if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
    hierarchy.childNodes.forEach((child: Hierarchy) => {
      validateParentToChildReference(child, references, depth);
    });
  }

  if ("templates" in hierarchy && hierarchy.templates.length > 0) {
    hierarchy.templates.forEach((template: Hierarchy) => {
      validateParentToChildReference(template, references, depth);
    });
  }
}


/**
 * @description
 * Validates the sub-options of a parent option value.
 *
 * @param optionName The name of the parent option being validated.
 * @param optionValue The value object containing sub-option entries.
 * @param subOptions The expected sub-options descriptor map.
 * @returns {void}
 * @throws {InvalidSubOptionNameError} When an unrecognised sub-option key is found.
 * @throws {InvalidSubOptionTypeError} When a sub-option has the wrong type.
 * @throws {InvalidSubOptionValueError} When a sub-option has a disallowed value.
 */
function validateSubOptions(
  optionName: string,
  optionValue: Hierarchy,
  subOptions: Record<string, Option>,
): void {
  for (const subOption in optionValue) {
    const matchingSubOption: Option = getSubOptions(optionName).filter(
      (sub: Option) => sub.label === subOption,
    )[0] as Option;
    const subOptionValue: unknown = (optionValue as Hierarchy)[subOption];

    if (subOption in subOptions) {
      if (Option.validateOptionName(matchingSubOption) === false) {
        throw new InvalidSubOptionNameError(optionName, subOption);
      }

      const typeValidation: { valid: boolean; type: string } = Option.validateOptionType(
        subOptionValue,
        matchingSubOption,
      );

      if (typeValidation.valid === false) {
        throw new InvalidSubOptionTypeError(subOption, typeValidation.type);
      }

      if (Option.validateOptionValue(subOptionValue, matchingSubOption) === false) {
        throw new InvalidSubOptionValueError(subOption, subOptionValue as string);
      }

      if ("keys" in matchingSubOption) {
        validateSubOptions(
          subOption,
          optionValue[subOption] as Hierarchy,
          (matchingSubOption as unknown as IKeys).keys,
        );
      }
    }
    else {
      throw new InvalidSubOptionNameError(optionName, subOption);
    }
  }
}


/**
 * @description
 * Checks whether a hierarchy with a `from` option also has the required `ref` sub-option.
 *
 * @param hierarchy The hierarchy object to check.
 * @returns {boolean} `true` when valid, `false` when `from` is missing `ref`.
 */
function validateReferencingOption(hierarchy: Hierarchy): boolean {
  if ("from" in hierarchy) {
    return "ref" in (hierarchy.from as object);
  }

  return true;
}


/**
 * @description
 * Checks that a hierarchy with a `from` option does not have both `include` and `exclude`
 * sub-options specified at the same time.
 *
 * @param hierarchy The hierarchy object to check.
 * @returns {boolean} `true` when valid, `false` when both `include` and `exclude` are present.
 */
function validateReferencingRange(hierarchy: Hierarchy): boolean {
  if ("from" in hierarchy) {
    return !("include" in (hierarchy.from as object) && "exclude" in (hierarchy.from as object));
  }

  return true;
}
