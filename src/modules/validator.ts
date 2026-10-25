/**
 * @description
 * Responsible for validating hierarchy input — option names, types, values
 * and template constraints. Reference validation lives in the referencer.
 */


import { isObject } from "@eoussama/core";
import InvalidHierarchyError from "./errors/InvalidHierarchyError";
import InvalidOptionNameError from "./errors/InvalidOptionNameError";
import InvalidOptionTypeError from "./errors/InvalidOptionTypeError";
import InvalidOptionValueError from "./errors/InvalidOptionValueError";
import InvalidReferenceOptionValueError from "./errors/InvalidReferenceOptionValueError";
import InvalidReferencingOptionError from "./errors/InvalidReferencingOptionError";
import InvalidSubOptionNameError from "./errors/InvalidSubOptionNameError";
import InvalidSubOptionTypeError from "./errors/InvalidSubOptionTypeError";
import InvalidSubOptionValueError from "./errors/InvalidSubOptionValueError";
import InvalidTemplateError from "./errors/InvalidTemplateError";
import InvalidTemplateOptionError from "./errors/InvalidTemplateOptionError";
import Option from "./models/Option";
import { findOption, forbiddenOptions } from "./options";



/**
 * @description
 * Checks whether a value is a structurally valid hierarchy (a non-null, non-array object).
 *
 * @param hierarchy The value to check.
 * @returns {boolean} `true` when the value can be used as a hierarchy.
 */
export function isValidHierarchy(hierarchy: unknown): hierarchy is Record<string, unknown> {
  return isObject(hierarchy);
}


/**
 * @description
 * Checks whether a value is an HTML element. Elements from other realms (iframes) are
 * recognised, and environments without a DOM simply get `false`.
 *
 * @param target The value to check.
 * @returns {boolean} `true` when the value is an HTMLElement.
 */
export function isValidHTMLElement(target: unknown): target is HTMLElement {
  if (!isObject(target)) {
    return false;
  }

  const HTMLElementOfRealm = (target as Partial<Node>).ownerDocument?.defaultView?.HTMLElement ?? globalThis.HTMLElement;

  return typeof HTMLElementOfRealm === "function" && target instanceof HTMLElementOfRealm;
}


/**
 * @description
 * Recursively validates all option names, types, values and sub-options of a hierarchy,
 * its templates and its children.
 *
 * @param hierarchy The hierarchy object to validate.
 * @param isTemplate Whether the object is a template (forbidden options are rejected).
 * @returns {void}
 * @throws {InvalidHierarchyError} When the hierarchy is not a plain object.
 * @throws {InvalidOptionNameError} When an unrecognised option key is encountered.
 * @throws {InvalidTemplateOptionError} When a template contains a forbidden option.
 * @throws {InvalidOptionTypeError} When an option's value has the wrong type.
 * @throws {InvalidOptionValueError} When an option's value is not in the allowed set.
 * @throws {InvalidSubOptionNameError} When an unrecognised sub-option key is encountered.
 * @throws {InvalidSubOptionTypeError} When a sub-option's value has the wrong type.
 * @throws {InvalidSubOptionValueError} When a sub-option's value is not in the allowed set.
 * @throws {InvalidReferenceOptionValueError} When the `ref` option starts with "@".
 * @throws {InvalidReferencingOptionError} When `from` lacks `ref`, or uses both `include` and `exclude`.
 */
export function validateOptions(hierarchy: unknown, isTemplate: boolean = false): void {
  if (!isValidHierarchy(hierarchy)) {
    throw new InvalidHierarchyError("");
  }

  for (const [label, value] of Object.entries(hierarchy)) {
    const option = findOption(label);

    if (option === undefined) {
      throw new InvalidOptionNameError(label);
    }

    if (isTemplate && forbiddenOptions.includes(label)) {
      throw new InvalidTemplateOptionError(label);
    }

    const { valid, type } = Option.validateOptionType(value, option);

    if (!valid) {
      throw new InvalidOptionTypeError(label, type);
    }

    if (!Option.validateOptionValue(value, option)) {
      throw new InvalidOptionValueError(label, String(value));
    }

    if (option.keys !== undefined) {
      validateSubOptions(label, value as Record<string, unknown>, option.keys);
    }
  }

  if (typeof hierarchy.ref === "string" && hierarchy.ref.startsWith("@")) {
    throw new InvalidReferenceOptionValueError("");
  }

  if (isObject(hierarchy.from)) {
    validateFrom(hierarchy.from);
  }

  (hierarchy.templates as Array<unknown> | undefined)?.forEach((template: unknown) => validateTemplates(template));
  (hierarchy.childNodes as Array<unknown> | undefined)?.forEach((child: unknown) => validateOptions(child));
}


/**
 * @description
 * Validates a template: it must be an object with a `ref` and only template-friendly options.
 *
 * @param template The template object to validate.
 * @returns {void}
 * @throws {InvalidHierarchyError} When the template is not a plain object.
 * @throws {InvalidTemplateError} When the template is missing a `ref` key.
 * @throws {InvalidTemplateOptionError} When the template contains a forbidden option.
 */
export function validateTemplates(template: unknown): void {
  if (!isValidHierarchy(template)) {
    throw new InvalidHierarchyError("");
  }

  if (!Object.hasOwn(template, "ref")) {
    throw new InvalidTemplateError("");
  }

  validateOptions(template, true);
}


/**
 * @description
 * Validates the sub-options of an object option's value.
 *
 * @param optionName The name of the parent option being validated.
 * @param value The value object containing sub-option entries.
 * @param subOptions The expected sub-options, keyed by label.
 * @returns {void}
 * @throws {InvalidSubOptionNameError} When an unrecognised sub-option key is found.
 * @throws {InvalidSubOptionTypeError} When a sub-option has the wrong type.
 * @throws {InvalidSubOptionValueError} When a sub-option has a disallowed value.
 */
function validateSubOptions(optionName: string, value: Record<string, unknown>, subOptions: Readonly<Record<string, Option>>): void {
  for (const [label, subValue] of Object.entries(value)) {
    const subOption = Object.hasOwn(subOptions, label) ? subOptions[label] : undefined;

    if (subOption === undefined) {
      throw new InvalidSubOptionNameError(optionName, label);
    }

    const { valid, type } = Option.validateOptionType(subValue, subOption);

    if (!valid) {
      throw new InvalidSubOptionTypeError(label, type);
    }

    if (!Option.validateOptionValue(subValue, subOption)) {
      throw new InvalidSubOptionValueError(label, String(subValue));
    }

    if (subOption.keys !== undefined) {
      validateSubOptions(label, subValue as Record<string, unknown>, subOption.keys);
    }
  }
}


/**
 * @description
 * Validates the referencing constraints of a `from` value: it needs a `ref`, and it
 * can't restrict inheritance with both a non-empty `include` and a non-empty `exclude`.
 *
 * @param from The `from` option value.
 * @returns {void}
 * @throws {InvalidReferencingOptionError} When a constraint is violated.
 */
function validateFrom(from: Record<string, unknown>): void {
  if (!Object.hasOwn(from, "ref")) {
    throw new InvalidReferencingOptionError(
      "The “from” option must always have a “ref” sub-option",
    );
  }

  const include = from.include as Array<string> | undefined;
  const exclude = from.exclude as Array<string> | undefined;

  if ((include?.length ?? 0) > 0 && (exclude?.length ?? 0) > 0) {
    throw new InvalidReferencingOptionError(
      "The “from” option can’t have both the “include” and “exclude” sub-options at the same time",
    );
  }
}
