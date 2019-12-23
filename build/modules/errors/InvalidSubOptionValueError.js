"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidSubOptionValueError extends TemmyError_1.default {
    constructor(subOption, value) {
        super("");
        this.name = "InvalidSubOptionValueError";
        this.message = "A sub-option doesn't have a valid value";
        const message = `The “${subOption}” sub-option doesn't accept “${value}” as a value`;
        this.message = subOption.length > 0 || value.length > 0 ? message : this.message;
    }
}
exports.default = InvalidSubOptionValueError;
//# sourceMappingURL=InvalidSubOptionValueError.js.map