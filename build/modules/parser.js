"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var idfier_1 = require("./idfier");
var options_1 = require("./options");
function parse(hierarchy, parent, nodeCallback, topParent) {
    if (topParent === void 0) { topParent = false; }
    try {
        var element_1 = parseElement(hierarchy, parent, topParent);
        nodeCallback(idfier_1.getTemmeId(hierarchy), hierarchy);
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach(function (child) {
                parse(child, element_1, nodeCallback);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
exports.parse = parse;
function parseElement(hierarchy, parent, topParent) {
    if (topParent === void 0) { topParent = false; }
    try {
        var element_2 = (topParent === true) ? parent : document.createElement(hierarchy.name);
        options_1.options.forEach(function (opt) {
            if (typeof opt.parse === 'function') {
                opt.parse(element_2, hierarchy);
            }
        });
        if (topParent === false) {
            parent.appendChild(element_2);
        }
        return element_2;
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=parser.js.map