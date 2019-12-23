"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class ClassesOption extends Option_1.default {
    constructor() {
        super('classes', 'array', [], [], true);
    }
    inherit(hierarchy, classes) {
        if (hierarchy.from.mode === 'append') {
            hierarchy.classes.push(...classes);
        }
        else {
            hierarchy.classes = classes;
        }
        hierarchy.classes = hierarchy.classes.filter((cls, index) => hierarchy.classes.indexOf(cls) === index);
        hierarchy.classes.sort();
    }
    getKeyFromElement(element) {
        let classes = [];
        element.classList.forEach((cls) => classes.push(cls));
        return classes;
    }
    ;
    parse(element, hierarchy) {
        if (hierarchy.classes.length > 0) {
            element.classList.add(...hierarchy.classes);
        }
    }
}
exports.default = ClassesOption;
//# sourceMappingURL=ClassesOption.js.map