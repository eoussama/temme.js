"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class NameOption extends Option_1.default {
    constructor() {
        super('name', 'string', [], 'div', true);
        this.getKeyFromElement = (element) => null;
    }
    inherit(hierarchy, name) {
        if (name != null) {
            if (hierarchy.from.mode === 'override') {
                hierarchy.name = name;
            }
        }
    }
}
exports.default = NameOption;
//# sourceMappingURL=NameOption.js.map