/**
 * The ID option model.
 */


import Option from "../models/Option";


export default class IdOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('id', 'string', '', []);
    }
}
