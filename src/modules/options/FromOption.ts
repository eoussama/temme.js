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

    /**
     * Performs inheritance process on an option.
     * 
     * @param hierarchy The hierarchy object that inherits.
     * @param from The from to inherit.
     */
    public inherit(hierarchy: any, from: any): void { }


    /**
     * Gets nothing from a given HTML element.
     * 
     * @param element The HTML element to target. 
     */
    public getKeyFromElement = (element: HTMLElement): any => null;
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
