"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function idfy(hierarchy, temmeIds, mode) {
    if (mode === void 0) { mode = false; }
    var temmeId = generateTemmeId(mode);
    hierarchy.temmeIds = temmeIds.concat([temmeId]);
    if ('childNodes' in hierarchy) {
        hierarchy.childNodes.forEach(function (child) {
            idfy(child, hierarchy.temmeIds);
        });
    }
    if ('templates' in hierarchy) {
        hierarchy.templates.forEach(function (template) {
            idfy(template, hierarchy.temmeIds, true);
        });
    }
}
exports.idfy = idfy;
function generateTemmeId(mode) {
    if (mode === void 0) { mode = false; }
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz", max = (mode === false) ? 6 : 4;
    var key = '';
    for (var i = 0; i < max; i++) {
        var index = Math.floor((Math.random() * chars.length)), uppercase = Math.floor(Math.random() * 2);
        key += uppercase === 1 ? chars[index].toUpperCase() : chars[index];
    }
    return key;
}
//# sourceMappingURL=idfier.js.map