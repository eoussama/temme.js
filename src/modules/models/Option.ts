/**
 * @description
 * The hierarchy's option model — defines what a valid option looks like.
 */


import type { Hierarchy } from "./Hierarchy";



/**
 * @description
 * The interface that marks options which carry sub-option keys.
 */
export interface IKeys {

  /** Map of sub-option label → sub-option instance. */
  keys: Record<string, Option>;
}


/**
 * @description
 * The interface for options that parse their values into an HTML element.
 */
export interface IParser {

  /**
   * @description
   * Applies this option's value to the target HTML element.
   *
   * @param element The HTML element to apply values to.
   * @param hierarchy The hierarchy object supplying the values.
   * @returns {void}
   */
  parse: (element: HTMLElement, hierarchy: Hierarchy) => void;
}


/**
 * @description
 * Abstract base class that represents a single hierarchy option.
 */
export default abstract class Option {
  /** The name / label of the option. */
  public label: string;

  /** The expected data type of the option's value. */
  public type: string;

  /** The set of allowed values for the option (empty means unrestricted). */
  public values: Array<unknown>;

  /** The default value for the option. */
  public default: unknown;

  /** Whether this option participates in inheritance. */
  public inherited: boolean;


  /**
   * @description
   * Constructs an Option with the given metadata.
   *
   * @param label The name of the option.
   * @param type The expected data type.
   * @param values The set of allowed values.
   * @param defaultValue The default value.
   * @param inherited Whether the option is inherited.
   * @returns {void}
   */
  constructor(
    label: string,
    type: string,
    values: Array<unknown>,
    defaultValue: unknown,
    inherited: boolean = false,
  ) {
    this.label = label;
    this.type = type;
    this.values = values;
    this.default = defaultValue;
    this.inherited = inherited;
  }


  /**
   * @description
   * Performs the inheritance process for this option on a hierarchy.
   *
   * @param hierarchy The hierarchy object that is inheriting.
   * @param value The value to inherit.
   * @returns {void}
   */
  public abstract inherit(hierarchy: Hierarchy, value: unknown): void;


  /**
   * @description
   * Extracts this option's value from an existing HTML element.
   *
   * @param element The HTML element to read from.
   * @returns {unknown} The extracted value, or `null` if not applicable.
   */
  public abstract getKeyFromElement(element: HTMLElement): unknown;


  /**
   * @description
   * Checks whether a matching option object was found by name.
   *
   * @param matchingOption The option object with the matching name.
   * @returns {boolean} `true` when the option exists.
   */
  public static validateOptionName = (matchingOption: Option): boolean => matchingOption != null;


  /**
   * @description
   * Validates that the option's value has the expected data type.
   *
   * @param value The option value to check.
   * @param matchingOption The option object with the matching name.
   * @returns {{ valid: boolean; type: string }} Validation result and the detected type string.
   */
  public static validateOptionType(
    value: unknown,
    matchingOption: Option,
  ): { valid: boolean; type: string } {
    let optionType: string;

    if (Array.isArray(value)) {
      optionType = "array";
    }
    else {
      optionType = typeof value;
    }

    return {
      valid: optionType === matchingOption.type,
      type: optionType,
    };
  }


  /**
   * @description
   * Validates that the option's value is one of the allowed values.
   *
   * @param value The value to check.
   * @param matchingOption The option object with the matching name.
   * @returns {boolean} `true` when the value is valid.
   */
  public static validateOptionValue(value: unknown, matchingOption: Option): boolean {
    if (matchingOption != null && matchingOption.values.length > 0) {
      if (matchingOption.label === "include" || matchingOption.label === "exclude") {
        for (const val of (value as Array<unknown>)) {
          if (!matchingOption.values.includes(val)) {
            return false;
          }
        }
      }
      else {
        return matchingOption.values.includes(value);
      }
    }

    return true;
  }
}
