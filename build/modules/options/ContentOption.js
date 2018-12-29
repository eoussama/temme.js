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
        var _this = _super.call(this, 'content', 'object', [], {
            type: (new ContentTypeSubOption_1.default()).default,
            value: (new ValueSubOption_1.default()).default
        }, true) || this;
        _this.keys = {
            type: new ContentTypeSubOption_1.default(),
            value: new ValueSubOption_1.default()
        };
        return _this;
    }
    ContentOption.prototype.inherit = function (hierarchy, content) {
        var ct = content.value;
        if (content.value !== "") {
            if (hierarchy.from.mode === 'append') {
                ct = "" + hierarchy.content.value + (ct.length > 0 ? ' ' : '') + ct;
            }
            else {
                hierarchy.content = content;
            }
            hierarchy.content.value = ct;
        }
    };
    ContentOption.prototype.getKeyFromElement = function (element) {
        return {
            type: "html",
            value: element.innerHTML
        };
    };
    ;
    ContentOption.prototype.parse = function (element, hierarchy) {
        if (hierarchy.content.value != "") {
            if (hierarchy.content.type === 'text') {
                element.textContent = hierarchy.content.value;
            }
            else {
                element.innerHTML = hierarchy.content.value;
            }
        }
    };
    return ContentOption;
}(Option_1.default));
exports.default = ContentOption;
//# sourceMappingURL=ContentOption.js.map