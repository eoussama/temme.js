"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidReferenceOptionValueError extends TemmyError_1.default {
    constructor(message) {
        super("");
        this.name = "InvalidReferenceOptionValueError";
        this.message = "“ref” options must not begin with the “@” symbol";
        this.message = message.length > 0 ? message : this.message;
    }
}
exports.default = InvalidReferenceOptionValueError;
//# sourceMappingURL=InvalidReferenceOptionValueError.js.map