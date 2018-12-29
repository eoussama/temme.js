"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = require("./options");
function sanitize(hierarchy) {
    try {
        options_1.options.forEach(function (opt) {
            if (!(opt.label in hierarchy)) {
                hierarchy[opt.label] = opt.default;
            }
            else {
                if ('keys' in opt) {
                    for (var key in opt.keys) {
                        var subOption = opt.keys[key];
                        sanitizeOption(hierarchy[opt.label], subOption);
                    }
                }
            }
        });
        hierarchy.classes = hierarchy.classes.filter(function (cls, index) { return hierarchy.classes.indexOf(cls) === index; });
        hierarchy.classes.sort();
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach(function (child) {
                sanitize(child);
            });
        }
        if ('templates' in hierarchy && hierarchy.templates.length > 0) {
            hierarchy.templates.forEach(function (template) {
                sanitizeTemplate(template);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
exports.sanitize = sanitize;
function sanitizeOption(hierarchy, option) {
    try {
        if (!(option.label in hierarchy)) {
            hierarchy[option.label] = option.default;
        }
        else if (option.label === 'include' || option.label === 'exclude') {
            hierarchy[option.label] = hierarchy[option.label].filter(function (opt, index) { return hierarchy[option.label].indexOf(opt) === index; });
            hierarchy[option.label].sort();
        }
        if ('keys' in option) {
            for (var key in option.keys) {
                var subHierarchy = hierarchy[option.label], subOption = option.keys[key];
                sanitizeOption(subHierarchy, subOption);
            }
        }
    }
    catch (e) {
        throw e;
    }
}
function sanitizeTemplate(template) {
    try {
        options_1.options
            .filter(function (opt) { return options_1.forbiddenOptions.indexOf(opt.label) === -1; })
            .forEach(function (opt) {
            if (!(opt.label in template)) {
                template[opt.label] = opt.default;
            }
            else {
                if ('keys' in opt) {
                    for (var key in opt.keys) {
                        var subOption = opt.keys[key];
                        sanitizeOption(template[opt.label], subOption);
                    }
                }
            }
        });
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=sanitizer.js.map