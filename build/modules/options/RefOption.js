"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class RefOption extends Option_1.default {
    constructor() {
        super('ref', 'string', [], '');
        this.getKeyFromElement = (element) => null;
    }
    inherit(hierarchy, ref) { }
}
exports.default = RefOption;
//# sourceMappingURL=RefOption.js.map