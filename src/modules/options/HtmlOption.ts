/**
 * The HTML option model.
 */


import Option from "../models/Option";


export default class HtmlOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('html', 'string', '', []);
    }

    /**
     * Checks ff the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
