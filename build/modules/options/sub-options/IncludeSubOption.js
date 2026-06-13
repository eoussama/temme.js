"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../../models/Option"));
const INHERITABLE = [
    "name",
    "id",
    "classes",
    "attributes",
    "dataset",
    "content",
    "childNodes",
];
class IncludeSubOption extends Option_1.default {
    constructor() {
        super("include", "array", INHERITABLE, [...INHERITABLE]);
        this.getKeyFromElement = (_element) => null;
    }
    inherit(_hierarchy, _value) { }
}
exports.default = IncludeSubOption;
