"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = __importStar(require("./modules/validator"));
var options_1 = require("./modules/options");
var InvalidHierarchyError_1 = __importDefault(require("./modules/errors/InvalidHierarchyError"));
var InvalidTargetError_1 = __importDefault(require("./modules/errors/InvalidTargetError"));
function parse(hierarchy, target, endBallback, nodeCallback) {
    console.log(options_1.options);
    try {
        if (!Validator.isValidHTMLElement(target)) {
            throw new InvalidTargetError_1.default("");
        }
        if (!Validator.isValidHierarchy(hierarchy)) {
            throw new InvalidHierarchyError_1.default("");
        }
        endBallback();
    }
    catch (e) {
        e.message = "[Temme]: " + e.message + ".";
        throw e;
    }
}
exports.parse = parse;
//# sourceMappingURL=temme.js.map