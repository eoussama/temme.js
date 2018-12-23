/**
 * The text option model.
 */


import Option, { IKeys } from "../models/Option";
import ValueSubOption from "./sub-options/ValueSubOption";
import ContentTypeSubOption from "./sub-options/ContentTypeSubOption";


/**
 * The content option class.
 */
export default class ContentOption extends Option implements IKeys {

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

        super('content', 'object', [], {
            type: (new ContentTypeSubOption()).default,
            value: (new ValueSubOption()).default
        });
    }
}


/**
 * The ContentKeys type.
 */
type ContentKeys = {

    type: ContentTypeSubOption;
    value: ValueSubOption;
}
