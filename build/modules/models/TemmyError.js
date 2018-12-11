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
Object.defineProperty(exports, "__esModule", { value: true });
var TemmyError = (function (_super) {
    __extends(TemmyError, _super);
    function TemmyError(message) {
        var _this = _super.call(this) || this;
        _this.name = 'TemmyError';
        _this.message = "Temme isn't feeling good";
        _this.message = message.length > 0 ? message : _this.message;
        return _this;
    }
    return TemmyError;
}(Error));
exports.default = TemmyError;
//# sourceMappingURL=TemmyError.js.map