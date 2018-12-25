/**
 * The children option model.
 */


import Option from "../models/Option";


export default class ChildrenNodesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('childNodes', 'array', [], []);
    }
}
