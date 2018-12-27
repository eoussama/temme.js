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
var AttributesOption = (function (_super) {
    __extends(AttributesOption, _super);
    function AttributesOption() {
        return _super.call(this, 'attributes', 'object', [], {}) || this;
    }
    AttributesOption.prototype.inherit = function (hierarchy, attributes) {
        if (hierarchy.from.mode === 'append') {
            for (var key in attributes) {
                if (!(key in hierarchy.attributes)) {
                    hierarchy.attributes[key] = attributes[key];
                }
            }
        }
        else {
            for (var key in attributes) {
                hierarchy.attributes[key] = attributes[key];
            }
        }
    };
    AttributesOption.prototype.getKeyFromElement = function (element) {
        var attributes = {};
        for (var attrKey in element.attributes) {
            if (!isNaN(parseInt(attrKey)) && ['id', 'class'].indexOf(element.attributes[attrKey].nodeName) === -1 && element.attributes[attrKey].nodeName.substring(0, 5) !== 'data-') {
                attributes[element.attributes[attrKey].nodeName] = element.attributes[attrKey].nodeValue;
            }
        }
        return attributes;
    };
    return AttributesOption;
}(Option_1.default));
exports.default = AttributesOption;
//# sourceMappingURL=AttributesOption.js.map