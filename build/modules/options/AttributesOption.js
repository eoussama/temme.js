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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = __importDefault(require("../models/Option"));
var AttributesOption = (function (_super) {
    __extends(AttributesOption, _super);
    function AttributesOption() {
        return _super.call(this, 'attributes', 'object', [], {}, true) || this;
    }
    AttributesOption.prototype.inherit = function (hierarchy, attributes) {
        var attr = __assign({}, attributes);
        if (hierarchy.from.mode === 'append') {
            for (var attrKey in hierarchy.attributes) {
                attr[attrKey] = hierarchy.attributes[attrKey];
            }
        }
        else {
            for (var attrKey in hierarchy.attributes) {
                if (!(attrKey in attr)) {
                    attr[attrKey] = hierarchy.attributes[attrKey];
                }
            }
        }
        hierarchy.attributes = attr;
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
    AttributesOption.prototype.parse = function (element, hierarchy) {
        for (var dataKey in hierarchy.attributes) {
            element.setAttribute(dataKey, hierarchy.attributes[dataKey]);
        }
    };
    return AttributesOption;
}(Option_1.default));
exports.default = AttributesOption;
//# sourceMappingURL=AttributesOption.js.map