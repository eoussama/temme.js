"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class ClassesOption extends Option_1.default {
    constructor() {
        super("classes", "array", [], [], true);
    }
    inherit(hierarchy, classes) {
        const cls = classes;
        if (hierarchy.from.mode === "append") {
            hierarchy.classes.push(...cls);
        }
        else {
            hierarchy.classes = cls;
        }
        hierarchy.classes = hierarchy.classes.filter((c, index) => hierarchy.classes.indexOf(c) === index);
        hierarchy.classes.sort();
    }
    getKeyFromElement(element) {
        const classList = [];
        element.classList.forEach((cls) => classList.push(cls));
        return classList;
    }
    parse(element, hierarchy) {
        if (hierarchy.classes.length > 0) {
            element.classList.add(...hierarchy.classes);
        }
    }
}
exports.default = ClassesOption;
