"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidTemplateOptionError extends TemmyError_1.default {
    constructor(option) {
        super("");
        this.name = "InvalidTemplateOptionError";
        this.message = "A template has an invalid option";
        const message = `“${option}” is not a valid option to use in templates`;
        this.message = option.length > 0 ? message : this.message;
    }
}
exports.default = InvalidTemplateOptionError;
//# sourceMappingURL=InvalidTemplateOptionError.js.map