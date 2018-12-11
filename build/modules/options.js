"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var RefOption_1 = __importDefault(require("./options/RefOption"));
var NameOption_1 = __importDefault(require("./options/NameOption"));
var IdOption_1 = __importDefault(require("./options/IdOption"));
var TextOption_1 = __importDefault(require("./options/TextOption"));
var HtmlOption_1 = __importDefault(require("./options/HtmlOption"));
var TemmeIdsOption_1 = __importDefault(require("./options/TemmeIdsOption"));
var TemplatesOption_1 = __importDefault(require("./options/TemplatesOption"));
var ClassesOption_1 = __importDefault(require("./options/ClassesOption"));
var ChildrenOption_1 = __importDefault(require("./options/ChildrenOption"));
var AttributesOption_1 = __importDefault(require("./options/AttributesOption"));
var DatasetOption_1 = __importDefault(require("./options/DatasetOption"));
var FromOption_1 = __importDefault(require("./options/FromOption"));
exports.options = [
    new RefOption_1.default(),
    new NameOption_1.default(),
    new IdOption_1.default(),
    new TextOption_1.default(),
    new HtmlOption_1.default(),
    new TemmeIdsOption_1.default(),
    new TemplatesOption_1.default(),
    new ClassesOption_1.default(),
    new ChildrenOption_1.default(),
    new AttributesOption_1.default(),
    new DatasetOption_1.default(),
    new FromOption_1.default()
];
//# sourceMappingURL=options.js.map