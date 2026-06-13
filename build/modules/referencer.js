"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTemplate = void 0;
exports.process = process;
const idfier_1 = require("./idfier");
const options_1 = require("./options");
const validator_1 = require("./validator");
const isTemplate = (hierarchy) => (0, idfier_1.getTemmeId)(hierarchy).length === 4;
exports.isTemplate = isTemplate;
function process(hierarchy) {
    const references = getReferences(hierarchy);
    (0, validator_1.validateReferences)(hierarchy, references);
    (0, validator_1.validateTemplateReference)(hierarchy, references);
    (0, validator_1.validateParentToChildReference)(hierarchy, references);
    processTemplates(hierarchy, references.filter((ref) => (0, exports.isTemplate)(ref.hierarchy)));
    processHierarchies(hierarchy, references);
}
function processTemplates(hierarchy, references) {
    if ("templates" in hierarchy && hierarchy.templates.length > 0) {
        hierarchy.templates.forEach((template) => {
            if (template.from.ref !== "") {
                for (const key in template) {
                    const option = options_1.options.filter((opt) => opt.label === key)[0];
                    const referencedHierarchy = references.filter((ref) => ref.hierarchy.ref === template.from.ref)[0];
                    option.inherit(template, referencedHierarchy.hierarchy[key]);
                }
            }
        });
    }
    if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
        hierarchy.childNodes.forEach((child) => {
            processTemplates(child, references);
        });
    }
}
function processHierarchies(hierarchy, references) {
    if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
        hierarchy.childNodes.forEach((child) => {
            processHierarchies(child, references);
        });
    }
    if (hierarchy.from.ref !== "") {
        if (hierarchy.from.ref[0] === "@") {
            const selector = hierarchy.from.ref.substring(1);
            const element = document.querySelector(selector);
            for (const key in hierarchy) {
                const option = options_1.options.filter((opt) => opt.label === key)[0];
                const value = option.getKeyFromElement(element);
                if (value != null) {
                    option.inherit(hierarchy, value);
                }
            }
        }
        else {
            const referencedHierarchy = references.filter((ref) => ref.hierarchy.ref === hierarchy.from.ref)[0];
            const toInherit = hierarchy.from.include.filter((opt) => !hierarchy.from.exclude.includes(opt));
            toInherit.forEach((optName) => {
                const option = options_1.options.filter((opt) => opt.label === optName)[0];
                option.inherit(hierarchy, referencedHierarchy.hierarchy[optName]);
            });
        }
    }
}
function getReferences(hierarchy, depth = 0) {
    const references = [];
    depth++;
    if (hierarchy.ref !== "") {
        references.push({ depth, hierarchy });
    }
    if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
        hierarchy.childNodes.forEach((child) => {
            references.push(...getReferences(child, depth));
        });
    }
    if ("templates" in hierarchy && hierarchy.templates.length > 0) {
        hierarchy.templates.forEach((template) => {
            references.push(...getReferences(template, depth - 1));
        });
    }
    return references;
}
