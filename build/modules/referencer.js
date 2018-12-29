"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("./validator");
var idfier_1 = require("./idfier");
var options_1 = require("./options");
function process(hierarchy) {
    try {
        var references = getReferences(hierarchy);
        validator_1.validateReferences(hierarchy, references);
        validator_1.validateTemplateReference(hierarchy, references);
        validator_1.validateParentToChildReference(hierarchy, references);
        processTemplates(hierarchy, references.filter(function (ref) { return exports.isTemplate(ref.hierarchy); }));
        processHierarchies(hierarchy, references);
    }
    catch (e) {
        throw e;
    }
}
exports.process = process;
exports.isTemplate = function (hierarchy) { return idfier_1.getTemmeId(hierarchy).length === 4; };
function processTemplates(hierarchy, references) {
    try {
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {
            hierarchy.templates.forEach(function (template) {
                if (template.from.ref !== "") {
                    var _loop_1 = function (key) {
                        var option = options_1.options.filter(function (opt) { return opt.label === key; })[0], referencedHierarchy = references.filter(function (ref) { return ref.hierarchy.ref === template.from.ref; })[0];
                        option.inherit(template, referencedHierarchy.hierarchy[key]);
                    };
                    for (var key in template) {
                        _loop_1(key);
                    }
                }
            });
        }
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach(function (child) {
                processTemplates(child, references);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
function processHierarchies(hierarchy, references) {
    try {
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach(function (child) {
                processHierarchies(child, references);
            });
        }
        if (hierarchy.from.ref !== "") {
            if (hierarchy.from.ref[0] === "@") {
                var selector = hierarchy.from.ref.substring(1), element = document.querySelector(selector);
                var _loop_2 = function (key) {
                    var option = options_1.options.filter(function (opt) { return opt.label === key; })[0], value = option.getKeyFromElement(element);
                    if (value != null) {
                        option.inherit(hierarchy, value);
                    }
                };
                for (var key in hierarchy) {
                    _loop_2(key);
                }
            }
            else {
                var referencedHierarchy_1 = references.filter(function (ref) { return ref.hierarchy.ref === hierarchy.from.ref; })[0], toInherit = hierarchy.from.include.filter(function (opt) { return hierarchy.from.exclude.indexOf(opt) === -1; });
                toInherit.forEach(function (optName) {
                    var option = options_1.options.filter(function (opt) { return opt.label === optName; })[0];
                    option.inherit(hierarchy, referencedHierarchy_1.hierarchy[optName]);
                });
            }
        }
    }
    catch (e) {
        throw e;
    }
}
function getReferences(hierarchy, depth) {
    if (depth === void 0) { depth = 0; }
    var references = [];
    depth++;
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
            references.push.apply(references, getReferences(template, depth - 1));
        });
    }
    return references;
}
//# sourceMappingURL=referencer.js.map