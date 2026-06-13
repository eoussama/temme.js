"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idfy = idfy;
exports.getTemmeId = getTemmeId;
function idfy(hierarchy, temmeIds = [], mode = false) {
    const temmeId = generateTemmeId(mode);
    hierarchy.temmeIds = [...temmeIds, temmeId];
    if ("childNodes" in hierarchy) {
        hierarchy.childNodes.forEach((child) => {
            idfy(child, hierarchy.temmeIds);
        });
    }
    if ("templates" in hierarchy) {
        hierarchy.templates.forEach((template) => {
            idfy(template, hierarchy.temmeIds, true);
        });
    }
}
function getTemmeId(hierarchy) {
    return hierarchy.temmeIds[hierarchy.temmeIds.length - 1];
}
function generateTemmeId(mode = false) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
    const max = mode === false ? 6 : 4;
    let key = "";
    for (let i = 0; i < max; i++) {
        const index = Math.floor(Math.random() * chars.length);
        const uppercase = Math.floor(Math.random() * 2);
        key += uppercase === 1 ? chars[index].toUpperCase() : chars[index];
    }
    return key;
}
