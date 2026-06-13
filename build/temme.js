"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = parse;
exports.validate = validate;
const core_1 = require("@eoussama/core");
const InvalidHierarchyError_1 = __importDefault(require("./modules/errors/InvalidHierarchyError"));
const InvalidTargetError_1 = __importDefault(require("./modules/errors/InvalidTargetError"));
const Idfier = __importStar(require("./modules/idfier"));
const Parser = __importStar(require("./modules/parser"));
const Referencer = __importStar(require("./modules/referencer"));
const Sanitizer = __importStar(require("./modules/sanitizer"));
const Validator = __importStar(require("./modules/validator"));
function parse(hierarchy, target, endCallback = () => { }, nodeCallback = () => { }) {
    try {
        if (!Validator.isValidHTMLElement(target)) {
            throw new InvalidTargetError_1.default("");
        }
        if (!Validator.isValidHierarchy(hierarchy)) {
            throw new InvalidHierarchyError_1.default("");
        }
        const h = hierarchy;
        Validator.validateOptions(h);
        Sanitizer.sanitize(h);
        Idfier.idfy(h);
        Referencer.process(h);
        Parser.parse(h, target, nodeCallback, true);
        const cbResult = endCallback(h);
        if ((0, core_1.isPromise)(cbResult)) {
            cbResult.catch((e) => {
                console.warn("[Temme]: async end-callback rejected:", e);
            });
        }
        return h;
    }
    catch (e) {
        e.message = `[Temme]: ${e.message}.`;
        throw e;
    }
}
function validate(hierarchy) {
    const result = (() => {
        try {
            Validator.validateOptions(hierarchy);
            return [null, true];
        }
        catch (err) {
            return [err, null];
        }
    })();
    const [error, valid] = result;
    return { valid: valid === true, error };
}
