"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../../models/Option"));
class ValueSubOption extends Option_1.default {
    constructor() {
        super("value", "string", [], "");
        this.getKeyFromElement = (_element) => null;
    }
    inherit(_hierarchy, _value) { }
}
exports.default = ValueSubOption;
