"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = require("./options");
var InvalidOptionError_1 = __importDefault(require("./errors/InvalidOptionError"));
exports.isValidHierarchy = function (hierarchy) { return hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy); };
exports.isValidHTMLElement = function (target) { return target != null && target instanceof HTMLElement; };
function validateOptions(hierarchy) {
    var _loop_1 = function (option) {
        var optionExists = options_1.options
            .filter(function (opt) { return opt.name === option; })
            .length > 0;
        if (optionExists === false) {
            throw new InvalidOptionError_1.default(option);
        }
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
//# sourceMappingURL=validator.js.map