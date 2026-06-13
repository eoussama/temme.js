"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class AttributesOption extends Option_1.default {
    constructor() {
        super("attributes", "object", [], {}, true);
    }
    inherit(hierarchy, attributes) {
        const incoming = attributes;
        const merged = { ...incoming };
        if (hierarchy.from.mode === "append") {
            for (const attrKey in hierarchy.attributes) {
                merged[attrKey] = hierarchy.attributes[attrKey];
            }
        }
        else {
            for (const attrKey in hierarchy.attributes) {
                if (!(attrKey in merged)) {
                    merged[attrKey] = hierarchy.attributes[attrKey];
                }
            }
        }
        hierarchy.attributes = merged;
    }
    getKeyFromElement(element) {
        const attrs = {};
        for (const attrKey in element.attributes) {
            const attr = element.attributes[attrKey];
            if (!Number.isNaN(Number.parseInt(attrKey))
                && !["id", "class"].includes(attr.nodeName)
                && !attr.nodeName.startsWith("data-")) {
                attrs[attr.nodeName] = attr.nodeValue ?? "";
            }
        }
        return attrs;
    }
    parse(element, hierarchy) {
        for (const attrKey in hierarchy.attributes) {
            element.setAttribute(attrKey, hierarchy.attributes[attrKey]);
        }
    }
}
exports.default = AttributesOption;
