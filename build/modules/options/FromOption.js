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
var RefOption_1 = __importDefault(require("./RefOption"));
var ModeSubOption_1 = __importDefault(require("./sub-options/ModeSubOption"));
var ChildrenSubOption_1 = __importDefault(require("./sub-options/ChildrenSubOption"));
var FromOption = (function (_super) {
    __extends(FromOption, _super);
    function FromOption() {
        var _this = _super.call(this, 'from', 'object', '', []) || this;
        _this.keys = new FromKeys();
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return FromOption;
}(Option_1.default));
exports.default = FromOption;
var FromKeys = (function () {
    function FromKeys() {
        this.ref = new RefOption_1.default();
        this.mode = new ModeSubOption_1.default();
        this.children = new ChildrenSubOption_1.default();
    }
    return FromKeys;
}());
//# sourceMappingURL=FromOption.js.map