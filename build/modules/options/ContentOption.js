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
var ValueSubOption_1 = __importDefault(require("./sub-options/ValueSubOption"));
var ContentTypeSubOption_1 = __importDefault(require("./sub-options/ContentTypeSubOption"));
var ContentOption = (function (_super) {
    __extends(ContentOption, _super);
    function ContentOption() {
        var _this = _super.call(this, 'content', 'string', '', []) || this;
        _this.keys = {
            type: new ContentTypeSubOption_1.default(),
            value: new ValueSubOption_1.default()
        };
        return _this;
    }
    return ContentOption;
}(Option_1.default));
exports.default = ContentOption;
//# sourceMappingURL=ContentOption.js.map