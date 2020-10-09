"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Option {
    constructor(label, type, values, defaultValue, inherited = false) {
        this.label = label;
        this.type = type;
        this.values = values;
        this.default = defaultValue;
        this.inherited = inherited;
    }
    static validateOptionType(value, matchingOption) {
        let optionType = "";
        if (Array.isArray(value)) {
            optionType = "array";
        }
        else {
            optionType = typeof value;
        }
        return {
            valid: optionType === matchingOption.type,
            type: optionType
        };
    }
    static validateOptionValue(value, matchingOption) {
        if (matchingOption != null && matchingOption.values.length > 0) {
            if (matchingOption.label === 'include' || matchingOption.label === 'exclude') {
                for (const val of value) {
                    if (matchingOption.values.indexOf(val) === -1) {
                        return false;
                    }
                }
            }
            else {
                return matchingOption.values.indexOf(value) !== -1;
            }
        }
        return true;
    }
}
exports.default = Option;
Option.validateOptionName = (matchingOption) => matchingOption != null;
//# sourceMappingURL=Option.js.map