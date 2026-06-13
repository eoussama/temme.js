"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../../models/Option"));
const ChildrenAllowSubOption_1 = __importDefault(require("./ChildrenAllowSubOption"));
const PlacementSubOption_1 = __importDefault(require("./PlacementSubOption"));
class ChildrenSubOption extends Option_1.default {
    constructor() {
        super("children", "object", [], {
            allow: (new ChildrenAllowSubOption_1.default()).default,
            placement: (new PlacementSubOption_1.default()).default,
        });
        this.keys = {
            allow: new ChildrenAllowSubOption_1.default(),
            placement: new PlacementSubOption_1.default(),
        };
        this.getKeyFromElement = (_element) => null;
    }
    inherit(_hierarchy, _value) { }
}
exports.default = ChildrenSubOption;
