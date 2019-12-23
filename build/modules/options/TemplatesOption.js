"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class TemplatesOption extends Option_1.default {
    constructor() {
        super('templates', 'array', [], []);
        this.getKeyFromElement = (element) => null;
    }
    inherit(hierarchy, templates) { }
}
exports.default = TemplatesOption;
//# sourceMappingURL=TemplatesOption.js.map