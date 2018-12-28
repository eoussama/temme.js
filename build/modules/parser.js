"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var idfier_1 = require("./idfier");
var options_1 = require("./options");
function parse(hierarchy, parent, nodeCallback) {
    try {
        var element_1 = parseElement(hierarchy, parent);
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
function parseElement(hierarchy, parent) {
    try {
        var element_2 = document.createElement(hierarchy.name);
        options_1.options.forEach(function (opt) {
            if (typeof opt.parse === 'function') {
                opt.parse(element_2, hierarchy);
            }
        });
        parent.appendChild(element_2);
        return element_2;
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=parser.js.map