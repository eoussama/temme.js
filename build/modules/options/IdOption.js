"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class IdOption extends Option_1.default {
    constructor() {
        super('id', 'string', [], '', true);
        this.getKeyFromElement = (element) => element.id;
    }
    inherit(hierarchy, id) {
        if (id !== '') {
            if (hierarchy.from.mode === 'append') {
                if (hierarchy.id === '') {
                    hierarchy.id = id;
                }
            }
            else {
                hierarchy.id = id;
            }
        }
    }
    parse(element, hierarchy) {
        if (hierarchy.id != "") {
            element.id = hierarchy.id;
        }
    }
}
exports.default = IdOption;
//# sourceMappingURL=IdOption.js.map