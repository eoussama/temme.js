/**
 * The dataset option model.
 */


import type { Hierarchy } from "../models/Hierarchy";
import type { IParser } from "../models/Option";
import Option from "../models/Option";



/**
 *
 */
export default class DatasetOption extends Option implements IParser {
  /**
   * Parameterless constructor.
   */
  constructor() {
    super("dataset", "object", [], {}, true);
  }

  /**
   * Performs inheritance process on an option.
   *
   * @param hierarchy The hierarchy object that inherits.
   * @param dataset The dataset to inherit.
   */
  public inherit(hierarchy: any, dataset: any): void {
    const dt: any = { ...dataset };

    if (hierarchy.from.mode === "append") {
      for (const dataKey in hierarchy.dataset) {
        dt[dataKey] = hierarchy.dataset[dataKey];
      }
    }
    else {
      for (const dataKey in hierarchy.dataset) {
        if (!(dataKey in dt)) {
          dt[dataKey] = hierarchy.dataset[dataKey];
        }
      }
    }

    hierarchy.dataset = dt;
  }


  /**
   * Gets datatset from a given HTML element.
   *
   * @param element The HTML element to target.
   */
  public getKeyFromElement(element: HTMLElement): any {
    const dataset: any = {};

    for (const dataKey in element.dataset) {
      dataset[dataKey] = element.dataset[dataKey];
    }

    return dataset;
  }


  /**
   * Sets the dataset for an HTML element.
   *
   * @param element The HTML element to set the dataset for
   * @param hierarchy
   */
  public parse(element: HTMLElement, hierarchy: Hierarchy) {
    for (const dataKey in hierarchy.dataset) {
      element.dataset[dataKey] = (<any>hierarchy).dataset[dataKey];
    }
  }
}
