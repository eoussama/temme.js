"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = __importDefault(require("./models/Option"));
var options_1 = require("./options");
var InvalidTemplateOptionError_1 = __importDefault(require("./errors/InvalidTemplateOptionError"));
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
        if ('templates' in hierarchy) {
            hierarchy.templates.forEach(function (template) {
                validateTemplates(template);
            });
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
function validateTemplates(template) {
    var forbiddenOptions = ['name', 'children', 'templates'];
    try {
        for (var option in template) {
            if (forbiddenOptions.indexOf(option) > -1) {
                throw new InvalidTemplateOptionError_1.default(option);
            }
            else {
                validateOptions(template);
            }
        }
    }
    catch (e) {
        throw e;
    }
}
exports.validateTemplates = validateTemplates;
//# sourceMappingURL=validator.js.map