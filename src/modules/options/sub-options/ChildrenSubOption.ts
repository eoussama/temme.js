/**
 * The children sub option model.
 */


import Option, { IKeys } from "../../models/Option";
import PlacementSubOption from "./PlacementSubOption";
import ChildrenAllowSubOption from "./ChildrenAllowSubOption";


/**
 * The children sub option class
 * of the from option.
 */
export default class ChildrenSubOption extends Option implements IKeys {

    /**
     * The keys of the `children` sub option.
     */
    public keys: FromChildrenKeys = {
        allow: new ChildrenAllowSubOption(),
        placement: new PlacementSubOption()
    };

    /**
     * Parameterless constructor.
     */
    constructor() {

        super('children', 'object', [], {
            allow: (new ChildrenAllowSubOption()).default,
            placement: (new PlacementSubOption()).default
        });
    }
}


/**
 * The FromChildrenKeys type.
 */
type FromChildrenKeys = {

    /**
     * Whether or not to allow children inheritance.
     */
    allow: ChildrenAllowSubOption;

    /**
     * The inheritance mode.
     */
    placement: PlacementSubOption;
}
