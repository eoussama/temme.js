"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RefOption_1 = __importDefault(require("./options/RefOption"));
var NameOption_1 = __importDefault(require("./options/NameOption"));
var IdOption_1 = __importDefault(require("./options/IdOption"));
var ContentOption_1 = __importDefault(require("./options/ContentOption"));
var TemmeIdsOption_1 = __importDefault(require("./options/TemmeIdsOption"));
var TemplatesOption_1 = __importDefault(require("./options/TemplatesOption"));
var ClassesOption_1 = __importDefault(require("./options/ClassesOption"));
var ChildrenNodesOption_1 = __importDefault(require("./options/ChildrenNodesOption"));
var AttributesOption_1 = __importDefault(require("./options/AttributesOption"));
var DatasetOption_1 = __importDefault(require("./options/DatasetOption"));
var FromOption_1 = __importDefault(require("./options/FromOption"));
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
    new FromOption_1.default()
];
function getSubOptions(option) {
    var options = getAllOptions(), subOptions = [];
    options.forEach(function (opt) {
        if ('keys' in opt && opt.label === option) {
            for (var key in opt.keys) {
                var subOption = opt.keys[key];
                subOptions.push(subOption);
            }
        }
    });
    return subOptions;
}
exports.getSubOptions = getSubOptions;
function getAllOptions() {
    var allOptions = [];
    exports.options.forEach(function (opt) {
        allOptions.push(opt);
        if ('keys' in opt) {
            var subOptions = getAllSubOptions(opt);
            allOptions = allOptions.concat(subOptions);
        }
    });
    return allOptions;
}
function getAllSubOptions(option) {
    var allSubOptions = [];
    for (var key in option.keys) {
        var subOption = option.keys[key];
        allSubOptions.push(subOption);
        if ('keys' in subOption) {
            var opts = getAllSubOptions(subOption);
            allSubOptions = allSubOptions.concat(opts);
        }
    }
    return allSubOptions;
}
//# sourceMappingURL=options.js.map