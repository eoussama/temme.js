"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidOptionValueError extends TemmyError_1.default {
    constructor(option, value) {
        super("");
        this.name = "InvalidOptionValueError";
        this.message = "An option doesn't have a valid value";
        const message = `The “${option}” option doesn't accept “${value}” as a value`;
        this.message = option.length > 0 ? message : this.message;
    }
}
exports.default = InvalidOptionValueError;
//# sourceMappingURL=InvalidOptionValueError.js.map