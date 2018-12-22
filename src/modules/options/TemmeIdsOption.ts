/**
 * The reference option model.
 */


import Option from "../models/Option";


export default class TemmeIdsOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('temmeIds', 'array', [], []);
    }
}
