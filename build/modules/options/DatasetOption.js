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
var DatasetOption = (function (_super) {
    __extends(DatasetOption, _super);
    function DatasetOption() {
        return _super.call(this, 'dataset', 'object', [], {}) || this;
    }
    DatasetOption.prototype.inherit = function (hierarchy, dataset) {
        var dt = __assign({}, dataset);
        if (hierarchy.from.mode === 'append') {
            for (var dataKey in hierarchy.dataset) {
                dt[dataKey] = hierarchy.dataset[dataKey];
            }
        }
        else {
            for (var dataKey in hierarchy.dataset) {
                if (!(dataKey in dt)) {
                    dt[dataKey] = hierarchy.dataset[dataKey];
                }
            }
        }
        hierarchy.dataset = dt;
    };
    DatasetOption.prototype.getKeyFromElement = function (element) {
        var dataset = {};
        for (var dataKey in element.dataset) {
            dataset[dataKey] = element.dataset[dataKey];
        }
        return dataset;
    };
    DatasetOption.prototype.parse = function (element, hierarchy) {
        for (var dataKey in hierarchy.dataset) {
            element.dataset[dataKey] = hierarchy.dataset[dataKey];
        }
    };
    return DatasetOption;
}(Option_1.default));
exports.default = DatasetOption;
//# sourceMappingURL=DatasetOption.js.map