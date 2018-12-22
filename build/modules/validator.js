"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = __importDefault(require("./models/Option"));
var options_1 = require("./options");
exports.isValidHierarchy = function (hierarchy) { return hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy); };
exports.isValidHTMLElement = function (target) { return target != null && target instanceof HTMLElement; };
function validateOptions(hierarchy) {
    try {
        var _loop_1 = function (option) {
            var matchingOption = options_1.options.filter(function (opt) { return opt.name === option; })[0], optionValue = hierarchy[option];
            Option_1.default.validateOptionName(option, matchingOption);
            Option_1.default.validateOptionType(option, optionValue, matchingOption);
            Option_1.default.validateOptionValue(option, optionValue, matchingOption);
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
    catch (e) {
        throw e;
    }
}
exports.validateOptions = validateOptions;
//# sourceMappingURL=validator.js.map