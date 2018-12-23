"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option = (function () {
    function Option(label, type, values, defaultValue) {
        this.label = label;
        this.type = type;
        this.values = values;
        this.default = defaultValue;
    }
    Option.validateOptionName = function (matchingOption) {
        return matchingOption != null;
    };
    Option.validateOptionType = function (value, matchingOption) {
        var optionType = "";
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
    };
    Option.validateOptionValue = function (value, matchingOption) {
        if (matchingOption != null && matchingOption.values.length > 0) {
            return matchingOption.values.indexOf(value) !== -1;
        }
        return true;
    };
    return Option;
}());
exports.default = Option;
//# sourceMappingURL=Option.js.map