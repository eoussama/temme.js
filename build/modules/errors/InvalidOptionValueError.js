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
var InvalidOptionValueError = (function (_super) {
    __extends(InvalidOptionValueError, _super);
    function InvalidOptionValueError(option, value) {
        var _this = _super.call(this, "") || this;
        _this.name = "InvalidOptionValueError";
        _this.message = "An option doesn't have a valid value";
        var message = "The \u201C" + option + "\u201D option doesn't accept \u201C" + value + "\u201D as a type";
        _this.message = option.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidOptionValueError;
}(TemmyError_1.default));
exports.default = InvalidOptionValueError;
//# sourceMappingURL=InvalidOptionValueError.js.map