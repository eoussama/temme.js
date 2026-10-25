/**
 * @description
 * The hierarchy's option model — defines what a valid option looks like.
 */


import type { Hierarchy } from "./Hierarchy";
import { clone } from "../utils";



/**
 * @description
 * The value types an option can be declared with.
 */
export type OptionType = "string" | "boolean" | "array" | "object";


/**
 * @description
 * Base class for every hierarchy option and sub-option.
 * Options that need to inherit, read from outer elements or render override the matching methods.
 */
export default class Option {
  /** The name / label of the option. */
  public readonly label: string;

  /** The expected data type of the option's value. */
  public readonly type: OptionType;

  /** The set of allowed values (or allowed array entries); empty means unrestricted. */
  public readonly values: ReadonlyArray<unknown>;

  /** The sub-options of an object option, keyed by label. */
  public readonly keys: Readonly<Record<string, Option>> | undefined;

  /** The default value, built from the sub-options' defaults when there are any. */
  private readonly defaultValue: unknown;


  /**
   * @description
   * Constructs an Option with the given metadata.
   *
   * @param label The name of the option.
   * @param type The expected data type.
   * @param values The set of allowed values.
   * @param defaultValue The default value (ignored when `keys` are given).
   * @param keys The sub-options of an object option.
   */
  constructor(
    label: string,
    type: OptionType,
    values: ReadonlyArray<unknown> = [],
    defaultValue: unknown = undefined,
    keys?: Record<string, Option>,
  ) {
    this.label = label;
    this.type = type;
    this.values = values;
    this.keys = keys;
    this.defaultValue = defaultValue;
  }


  /**
   * @description
   * Builds a fresh copy of the default value, so that no two hierarchies ever share
   * (and mutate) the same default object.
   *
   * @returns {unknown} A new default value.
   */
  public createDefault(): unknown {
    if (this.keys !== undefined) {
      return Object.fromEntries(
        Object.values(this.keys).map((key: Option) => [key.label, key.createDefault()]),
      );
    }

    return clone(this.defaultValue);
  }


  /**
   * @description
   * Performs the inheritance process for this option on a hierarchy.
   * No-op unless overridden.
   *
   * @param _hierarchy The hierarchy object that is inheriting.
   * @param _value The (already copied) value to inherit.
   * @returns {void}
   */
  public inherit(_hierarchy: Hierarchy, _value: unknown): void {}


  /**
   * @description
   * Extracts this option's value from an outer HTML element.
   * Returns `null` (nothing to inherit) unless overridden.
   *
   * @param _element The HTML element to read from.
   * @returns {unknown} The extracted value, or `null` if not applicable.
   */
  public getKeyFromElement(_element: Element): unknown {
    return null;
  }


  /**
   * @description
   * Applies this option's value to a rendered HTML element. No-op unless overridden.
   *
   * @param _element The HTML element to apply values to.
   * @param _hierarchy The hierarchy object supplying the values.
   * @returns {void}
   */
  public parse(_element: HTMLElement, _hierarchy: Hierarchy): void {}


  /**
   * @description
   * Returns the type name of a value, distinguishing arrays and `null` from objects.
   *
   * @param value The value to inspect.
   * @returns {string} The detected type.
   */
  public static typeOf(value: unknown): string {
    if (value === null) {
      return "null";
    }

    return Array.isArray(value) ? "array" : typeof value;
  }


  /**
   * @description
   * Validates that a value has the option's expected data type.
   *
   * @param value The value to check.
   * @param option The option the value belongs to.
   * @returns {{ valid: boolean; type: string }} Validation result and the detected type.
   */
  public static validateOptionType(value: unknown, option: Option): { valid: boolean; type: string } {
    const type = Option.typeOf(value);

    return { valid: type === option.type, type };
  }


  /**
   * @description
   * Validates that a value is one of the option's allowed values.
   * For array options, every entry must be allowed.
   *
   * @param value The value to check.
   * @param option The option the value belongs to.
   * @returns {boolean} `true` when the value is valid.
   */
  public static validateOptionValue(value: unknown, option: Option): boolean {
    if (option.values.length === 0) {
      return true;
    }

    const entries = option.type === "array" ? value as Array<unknown> : [value];

    return entries.every((entry: unknown) => option.values.includes(entry));
  }
}
