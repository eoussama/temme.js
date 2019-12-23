"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class TemmeIdsOption extends Option_1.default {
    constructor() {
        super('temmeIds', 'array', [], []);
        this.getKeyFromElement = (element) => null;
    }
    inherit(hierarchy, temmeIds) { }
}
exports.default = TemmeIdsOption;
//# sourceMappingURL=TemmeIdsOption.js.map