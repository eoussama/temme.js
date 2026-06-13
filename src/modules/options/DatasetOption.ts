/**
 * @description
 * The "dataset" option model — manages the data-* attributes of a hierarchy element.
 */


import type { Hierarchy } from "../models/Hierarchy";
import type { IParser } from "../models/Option";
import Option from "../models/Option";



/**
 * @description
 * Defines the `dataset` option, which sets or inherits an element's data-* attribute map.
 */
export default class DatasetOption extends Option implements IParser {
  /**
   * @description
   * Constructs a DatasetOption with its default metadata.
   *
   * @returns {void}
   */
  constructor() {
    super("dataset", "object", [], {}, true);
  }


  /**
   * @description
   * Inherits data-* entries from a referenced hierarchy.
   * In "append" mode existing entries take precedence; otherwise incoming ones do.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param dataset The dataset map to inherit.
   * @returns {void}
   */
  public inherit(hierarchy: Hierarchy, dataset: unknown): void {
    const incoming = dataset as Record<string, string>;
    const merged: Record<string, string> = { ...incoming };

    if (hierarchy.from.mode === "append") {
      for (const dataKey in hierarchy.dataset) {
        merged[dataKey] = hierarchy.dataset[dataKey];
      }
    }
    else {
      for (const dataKey in hierarchy.dataset) {
        if (!(dataKey in merged)) {
          merged[dataKey] = hierarchy.dataset[dataKey];
        }
      }
    }

    hierarchy.dataset = merged;
  }


  /**
   * @description
   * Extracts the data-* map from an existing HTML element.
   *
   * @param element The HTML element to read dataset entries from.
   * @returns {Record<string, string>} A map of data key names to their values.
   */
  public getKeyFromElement(element: HTMLElement): unknown {
    const dataset: Record<string, string> = {};

    for (const dataKey in element.dataset) {
      dataset[dataKey] = element.dataset[dataKey] ?? "";
    }

    return dataset;
  }


  /**
   * @description
   * Applies the dataset map to the target HTML element.
   *
   * @param element The HTML element to set data-* attributes on.
   * @param hierarchy The hierarchy object supplying the dataset.
   * @returns {void}
   */
  public parse(element: HTMLElement, hierarchy: Hierarchy): void {
    for (const dataKey in hierarchy.dataset) {
      element.dataset[dataKey] = hierarchy.dataset[dataKey];
    }
  }
}
