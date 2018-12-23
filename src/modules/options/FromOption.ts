/**
 * The from option model.
 */



import Option, { IKeys } from "../models/Option";
import RefOption from "./RefOption";
import ModeSubOption from "./sub-options/ModeSubOption";
import ChildrenSubOption from "./sub-options/ChildrenSubOption";


export default class FromOption extends Option implements IKeys {

    /**
     * The keys of the `from` option.
     */
    public keys: FromKeys = {
        ref: new RefOption(),
        mode: new ModeSubOption(),
        children: new ChildrenSubOption()
    };

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('from', 'object', [], {
            ref: (new RefOption()).default,
            mode: (new ModeSubOption()).default,
            children: (new ChildrenSubOption()).default
        });
    }
}


/**
 * The FromKeys type.
 */
type FromKeys = {

    /**
     * The reference sub option.
     */
    ref: RefOption;

    /**
     * The inheritance mode.
     */
    mode: ModeSubOption;

    /**
     * The inheritance mode.
     */
    children: ChildrenSubOption;
}
