"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("./validator");
function process(hierarchy) {
    try {
        var references = getReferences(hierarchy);
        validator_1.validateReferences(hierarchy, references);
        validator_1.validateTemplateReference(hierarchy, references);
    }
    catch (e) {
        throw e;
    }
}
exports.process = process;
function getReferences(hierarchy, depth) {
    if (depth === void 0) { depth = 0; }
    var references = [];
    if (hierarchy.ref !== "") {
        references.push({
            depth: depth,
            hierarchy: hierarchy
        });
    }
    if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
        hierarchy.childNodes.forEach(function (child) {
            references.push.apply(references, getReferences(child, depth));
        });
    }
    if ('templates' in hierarchy && hierarchy.templates.length > 0) {
        hierarchy.templates.forEach(function (template) {
            references.push.apply(references, getReferences(template, depth));
        });
    }
    return references;
}
//# sourceMappingURL=referencer.js.map