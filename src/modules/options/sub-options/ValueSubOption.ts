/**
 * The value sub option model.
 */


import Option from "../../models/Option";


export default class ValueSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('value', 'string', [], '');
    }
}
