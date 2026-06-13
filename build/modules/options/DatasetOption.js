"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Option_1 = __importDefault(require("../models/Option"));
class DatasetOption extends Option_1.default {
    constructor() {
        super("dataset", "object", [], {}, true);
    }
    inherit(hierarchy, dataset) {
        const incoming = dataset;
        const merged = { ...incoming };
        if (hierarchy.from.mode === "append") {
            for (const dataKey in hierarchy.dataset) {
                merged[dataKey] = hierarchy.dataset[dataKey];
            }
        }
        else {
            for (const dataKey in hierarchy.dataset) {
                if (!(dataKey in merged)) {
                    merged[dataKey] = hierarchy.dataset[dataKey];
                }
            }
        }
        hierarchy.dataset = merged;
    }
    getKeyFromElement(element) {
        const dataset = {};
        for (const dataKey in element.dataset) {
            dataset[dataKey] = element.dataset[dataKey] ?? "";
        }
        return dataset;
    }
    parse(element, hierarchy) {
        for (const dataKey in hierarchy.dataset) {
            element.dataset[dataKey] = hierarchy.dataset[dataKey];
        }
    }
}
exports.default = DatasetOption;
