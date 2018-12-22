/**
 * The dataset option model.
 */


import Option from "../models/Option";


export default class DatasetOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('dataset', 'object', {}, []);
    }
}
