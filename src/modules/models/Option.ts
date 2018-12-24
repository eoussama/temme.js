/**
 * The hierarchy's option model.
 * What defines a valid option.
 */


/**
 * The interface that indicates
 * sub-options.
 */
export interface IKeys {

    keys: any;
}


/**
 * The option's class.
 */
export default abstract class Option {

    /**
     * The name of the option.
     */
    public label: string;

    /**
     * The data type of the option.
     */
    public type: string;

    /**
     * The possible values of the option.
     */
    public values: Array<any>;

    /**
     * The default value of the option.
     */
    public default: any;

    /**
     * Constructor with parameters.
     * 
     * @param label The name of the option.
     * @param type The data type of the option.
     * @param defaultValue The default value of the option.
     * @param values The possible values of the option.
     */
    constructor(label: string, type: string, values: Array<any>, defaultValue: any) {

        this.label = label;
        this.type = type;
        this.values = values;
        this.default = defaultValue;
    }


    /**
     * Validates the option's name.
     * 
     * @param matchingOption The option object with the matching name.
     * 
     */
    public static validateOptionName = (matchingOption: Option): boolean => matchingOption != null;


    /**
     * Validates the data type of the option.
     * 
     * @param value The value of the option.
     * @param matchingOption The option object with the matching name.
     * 
     */
    public static validateOptionType(value: any, matchingOption: Option): { valid: boolean, type: string } {

        let optionType: string = "";

        // Getting the appropriate data type.
        if (Array.isArray(value)) {
            optionType = "array";
        } else {
            optionType = typeof value;
        }

        return {
            valid: optionType === matchingOption.type,
            type: optionType
        }
    }


    /**
     * Validates the option's value.
     * 
     * @param value The value to check.
     * @param matchingOption The option object with the matching name.
     * 
     */
    public static validateOptionValue(value: any, matchingOption: Option): boolean {
        
        // Checking if the matching object is valid.
        if (matchingOption != null && matchingOption.values.length > 0) {
            
            // Checking if the value is not a valid one.
            return matchingOption.values.indexOf(value) !== -1;
        }

        return true;
    }
}
