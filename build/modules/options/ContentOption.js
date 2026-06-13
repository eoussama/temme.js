"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
const ContentTypeSubOption_1 = __importDefault(require("./sub-options/ContentTypeSubOption"));
const ValueSubOption_1 = __importDefault(require("./sub-options/ValueSubOption"));
class ContentOption extends Option_1.default {
    constructor() {
        super("content", "object", [], {
            type: (new ContentTypeSubOption_1.default()).default,
            value: (new ValueSubOption_1.default()).default,
        }, true);
        this.keys = {
            type: new ContentTypeSubOption_1.default(),
            value: new ValueSubOption_1.default(),
        };
    }
    inherit(hierarchy, content) {
        const incoming = content;
        let ct = incoming.value;
        if (incoming.value !== "") {
            if (hierarchy.from.mode === "append") {
                ct = `${hierarchy.content.value}${ct.length > 0 ? " " : ""}${ct}`;
            }
            else {
                hierarchy.content = incoming;
            }
            hierarchy.content.value = ct;
        }
    }
    getKeyFromElement(element) {
        return {
            type: "html",
            value: element.innerHTML,
        };
    }
    parse(element, hierarchy) {
        if (hierarchy.content.value !== "") {
            if (hierarchy.content.type === "text") {
                element.textContent = hierarchy.content.value;
            }
            else {
                element.innerHTML = hierarchy.content.value;
            }
        }
    }
}
exports.default = ContentOption;
