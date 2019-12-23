"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidSubOptionNameError extends TemmyError_1.default {
    constructor(option, subOption) {
        super("");
        this.name = "InvalidSubOptionNameError";
        this.message = "A sub-option is not valid";
        const message = `The “${option}” option doesn't not recognize “${subOption}” as a valid sub-option`;
        this.message = option.length > 0 || subOption.length > 0 ? message : this.message;
    }
}
exports.default = InvalidSubOptionNameError;
//# sourceMappingURL=InvalidSubOptionNameError.js.map