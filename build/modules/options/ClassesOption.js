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
var ClassesOption = (function (_super) {
    __extends(ClassesOption, _super);
    function ClassesOption() {
        return _super.call(this, 'classes', 'array', [], []) || this;
    }
    ClassesOption.prototype.inherit = function (hierarchy, classes) {
        var _a;
        if (hierarchy.from.mode === 'append') {
            (_a = hierarchy.classes).push.apply(_a, classes);
        }
        else {
            hierarchy.classes = classes;
        }
        hierarchy.classes = hierarchy.classes.filter(function (cls, index) { return hierarchy.classes.indexOf(cls) === index; });
        hierarchy.classes.sort();
    };
    return ClassesOption;
}(Option_1.default));
exports.default = ClassesOption;
//# sourceMappingURL=ClassesOption.js.map