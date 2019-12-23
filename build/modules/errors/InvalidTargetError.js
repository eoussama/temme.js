"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidTargetError extends TemmyError_1.default {
    constructor(message) {
        super("");
        this.name = "InvalidTargetError";
        this.message = "The target is not a valid HTML element";
        this.message = message.length > 0 ? message : this.message;
    }
}
exports.default = InvalidTargetError;
//# sourceMappingURL=InvalidTargetError.js.map