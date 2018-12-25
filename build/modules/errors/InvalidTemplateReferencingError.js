"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var TemmyError_1 = __importDefault(require("../models/TemmyError"));
var InvalidTemplateReferencingError = (function (_super) {
    __extends(InvalidTemplateReferencingError, _super);
    function InvalidTemplateReferencingError(ref, target) {
        var _this = _super.call(this, "") || this;
        _this.name = "InvalidTemplateReferencingError";
        _this.message = "Templates can only reference other templates.";
        var message = "The template with the reference \u201C" + ref + "\u201D is trying to reference \u201C" + target + "\u201D a non-template object";
        _this.message = ref.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidTemplateReferencingError;
}(TemmyError_1.default));
exports.default = InvalidTemplateReferencingError;
//# sourceMappingURL=InvalidTemplateReferencingError.js.map