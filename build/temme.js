"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.parse = void 0;
const Validator = __importStar(require("./modules/validator"));
const Sanitizer = __importStar(require("./modules/sanitizer"));
const Referencer = __importStar(require("./modules/referencer"));
const Parser = __importStar(require("./modules/parser"));
const Idfier = __importStar(require("./modules/idfier"));
const InvalidHierarchyError_1 = __importDefault(require("./modules/errors/InvalidHierarchyError"));
const InvalidTargetError_1 = __importDefault(require("./modules/errors/InvalidTargetError"));
function parse(hierarchy, target, endCallback = (hierarchy) => { }, nodeCallback = () => { }) {
    try {
        if (!Validator.isValidHTMLElement(target)) {
            throw new InvalidTargetError_1.default("");
        }
        if (!Validator.isValidHierarchy(hierarchy)) {
            throw new InvalidHierarchyError_1.default("");
        }
        Validator.validateOptions(hierarchy);
        Sanitizer.sanitize(hierarchy);
        Idfier.idfy(hierarchy);
        Referencer.process(hierarchy);
        Parser.parse(hierarchy, target, nodeCallback, true);
        endCallback(hierarchy);
        return hierarchy;
    }
    catch (e) {
        e.message = `[Temme]: ${e.message}.`;
        throw e;
    }
}
exports.parse = parse;
function validate(hierarchy) {
    try {
        Validator.validateOptions(hierarchy);
        return {
            valid: true,
            error: null
        };
    }
    catch (err) {
        return {
            valid: false,
            error: err
        };
    }
}
exports.validate = validate;
//# sourceMappingURL=temme.js.map