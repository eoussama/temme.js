"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidReferenceError extends TemmyError_1.default {
    constructor(reference) {
        super("");
        this.name = "InvalidReferenceError";
        this.message = "A reference is invalid";
        this.message = reference.length > 0 ? `“${reference}” is an invalid reference` : this.message;
    }
}
exports.default = InvalidReferenceError;
//# sourceMappingURL=InvalidReferenceError.js.map