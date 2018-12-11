/**
 * The hierarchy's option model.
 * What defines a valid option.
 */

interface IOption {

    name: string;
    type: string;
    default: any;
    values: Array<any>;

    isValid(): boolean;
}

export default abstract class Option implements IOption {

    /**
     * The name of the option.
     */
    public name: string;

    /**
     * The data type of the option.
     */
    public type: string;

    /**
     * The default value of the option.
     */
    public default: any;

    /**
     * The possible values of the option.
     */
    public values: Array<any>;

    /**
     * Constructor with parameters.
     * 
     * @param name The name of the option.
     * @param type The data type of the option.
     * @param defaultValue The default value of the option.
     * @param values The possible values of the option.
     */
    constructor(name: string, type: string, defaultValue: any, values: Array<any>) {

        this.name = name;
        this.type = type;
        this.default = defaultValue;
        this.values = values;
    }

    /**
     * Checks if the option is valid.
     */
    abstract isValid = (): boolean => this.name != null && typeof this.name == this.type;
}
