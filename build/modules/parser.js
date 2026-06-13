"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
const idfier_1 = require("./idfier");
const options_1 = require("./options");
function parse(hierarchy, parent, nodeCallback, topParent = false) {
    const element = parseElement(hierarchy, parent, topParent);
    nodeCallback((0, idfier_1.getTemmeId)(hierarchy), hierarchy);
    if ("childNodes" in hierarchy && hierarchy.childNodes.length > 0) {
        hierarchy.childNodes.forEach((child) => {
            parse(child, element, nodeCallback);
        });
    }
}
function parseElement(hierarchy, parent, topParent = false) {
    const element = topParent === true
        ? parent
        : document.createElement(hierarchy.name);
    options_1.options.forEach((opt) => {
        if (typeof opt.parse === "function") {
            opt.parse(element, hierarchy);
        }
    });
    if (topParent === false) {
        parent.appendChild(element);
    }
    return element;
}
