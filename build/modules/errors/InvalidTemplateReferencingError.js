"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TemmyError_1 = __importDefault(require("../models/TemmyError"));
class InvalidTemplateReferencingError extends TemmyError_1.default {
    constructor(ref, target) {
        super("");
        this.name = "InvalidTemplateReferencingError";
        this.message = "Templates can only reference other templates.";
        const message = `The template with the reference “${ref}” is trying to reference “${target}” a non-template object`;
        this.message = ref.length > 0 ? message : this.message;
    }
}
exports.default = InvalidTemplateReferencingError;
//# sourceMappingURL=InvalidTemplateReferencingError.js.map