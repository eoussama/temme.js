"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidOptionTypeError extends TemmyError_1.default {
    constructor(option, type) {
        super("");
        this.name = "InvalidOptionTypeError";
        this.message = "An option doesn't have a valid value type";
        const message = `The “${option}” option doesn't accept values of type “${type}”`;
        this.message = option.length > 0 ? message : this.message;
    }
}
exports.default = InvalidOptionTypeError;
//# sourceMappingURL=InvalidOptionTypeError.js.map