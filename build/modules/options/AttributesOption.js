"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class AttributesOption extends Option_1.default {
    constructor() {
        super('attributes', 'object', [], {}, true);
    }
    inherit(hierarchy, attributes) {
        const attr = Object.assign({}, attributes);
        if (hierarchy.from.mode === 'append') {
            for (const attrKey in hierarchy.attributes) {
                attr[attrKey] = hierarchy.attributes[attrKey];
            }
        }
        else {
            for (const attrKey in hierarchy.attributes) {
                if (!(attrKey in attr)) {
                    attr[attrKey] = hierarchy.attributes[attrKey];
                }
            }
        }
        hierarchy.attributes = attr;
    }
    getKeyFromElement(element) {
        let attributes = {};
        for (const attrKey in element.attributes) {
            if (!isNaN(parseInt(attrKey)) && ['id', 'class'].indexOf(element.attributes[attrKey].nodeName) === -1 && element.attributes[attrKey].nodeName.substring(0, 5) !== 'data-') {
                attributes[element.attributes[attrKey].nodeName] = element.attributes[attrKey].nodeValue;
            }
        }
        return attributes;
    }
    parse(element, hierarchy) {
        for (const dataKey in hierarchy.attributes) {
            element.setAttribute(dataKey, hierarchy.attributes[dataKey]);
        }
    }
}
exports.default = AttributesOption;
//# sourceMappingURL=AttributesOption.js.map