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
var InvalidTargetError = (function (_super) {
    __extends(InvalidTargetError, _super);
    function InvalidTargetError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "InvalidTargetError";
        _this.message = "The target is not a valid HTML element";
        _this.message = message.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidTargetError;
}(TemmyError_1.default));
exports.default = InvalidTargetError;
//# sourceMappingURL=InvalidTargetError.js.map