/**
 * The placement sub option model.
 */


import Option from "../../models/Option";


export default class PlacementSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('placement', 'string', 'after', ['after', 'before']);
    }

    /**
     * Checks if the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
