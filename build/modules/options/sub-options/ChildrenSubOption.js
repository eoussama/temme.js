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
var PlacementSubOption_1 = __importDefault(require("./PlacementSubOption"));
var ChildrenSubOption = (function (_super) {
    __extends(ChildrenSubOption, _super);
    function ChildrenSubOption() {
        var _this = _super.call(this, 'children', 'object', '', []) || this;
        _this.keys = new ChildrenKeys();
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return ChildrenSubOption;
}(Option_1.default));
exports.default = ChildrenSubOption;
var ChildrenKeys = (function () {
    function ChildrenKeys() {
        this.allow = false;
        this.placement = new PlacementSubOption_1.default();
    }
    return ChildrenKeys;
}());
//# sourceMappingURL=ChildrenSubOption.js.map