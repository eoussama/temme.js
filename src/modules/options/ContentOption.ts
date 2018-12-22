/**
 * The text option model.
 */


import Option from "../models/Option";
import ValueSubOption from "./sub-options/ValueSubOption";
import ContentTypeSubOption from "./sub-options/ContentTypeSubOption";


/**
 * The content option class.
 */
export default class ContentOption extends Option {

    /**
     * The keys of the `content` option.
     */
    public keys: ContentKeys = {
        type: new ContentTypeSubOption(),
        value: new ValueSubOption()
    };

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('content', 'string', '', []);
    }
}


/**
 * The ContentKeys type.
 */
type ContentKeys = {

    type: ContentTypeSubOption;
    value: ValueSubOption;
}
