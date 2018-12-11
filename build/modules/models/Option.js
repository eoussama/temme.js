"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option = (function () {
    function Option(name, type, defaultValue, values) {
        var _this = this;
        this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        this.name = name;
        this.type = type;
        this.default = defaultValue;
        this.values = values;
    }
    return Option;
}());
exports.default = Option;
//# sourceMappingURL=Option.js.map