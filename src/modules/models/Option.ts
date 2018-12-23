/**
 * The hierarchy's option model.
 * What defines a valid option.
 */


import InvalidOptionNameError from "../errors/InvalidOptionNameError";
import InvalidOptionTypeError from "../errors/InvalidOptionTypeError";
import InvalidOptionValueError from "../errors/InvalidOptionValueError";


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
     * @param option The option to check.
     * @param matchingOption The option object with the matching name.
     * 
     * @throws InvalidOptionNameError
     */
    public static validateOptionName(option: string, matchingOption: Option): void {

        // If the option is invalid, throw an error.
        if (matchingOption == null) {
            throw new InvalidOptionNameError(option);
        }
    }


    /**
     * Validates the data type of the option.
     * 
     * @param option The option to check.
     * @param value The value of the option.
     * @param matchingOption The option object with the matching name.
     * 
     * @throws InvalidOptionTypeError
     */
    public static validateOptionType(option: string, value: any, matchingOption: Option): void {

        let optionType: string = "";

        // Getting the appropriate data type.
        if (Array.isArray(value)) {
            optionType = "array";
        } else {
            optionType = typeof value;
        }

        if (optionType !== matchingOption.type) {
            throw new InvalidOptionTypeError(option, optionType);
        }
    }


    /**
     * Validates the option's value.
     * 
     * @param option The option to check.
     * @param value The value to check.
     * @param matchingOption The option object with the matching name.
     * 
     * @throws InvalidOptionValueError
     */
    public static validateOptionValue(option: string, value: any, matchingOption: Option): void {

        // Checking if the matching object is valid.
        if (matchingOption != null && matchingOption.values.length > 0) {

            // Checking if the value is not a valid one.
            if (matchingOption.values.indexOf(value) === -1) {
                throw new InvalidOptionValueError(option, value);
            }
        }
    }
}
