import temme = require("temmejs");



const element: HTMLElement = document.createElement("div");
const hierarchy: temme.Hierarchy = temme.parse({ id: "x" }, element);
const error: temme.TemmyError = new temme.InvalidTargetError("");

export = { hierarchy, error };
