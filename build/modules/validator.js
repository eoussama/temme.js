"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var InvalidOptionNameError_1 = __importDefault(require("./errors/InvalidOptionNameError"));
var InvalidOptionTypeError_1 = __importDefault(require("./errors/InvalidOptionTypeError"));
var InvalidOptionValueError_1 = __importDefault(require("./errors/InvalidOptionValueError"));
var options_1 = require("./options");
exports.isValidHierarchy = function (hierarchy) { return hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy); };
exports.isValidHTMLElement = function (target) { return target != null && target instanceof HTMLElement; };
function validateOptions(hierarchy) {
    var _loop_1 = function (option) {
        var matchingOption = options_1.options.filter(function (opt) { return opt.name === option; })[0], optionValue = hierarchy[option];
        validateOptionName(option, matchingOption);
        validateOptionType(option, optionValue, matchingOption);
        validateOptionValue(option, optionValue, matchingOption);
    };
    for (var option in hierarchy) {
        _loop_1(option);
    }
    if ('children' in hierarchy) {
        hierarchy.children.forEach(function (child) {
            validateOptions(child);
        });
    }
}
exports.validateOptions = validateOptions;
function validateOptionName(option, matchingOption) {
    if (matchingOption == null) {
        throw new InvalidOptionNameError_1.default(option);
    }
}
function validateOptionType(option, value, matchingOption) {
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
}
function validateOptionValue(option, value, matchingOption) {
    if (matchingOption != null && matchingOption.values.length > 0) {
        if (matchingOption.values.indexOf(value) === -1) {
            throw new InvalidOptionValueError_1.default(option, value);
        }
    }
}
//# sourceMappingURL=validator.js.map