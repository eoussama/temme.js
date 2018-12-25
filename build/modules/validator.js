"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = __importDefault(require("./models/Option"));
var options_1 = require("./options");
var InvalidTemplateOptionError_1 = __importDefault(require("./errors/InvalidTemplateOptionError"));
var InvalidOptionNameError_1 = __importDefault(require("./errors/InvalidOptionNameError"));
var InvalidOptionTypeError_1 = __importDefault(require("./errors/InvalidOptionTypeError"));
var InvalidOptionValueError_1 = __importDefault(require("./errors/InvalidOptionValueError"));
var InvalidSubOptionNameError_1 = __importDefault(require("./errors/InvalidSubOptionNameError"));
var InvalidSubOptionTypeError_1 = __importDefault(require("./errors/InvalidSubOptionTypeError"));
var InvalidSubOptionValueError_1 = __importDefault(require("./errors/InvalidSubOptionValueError"));
var InvalidReferencingOptionError_1 = __importDefault(require("./errors/InvalidReferencingOptionError"));
var InvalidTemplateError_1 = __importDefault(require("./errors/InvalidTemplateError"));
exports.isValidHierarchy = function (hierarchy) { return hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy); };
exports.isValidHTMLElement = function (target) { return target != null && target instanceof HTMLElement; };
function validateOptions(hierarchy) {
    try {
        var _loop_1 = function (option) {
            var matchingOption = options_1.options.filter(function (opt) { return opt.label === option; })[0], optionValue = hierarchy[option];
            if (Option_1.default.validateOptionName(matchingOption) === false) {
                throw new InvalidOptionNameError_1.default(option);
            }
            var typeValidation = Option_1.default.validateOptionType(optionValue, matchingOption);
            if (typeValidation.valid === false) {
                throw new InvalidOptionTypeError_1.default(option, typeValidation.type);
            }
            if (Option_1.default.validateOptionValue(optionValue, matchingOption) === false) {
                throw new InvalidOptionValueError_1.default(option, optionValue);
            }
            if ('keys' in matchingOption) {
                var subOptions = matchingOption.keys;
                validateSubOptions(option, optionValue, subOptions);
            }
        };
        for (var option in hierarchy) {
            _loop_1(option);
        }
        if (validateReferences(hierarchy) === false) {
            throw new InvalidReferencingOptionError_1.default("The “from” option must always have a “ref” sub-option");
        }
        if ('templates' in hierarchy) {
            hierarchy.templates.forEach(function (template) {
                validateTemplates(template);
            });
        }
        if ('childNodes' in hierarchy) {
            hierarchy.childNodes.forEach(function (child) {
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
    try {
        if (!('ref' in template)) {
            throw new InvalidTemplateError_1.default("");
        }
        for (var option in template) {
            if (options_1.forbiddenOptions.indexOf(option) > -1) {
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
function validateSubOptions(optionName, optionValue, subOptions) {
    var _loop_2 = function (subOption) {
        var matchingSubOption = options_1.getSubOptions(optionName).filter(function (subOptions) { return subOptions.label === subOption; })[0], subOptionValue = optionValue[subOption];
        if (subOption in subOptions) {
            if (Option_1.default.validateOptionName(matchingSubOption) === false) {
                throw new InvalidSubOptionNameError_1.default(optionName, subOption);
            }
            var typeValidation = Option_1.default.validateOptionType(subOptionValue, matchingSubOption);
            if (typeValidation.valid === false) {
                throw new InvalidSubOptionTypeError_1.default(subOption, typeValidation.type);
            }
            if (Option_1.default.validateOptionValue(subOptionValue, matchingSubOption) === false) {
                throw new InvalidSubOptionValueError_1.default(subOption, subOptionValue);
            }
            if ('keys' in matchingSubOption) {
                var subOptionValue_1 = optionValue[subOption];
                validateSubOptions(subOption, subOptionValue_1, matchingSubOption.keys);
            }
        }
        else {
            throw new InvalidSubOptionNameError_1.default(optionName, subOption);
        }
    };
    for (var subOption in optionValue) {
        _loop_2(subOption);
    }
}
function validateReferences(hierarchy) {
    if ('from' in hierarchy) {
        return 'ref' in hierarchy.from;
    }
    return true;
}
//# sourceMappingURL=validator.js.map