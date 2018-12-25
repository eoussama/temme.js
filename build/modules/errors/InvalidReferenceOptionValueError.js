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
var InvalidReferenceOptionValueError = (function (_super) {
    __extends(InvalidReferenceOptionValueError, _super);
    function InvalidReferenceOptionValueError(message) {
        var _this = _super.call(this, "") || this;
        _this.name = "InvalidReferenceOptionValueError";
        _this.message = "“ref” options must not begin with the “@” symbol";
        _this.message = message.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidReferenceOptionValueError;
}(TemmyError_1.default));
exports.default = InvalidReferenceOptionValueError;
//# sourceMappingURL=InvalidReferenceOptionValueError.js.map