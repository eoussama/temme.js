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
var DatasetOption = (function (_super) {
    __extends(DatasetOption, _super);
    function DatasetOption() {
        return _super.call(this, 'dataset', 'object', [], {}) || this;
    }
    DatasetOption.prototype.inherit = function (hierarchy, dataset) {
        if (hierarchy.from.mode === 'append') {
            for (var key in dataset) {
                if (!(key in hierarchy.dataset)) {
                    hierarchy.dataset[key] = dataset[key];
                }
            }
        }
        else {
            for (var key in dataset) {
                hierarchy.dataset[key] = dataset[key];
            }
        }
    };
    return DatasetOption;
}(Option_1.default));
exports.default = DatasetOption;
//# sourceMappingURL=DatasetOption.js.map