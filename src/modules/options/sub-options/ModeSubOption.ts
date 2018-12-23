/**
 * The mode sub option model.
 */


import Option from "../../models/Option";


export default class ModeSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('mode', 'string', ['append', 'override'], 'append');
    }
}
