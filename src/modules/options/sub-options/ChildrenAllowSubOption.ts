/**
 * The allow sub option model for the from-children option.
 */


import Option from "../../models/Option";


export default class ChildrenAllowSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('allow', 'boolean', [], true);
    }
}
