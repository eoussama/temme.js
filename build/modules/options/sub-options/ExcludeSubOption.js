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
var Option_1 = __importDefault(require("../../models/Option"));
var ExcludeSubOption = (function (_super) {
    __extends(ExcludeSubOption, _super);
    function ExcludeSubOption() {
        var _this = _super.call(this, 'exclude', 'array', ['name', 'id', 'classes', 'attributes', 'dataset', 'content', 'childNodes'], []) || this;
        _this.getKeyFromElement = function (element) { return null; };
        return _this;
    }
    ExcludeSubOption.prototype.inherit = function (hierarchy, value) { };
    return ExcludeSubOption;
}(Option_1.default));
exports.default = ExcludeSubOption;
//# sourceMappingURL=ExcludeSubOption.js.map