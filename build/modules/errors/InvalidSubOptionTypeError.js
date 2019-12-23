"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidSubOptionTypeError extends TemmyError_1.default {
    constructor(subOption, type) {
        super("");
        this.name = "InvalidSubOptionTypeError";
        this.message = "A sub-option doesn't have a valid value type";
        const message = `The “${subOption}” sub-option doesn't accept values of type “${type}”`;
        this.message = subOption.length > 0 || type.length > 0 ? message : this.message;
    }
}
exports.default = InvalidSubOptionTypeError;
//# sourceMappingURL=InvalidSubOptionTypeError.js.map