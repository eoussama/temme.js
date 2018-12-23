/**
 * The content type sub option model.
 */


import Option from "../../models/Option";


export default class ContentTypeSubOption extends Option {

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('type', 'string', ['text', 'html'], 'text');
    }
}
