/**
 * The dataset option model.
 */


import Option from "../models/Option";


export default class DatasetOption extends Option {

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
        
        if (hierarchy.from.mode === 'append') {

            for (const key in dataset) {

                if (!(key in hierarchy.dataset)) {

                    hierarchy.dataset[key] = dataset[key];
                }
            }
        } else {

            for (const key in dataset) {

                hierarchy.dataset[key] = dataset[key];
            }
        }
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
}
