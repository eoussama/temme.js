"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = void 0;
const idfier_1 = require("./idfier");
const options_1 = require("./options");
function parse(hierarchy, parent, nodeCallback, topParent = false) {
    try {
        const element = parseElement(hierarchy, parent, topParent);
        nodeCallback(idfier_1.getTemmeId(hierarchy), hierarchy);
        if ('childNodes' in hierarchy && hierarchy.childNodes.length > 0) {
            hierarchy.childNodes.forEach((child) => {
                parse(child, element, nodeCallback);
            });
        }
    }
    catch (e) {
        throw e;
    }
}
exports.parse = parse;
function parseElement(hierarchy, parent, topParent = false) {
    try {
        const element = (topParent === true) ? parent : document.createElement(hierarchy.name);
        options_1.options.forEach((opt) => {
            if (typeof opt.parse === 'function') {
                opt.parse(element, hierarchy);
            }
        });
        if (topParent === false) {
            parent.appendChild(element);
        }
        return element;
    }
    catch (e) {
        throw e;
    }
}
//# sourceMappingURL=parser.js.map