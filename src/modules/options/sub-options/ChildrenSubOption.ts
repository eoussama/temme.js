/**
 * The children sub option model.
 */


import Option from "../../models/Option";
import PlacementSubOption from "./PlacementSubOption";


export default class ChildrenSubOption extends Option {

    /**
     * The sub keys of the `children` sub option.
     */
    public keys: ChildrenKeys = new ChildrenKeys();

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('children', 'object', '', []);
    }

    /**
     * Checks if the option is valid.
     */
    isValid = (): boolean => this.name != null && typeof this.name == this.type;
}

class ChildrenKeys {

    /**
     * Whether or not to allow children inheritance.
     */
    public allow: boolean = false;

    /**
     * The inheritance mode.
     */
    public placement: PlacementSubOption = new PlacementSubOption();
}
