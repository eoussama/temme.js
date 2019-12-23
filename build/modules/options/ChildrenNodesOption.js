"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class ChildNodesOption extends Option_1.default {
    constructor() {
        super('childNodes', 'array', [], [], true);
        this.getKeyFromElement = (element) => element.innerHTML;
    }
    inherit(hierarchy, childNodes) {
        let children = [...hierarchy.childNodes];
        if (hierarchy.from.children.allow === true) {
            if (hierarchy.from.mode === 'append') {
                if (hierarchy.from.children.placement === 'before') {
                    children.unshift(...childNodes);
                }
                else {
                    children.push(...childNodes);
                }
            }
            else {
                children = childNodes;
            }
        }
        hierarchy.childNodes = children;
    }
}
exports.default = ChildNodesOption;
//# sourceMappingURL=ChildrenNodesOption.js.map