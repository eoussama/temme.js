/**
 * The reference option model.
 */


import Option from "../models/Option";


export default class RefOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('ref', 'string', [], '');
    }
}
