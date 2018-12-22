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
var InvalidOptionTypeError = (function (_super) {
    __extends(InvalidOptionTypeError, _super);
    function InvalidOptionTypeError(option, type) {
        var _this = _super.call(this, "") || this;
        _this.name = "InvalidOptionTypeError";
        _this.message = "An option doesn't have a valid value type";
        var message = "The \u201C" + option + "\u201D option doesn't accept values of type \u201C" + type + "\u201D";
        _this.message = option.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidOptionTypeError;
}(TemmyError_1.default));
exports.default = InvalidOptionTypeError;
//# sourceMappingURL=InvalidOptionTypeError.js.map