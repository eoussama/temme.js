/**
 * The from option model.
 */


import Option from "../models/Option";
import RefOption from "./RefOption";
import ModeSubOption from "./sub-options/ModeSubOption";
import ChildrenSubOption from "./sub-options/ChildrenSubOption";


export default class FromOption extends Option {

    /**
     * The sub keys of the `from` option.
     */
    public keys: FromKeys = new FromKeys();

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('from', 'object', '', []);
    }

    /**
     * Checks if the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}


class FromKeys {

    /**
     * The reference sub option.
     */
    public ref: RefOption = new RefOption();

    /**
     * The inheritance mode.
     */
    public mode: ModeSubOption = new ModeSubOption();

    /**
     * The inheritance mode.
     */
    public children: ChildrenSubOption = new ChildrenSubOption();
}
