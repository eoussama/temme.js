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
var ContentTypeSubOption = (function (_super) {
    __extends(ContentTypeSubOption, _super);
    function ContentTypeSubOption() {
        return _super.call(this, 'type', 'string', ['text', 'html'], 'text') || this;
    }
    return ContentTypeSubOption;
}(Option_1.default));
exports.default = ContentTypeSubOption;
//# sourceMappingURL=ContentTypeSubOption.js.map