"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
const RefOption_1 = __importDefault(require("./RefOption"));
const ChildrenSubOption_1 = __importDefault(require("./sub-options/ChildrenSubOption"));
const ExcludeSubOption_1 = __importDefault(require("./sub-options/ExcludeSubOption"));
const IncludeSubOption_1 = __importDefault(require("./sub-options/IncludeSubOption"));
const ModeSubOption_1 = __importDefault(require("./sub-options/ModeSubOption"));
class FromOption extends Option_1.default {
    constructor() {
        super("from", "object", [], {
            ref: (new RefOption_1.default()).default,
            mode: (new ModeSubOption_1.default()).default,
            children: (new ChildrenSubOption_1.default()).default,
            include: (new IncludeSubOption_1.default()).default,
            exclude: (new ExcludeSubOption_1.default()).default,
        });
        this.keys = {
            ref: new RefOption_1.default(),
            mode: new ModeSubOption_1.default(),
            children: new ChildrenSubOption_1.default(),
            include: new IncludeSubOption_1.default(),
            exclude: new ExcludeSubOption_1.default(),
        };
        this.getKeyFromElement = (_element) => null;
    }
    inherit(_hierarchy, _from) { }
}
exports.default = FromOption;
