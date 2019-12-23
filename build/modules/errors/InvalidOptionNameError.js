"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidOptionNameError extends TemmyError_1.default {
    constructor(option) {
        super("");
        this.name = "InvalidOptionNameError";
        this.message = "An option is not valid";
        const message = `“${option}” is not a valid option`;
        this.message = option.length > 0 ? message : this.message;
    }
}
exports.default = InvalidOptionNameError;
//# sourceMappingURL=InvalidOptionNameError.js.map