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
var ChildNodesOption = (function (_super) {
    __extends(ChildNodesOption, _super);
    function ChildNodesOption() {
        return _super.call(this, 'childNodes', 'array', [], []) || this;
    }
    ChildNodesOption.prototype.inherit = function (hierarchy, childNodes) {
        if (hierarchy.from.children.allow === true) {
            if (hierarchy.from.mode === 'append') {
                if (hierarchy.from.children.placement === 'before') {
                    hierarchy.childNodes.shift(childNodes);
                }
                else {
                    hierarchy.childNodes.push(childNodes);
                }
            }
            else {
                hierarchy.childNodes = childNodes;
            }
        }
    };
    return ChildNodesOption;
}(Option_1.default));
exports.default = ChildNodesOption;
//# sourceMappingURL=ChildrenNodesOption.js.map