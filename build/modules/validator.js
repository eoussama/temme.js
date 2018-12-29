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
var InvalidReferenceOptionValueError_1 = __importDefault(require("./errors/InvalidReferenceOptionValueError"));
var InvalidReferenceError_1 = __importDefault(require("./errors/InvalidReferenceError"));
var InvalidTemplateError_1 = __importDefault(require("./errors/InvalidTemplateError"));
var idfier_1 = require("./idfier");
var InvalidTemplateReferencingError_1 = __importDefault(require("./errors/InvalidTemplateReferencingError"));
var ReferenceOutOfScopeError_1 = __importDefault(require("./errors/ReferenceOutOfScopeError"));
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
        if (validateReferencingOption(hierarchy) === false) {
            throw new InvalidReferencingOptionError_1.default("The “from” option must always have a “ref” sub-option");
        }
        if (validateReferencingRange(hierarchy) === false) {
            throw new InvalidReferencingOptionError_1.default("The “from” option can't have both the “include” and “exclude” sub-options at the same time");
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
function validateReferences(hierarchy, references) {
    try {
        if (hierarchy.ref[0] === '@') {
            throw new InvalidReferenceOptionValueError_1.default("");
        }
        if (hierarchy.from.ref[0] === '@') {
            var selector = hierarchy.from.ref.substring(1), element = document.querySelector(selector);
            if (element == null) {
                throw new InvalidReferenceOptionValueError_1.default("No outer element corresponds to the selector \u201C" + selector + "\u201D");
            }
        }
        else {
            if (validateReference(hierarchy, references) === false && hierarchy.from.ref !== "") {
                throw new InvalidReferenceError_1.default(hierarchy.from.ref);
            }
        }
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach(function (child) {
                validateReferences(child, references);
            });
        }
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {
            hierarchy.templates.forEach(function (template) {
                validateReferences(template, references);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
exports.validateReferences = validateReferences;
var validateReference = function (hierarchy, references) { return references.filter(function (ref) { return ref.hierarchy.ref === hierarchy.from.ref && idfier_1.getTemmeId(hierarchy) !== idfier_1.getTemmeId(ref.hierarchy); })[0] != null; };
function validateTemplateReference(hierarchy, references) {
    try {
        var templates = hierarchy.templates;
        if (templates.length > 0) {
            templates.forEach(function (template) {
                if (template.from.ref.length > 0) {
                    var referencedElement = references.filter(function (ref) { return ref.hierarchy.ref === template.from.ref; })[0], isTemplate = idfier_1.getTemmeId(referencedElement.hierarchy).length === 4;
                    if (isTemplate === false) {
                        throw new InvalidTemplateReferencingError_1.default(template.ref, template.from.ref);
                    }
                }
            });
        }
        hierarchy.childNodes.forEach(function (child) {
            validateTemplateReference(child, references);
        });
    }
    catch (e) {
        throw e;
    }
}
exports.validateTemplateReference = validateTemplateReference;
function validateParentToChildReference(hierarchy, references, depth) {
    if (depth === void 0) { depth = 0; }
    try {
        var ref_1 = hierarchy.from.ref;
        depth++;
        if (ref_1 !== "" && ref_1[0] !== '@') {
            var referencedHierarchy = references.filter(function (refObject) { return refObject.hierarchy.ref === ref_1 && depth >= refObject.depth; })[0];
            if (referencedHierarchy == null) {
                throw new ReferenceOutOfScopeError_1.default("");
            }
        }
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach(function (child) {
                validateParentToChildReference(child, references, depth);
            });
        }
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {
            hierarchy.templates.forEach(function (template) {
                validateParentToChildReference(template, references, depth);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
exports.validateParentToChildReference = validateParentToChildReference;
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
function validateReferencingOption(hierarchy) {
    if ('from' in hierarchy) {
        return 'ref' in hierarchy.from;
    }
    return true;
}
function validateReferencingRange(hierarchy) {
    if ('from' in hierarchy) {
        return !('include' in hierarchy.from && 'exclude' in hierarchy.from);
    }
    return true;
}
//# sourceMappingURL=validator.js.map