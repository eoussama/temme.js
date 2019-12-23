"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("./models/Option"));
const options_1 = require("./options");
const InvalidTemplateOptionError_1 = __importDefault(require("./errors/InvalidTemplateOptionError"));
const InvalidOptionNameError_1 = __importDefault(require("./errors/InvalidOptionNameError"));
const InvalidOptionTypeError_1 = __importDefault(require("./errors/InvalidOptionTypeError"));
const InvalidOptionValueError_1 = __importDefault(require("./errors/InvalidOptionValueError"));
const InvalidSubOptionNameError_1 = __importDefault(require("./errors/InvalidSubOptionNameError"));
const InvalidSubOptionTypeError_1 = __importDefault(require("./errors/InvalidSubOptionTypeError"));
const InvalidSubOptionValueError_1 = __importDefault(require("./errors/InvalidSubOptionValueError"));
const InvalidReferencingOptionError_1 = __importDefault(require("./errors/InvalidReferencingOptionError"));
const InvalidReferenceOptionValueError_1 = __importDefault(require("./errors/InvalidReferenceOptionValueError"));
const InvalidReferenceError_1 = __importDefault(require("./errors/InvalidReferenceError"));
const InvalidTemplateError_1 = __importDefault(require("./errors/InvalidTemplateError"));
const idfier_1 = require("./idfier");
const InvalidTemplateReferencingError_1 = __importDefault(require("./errors/InvalidTemplateReferencingError"));
const ReferenceOutOfScopeError_1 = __importDefault(require("./errors/ReferenceOutOfScopeError"));
exports.isValidHierarchy = (hierarchy) => hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy);
exports.isValidHTMLElement = (target) => target != null && target instanceof HTMLElement;
function validateOptions(hierarchy) {
    try {
        for (const option in hierarchy) {
            const matchingOption = options_1.options.filter((opt) => opt.label === option)[0], optionValue = hierarchy[option];
            if (Option_1.default.validateOptionName(matchingOption) === false) {
                throw new InvalidOptionNameError_1.default(option);
            }
            const typeValidation = Option_1.default.validateOptionType(optionValue, matchingOption);
            if (typeValidation.valid === false) {
                throw new InvalidOptionTypeError_1.default(option, typeValidation.type);
            }
            if (Option_1.default.validateOptionValue(optionValue, matchingOption) === false) {
                throw new InvalidOptionValueError_1.default(option, optionValue);
            }
            if ('keys' in matchingOption) {
                const subOptions = matchingOption.keys;
                validateSubOptions(option, optionValue, subOptions);
            }
        }
        if (validateReferencingOption(hierarchy) === false) {
            throw new InvalidReferencingOptionError_1.default("The “from” option must always have a “ref” sub-option");
        }
        if (validateReferencingRange(hierarchy) === false) {
            throw new InvalidReferencingOptionError_1.default("The “from” option can't have both the “include” and “exclude” sub-options at the same time");
        }
        if ('templates' in hierarchy) {
            hierarchy.templates.forEach((template) => {
                validateTemplates(template);
            });
        }
        if ('childNodes' in hierarchy) {
            hierarchy.childNodes.forEach((child) => {
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
        for (const option in template) {
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
            const selector = hierarchy.from.ref.substring(1), element = document.querySelector(selector);
            if (element == null) {
                throw new InvalidReferenceOptionValueError_1.default(`No outer element corresponds to the selector “${selector}”`);
            }
        }
        else {
            if (validateReference(hierarchy, references) === false && hierarchy.from.ref !== "") {
                throw new InvalidReferenceError_1.default(hierarchy.from.ref);
            }
        }
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach((child) => {
                validateReferences(child, references);
            });
        }
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {
            hierarchy.templates.forEach((template) => {
                validateReferences(template, references);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
exports.validateReferences = validateReferences;
const validateReference = (hierarchy, references) => references.filter((ref) => ref.hierarchy.ref === hierarchy.from.ref && idfier_1.getTemmeId(hierarchy) !== idfier_1.getTemmeId(ref.hierarchy))[0] != null;
function validateTemplateReference(hierarchy, references) {
    try {
        const templates = hierarchy.templates;
        if (templates.length > 0) {
            templates.forEach((template) => {
                if (template.from.ref.length > 0) {
                    const referencedElement = references.filter((ref) => ref.hierarchy.ref === template.from.ref)[0], isTemplate = idfier_1.getTemmeId(referencedElement.hierarchy).length === 4;
                    if (isTemplate === false) {
                        throw new InvalidTemplateReferencingError_1.default(template.ref, template.from.ref);
                    }
                }
            });
        }
        hierarchy.childNodes.forEach((child) => {
            validateTemplateReference(child, references);
        });
    }
    catch (e) {
        throw e;
    }
}
exports.validateTemplateReference = validateTemplateReference;
function validateParentToChildReference(hierarchy, references, depth = 0) {
    try {
        const ref = hierarchy.from.ref;
        depth++;
        if (ref !== "" && ref[0] !== '@') {
            const referencedHierarchy = references.filter((refObject) => refObject.hierarchy.ref === ref && depth >= refObject.depth)[0];
            if (referencedHierarchy == null) {
                throw new ReferenceOutOfScopeError_1.default("");
            }
        }
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach((child) => {
                validateParentToChildReference(child, references, depth);
            });
        }
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {
            hierarchy.templates.forEach((template) => {
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
    for (const subOption in optionValue) {
        const matchingSubOption = options_1.getSubOptions(optionName).filter((subOptions) => subOptions.label === subOption)[0], subOptionValue = optionValue[subOption];
        if (subOption in subOptions) {
            if (Option_1.default.validateOptionName(matchingSubOption) === false) {
                throw new InvalidSubOptionNameError_1.default(optionName, subOption);
            }
            const typeValidation = Option_1.default.validateOptionType(subOptionValue, matchingSubOption);
            if (typeValidation.valid === false) {
                throw new InvalidSubOptionTypeError_1.default(subOption, typeValidation.type);
            }
            if (Option_1.default.validateOptionValue(subOptionValue, matchingSubOption) === false) {
                throw new InvalidSubOptionValueError_1.default(subOption, subOptionValue);
            }
            if ('keys' in matchingSubOption) {
                const subOptionValue = optionValue[subOption];
                validateSubOptions(subOption, subOptionValue, matchingSubOption.keys);
            }
        }
        else {
            throw new InvalidSubOptionNameError_1.default(optionName, subOption);
        }
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