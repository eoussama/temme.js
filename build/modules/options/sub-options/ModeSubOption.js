"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../../models/Option"));
class ModeSubOption extends Option_1.default {
    constructor() {
        super('mode', 'string', ['append', 'override'], 'append');
        this.getKeyFromElement = (element) => null;
    }
    inherit(hierarchy, value) { }
}
exports.default = ModeSubOption;
//# sourceMappingURL=ModeSubOption.js.map