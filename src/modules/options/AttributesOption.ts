/**
 * The attributes option model.
 */


import Option from "../models/Option";


export default class AttributesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('attributes', 'object', [], {});
    }
}
