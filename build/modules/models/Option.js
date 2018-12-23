"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidOptionNameError_1 = __importDefault(require("../errors/InvalidOptionNameError"));
var InvalidOptionTypeError_1 = __importDefault(require("../errors/InvalidOptionTypeError"));
var InvalidOptionValueError_1 = __importDefault(require("../errors/InvalidOptionValueError"));
var Option = (function () {
    function Option(label, type, values, defaultValue) {
        this.label = label;
        this.type = type;
        this.values = values;
        this.default = defaultValue;
    }
    Option.validateOptionName = function (option, matchingOption) {
        if (matchingOption == null) {
            throw new InvalidOptionNameError_1.default(option);
        }
    };
    Option.validateOptionType = function (option, value, matchingOption) {
        var optionType = "";
        if (Array.isArray(value)) {
            optionType = "array";
        }
        else {
            optionType = typeof value;
        }
        if (optionType !== matchingOption.type) {
            throw new InvalidOptionTypeError_1.default(option, optionType);
        }
    };
    Option.validateOptionValue = function (option, value, matchingOption) {
        if (matchingOption != null && matchingOption.values.length > 0) {
            if (matchingOption.values.indexOf(value) === -1) {
                throw new InvalidOptionValueError_1.default(option, value);
            }
        }
    };
    return Option;
}());
exports.default = Option;
//# sourceMappingURL=Option.js.map