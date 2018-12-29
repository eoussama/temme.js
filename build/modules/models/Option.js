"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option = (function () {
    function Option(label, type, values, defaultValue, inherited) {
        if (inherited === void 0) { inherited = false; }
        this.label = label;
        this.type = type;
        this.values = values;
        this.default = defaultValue;
        this.inherited = inherited;
    }
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
            if (matchingOption.label === 'include' || matchingOption.label === 'exclude') {
                for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
                    var val = value_1[_i];
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
    };
    Option.validateOptionName = function (matchingOption) { return matchingOption != null; };
    return Option;
}());
exports.default = Option;
//# sourceMappingURL=Option.js.map