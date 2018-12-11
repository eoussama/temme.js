"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidHierarchy = function (hierarchy) { return hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy); };
exports.isValidHTMLElement = function (target) { return target != null && target instanceof HTMLElement; };
//# sourceMappingURL=validator.js.map