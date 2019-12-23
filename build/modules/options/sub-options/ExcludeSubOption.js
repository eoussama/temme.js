"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../../models/Option"));
class ExcludeSubOption extends Option_1.default {
    constructor() {
        super('exclude', 'array', ['name', 'id', 'classes', 'attributes', 'dataset', 'content', 'childNodes'], []);
        this.getKeyFromElement = (element) => null;
    }
    inherit(hierarchy, value) { }
}
exports.default = ExcludeSubOption;
//# sourceMappingURL=ExcludeSubOption.js.map