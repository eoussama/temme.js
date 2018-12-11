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
var Option_1 = __importDefault(require("../models/Option"));
var IdOption = (function (_super) {
    __extends(IdOption, _super);
    function IdOption() {
        var _this = _super.call(this, 'id', 'string', '', []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return IdOption;
}(Option_1.default));
exports.default = IdOption;
//# sourceMappingURL=IdOption.js.map