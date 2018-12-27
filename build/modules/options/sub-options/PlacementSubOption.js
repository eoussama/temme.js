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
var PlacementSubOption = (function (_super) {
    __extends(PlacementSubOption, _super);
    function PlacementSubOption() {
        var _this = _super.call(this, 'placement', 'string', ['after', 'before'], 'after') || this;
        _this.getKeyFromElement = function (element) { return null; };
        return _this;
    }
    PlacementSubOption.prototype.inherit = function (hierarchy, value) { };
    return PlacementSubOption;
}(Option_1.default));
exports.default = PlacementSubOption;
//# sourceMappingURL=PlacementSubOption.js.map