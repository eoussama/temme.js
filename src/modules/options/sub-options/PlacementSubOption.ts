/**
 * The placement sub option model.
 */


import Option from "../../models/Option";


export default class PlacementSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('placement', 'string', ['after', 'before'], 'after');
    }
}
