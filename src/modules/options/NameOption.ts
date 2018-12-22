/**
 * The name option model.
 */


import Option from "../models/Option";


export default class NameOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('name', 'string', 'div', []);
    }
}
