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
var InvalidSubOptionTypeError = (function (_super) {
    __extends(InvalidSubOptionTypeError, _super);
    function InvalidSubOptionTypeError(subOption, type) {
        var _this = _super.call(this, "") || this;
        _this.name = "InvalidSubOptionTypeError";
        _this.message = "A sub-option doesn't have a valid value type";
        var message = "The \u201C" + subOption + "\u201D sub-option doesn't accept values of type \u201C" + type + "\u201D";
        _this.message = subOption.length > 0 || type.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidSubOptionTypeError;
}(TemmyError_1.default));
exports.default = InvalidSubOptionTypeError;
//# sourceMappingURL=InvalidSubOptionTypeError.js.map