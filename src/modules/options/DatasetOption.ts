/**
 * The dataset option model.
 */


import Option, { IParser } from "../models/Option";
import { Hierarchy } from '../models/Hierarchy';


export default class DatasetOption extends Option implements IParser {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('dataset', 'object', [], {});
    }

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param dataset The dataset to inherit.
     */
    public inherit(hierarchy: any, dataset: any): void {

        const dt: any = dataset;

        if (hierarchy.from.mode === 'append') {

            for (const key in hierarchy.dataset) {

                dt[key] = hierarchy.dataset[key];
            }
        } else {

            for (const key in hierarchy.dataset) {

                if (!(key in dt)) {

                    dt[key] = hierarchy.dataset[key];
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

        let dataset: any = {};

        for (const dataKey in element.dataset) {

            dataset[dataKey] = element.dataset[dataKey];
        }

        return dataset;
    }


    /**
     * Sets the dataset for an HTML element.
     * 
     * @param element The HTML element to set the dataset for
     */
    public parse (element: HTMLElement, hierarchy: Hierarchy) {

        for (const dataKey in hierarchy.dataset) {

            element.dataset[dataKey] = (<any>hierarchy).dataset[dataKey];
        }
    }
}
