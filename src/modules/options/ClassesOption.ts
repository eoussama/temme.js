/**
 * The classes option model.
 */


import Option from "../models/Option";


export default class ClassesOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('classes', 'array', [], []);
    }
}
