"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenOptions = exports.allOptions = exports.options = void 0;
exports.getSubOptions = getSubOptions;
const AttributesOption_1 = __importDefault(require("./options/AttributesOption"));
const ChildrenNodesOption_1 = __importDefault(require("./options/ChildrenNodesOption"));
const ClassesOption_1 = __importDefault(require("./options/ClassesOption"));
const ContentOption_1 = __importDefault(require("./options/ContentOption"));
const DatasetOption_1 = __importDefault(require("./options/DatasetOption"));
const FromOption_1 = __importDefault(require("./options/FromOption"));
const IdOption_1 = __importDefault(require("./options/IdOption"));
const NameOption_1 = __importDefault(require("./options/NameOption"));
const RefOption_1 = __importDefault(require("./options/RefOption"));
const TemmeIdsOption_1 = __importDefault(require("./options/TemmeIdsOption"));
const TemplatesOption_1 = __importDefault(require("./options/TemplatesOption"));
exports.options = [
    new RefOption_1.default(),
    new NameOption_1.default(),
    new IdOption_1.default(),
    new ContentOption_1.default(),
    new TemmeIdsOption_1.default(),
    new TemplatesOption_1.default(),
    new ClassesOption_1.default(),
    new ChildrenNodesOption_1.default(),
    new AttributesOption_1.default(),
    new DatasetOption_1.default(),
    new FromOption_1.default(),
];
exports.allOptions = getAllOptions();
exports.forbiddenOptions = ["name", "childNodes", "templates"];
function getSubOptions(option) {
    const subOptions = [];
    exports.allOptions.forEach((opt) => {
        if ("keys" in opt && opt.label === option) {
            for (const key in opt.keys) {
                subOptions.push(opt.keys[key]);
            }
        }
    });
    return subOptions;
}
function getAllOptions() {
    let all = [];
    exports.options.forEach((opt) => {
        all.push(opt);
        if ("keys" in opt) {
            all = all.concat(getAllSubOptions(opt));
        }
    });
    return all;
}
function getAllSubOptions(option) {
    let allSubOptions = [];
    for (const key in option.keys) {
        const subOption = option.keys[key];
        allSubOptions.push(subOption);
        if ("keys" in subOption) {
            allSubOptions = allSubOptions.concat(getAllSubOptions(subOption));
        }
    }
    return allSubOptions;
}
