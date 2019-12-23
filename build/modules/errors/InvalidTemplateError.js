"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidTemplateError extends TemmyError_1.default {
    constructor(message) {
        super("");
        this.name = "InvalidTemplateError";
        this.message = "A template does not have a “ref” option";
        this.message = message.length > 0 ? message : this.message;
    }
}
exports.default = InvalidTemplateError;
//# sourceMappingURL=InvalidTemplateError.js.map