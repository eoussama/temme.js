/**
 * The templates option model.
 */


import Option from "../models/Option";


export default class TemplatesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('templates', 'array', [], []);
    }
}
