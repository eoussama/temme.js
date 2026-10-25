/**
 * @description
 * The "dataset" option model — manages the `data-*` attributes of a hierarchy element.
 */


import type { AttributeValue, Hierarchy } from "../models/Hierarchy";
import Option from "../models/Option";



/**
 * @description
 * Defines the `dataset` option, which sets or inherits an element's `data-*` attributes.
 */
export default class DatasetOption extends Option {
  /**
   * @description
   * Constructs a DatasetOption with its default metadata.
   */
  constructor() {
    super("dataset", "object", [], {});
  }


  /**
   * @description
   * Inherits dataset entries. In "append" mode existing entries win; otherwise incoming ones do.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param dataset The dataset map to inherit.
   * @returns {void}
   */
  public override inherit(hierarchy: Hierarchy, dataset: unknown): void {
    const incoming = dataset as Record<string, string>;

    hierarchy.dataset = hierarchy.from.mode === "append"
      ? { ...incoming, ...hierarchy.dataset }
      : { ...hierarchy.dataset, ...incoming };
  }


  /**
   * @description
   * Reads the dataset of an outer element.
   *
   * @param element The HTML element to read from.
   * @returns {Record<string, string>} The element's dataset entries.
   */
  public override getKeyFromElement(element: Element): unknown {
    return Object.fromEntries(Object.entries((element as HTMLElement).dataset));
  }


  /**
   * @description
   * Applies the dataset entries to the target HTML element.
   *
   * @param element The HTML element to set dataset entries on.
   * @param hierarchy The hierarchy object supplying the dataset.
   * @returns {void}
   */
  public override parse(element: HTMLElement, hierarchy: Hierarchy): void {
    for (const [key, value] of Object.entries(hierarchy.dataset as Record<string, AttributeValue>)) {
      element.dataset[key] = String(value);
    }
  }
}
