import { describe, expect, it } from "vitest";
import { sanitize } from "../../src/modules/sanitizer";
import { asHierarchy } from "../helpers";



const defaults = {
  ref: "",
  name: "div",
  id: "",
  content: { type: "text", value: "" },
  temmeIds: [],
  templates: [],
  classes: [],
  childNodes: [],
  attributes: {},
  dataset: {},
  from: {
    ref: "",
    mode: "append",
    children: { allow: false, placement: "after" },
    include: ["attributes", "childNodes", "classes", "content", "dataset", "id", "name"],
    exclude: [],
  },
};


describe("sanitize.", () => {
  it("populates every missing option with its default, in registry order.", () => {
    const hierarchy = asHierarchy();

    sanitize(hierarchy);

    expect(hierarchy).toStrictEqual(defaults);
    expect(Object.keys(hierarchy)).toEqual(Object.keys(defaults));
  });

  it("gives every hierarchy its own default objects.", () => {
    const first = asHierarchy();
    const second = asHierarchy();

    sanitize(first);
    sanitize(second);

    expect(first.content).not.toBe(second.content);
    expect(first.classes).not.toBe(second.classes);
    expect(first.from).not.toBe(second.from);
    expect(first.from.children).not.toBe(second.from.children);
    expect(first.from.include).not.toBe(second.from.include);
  });

  it("keeps provided values and completes partial sub-options.", () => {
    const hierarchy = asHierarchy({ id: "x", content: { type: "html" }, from: { ref: "r", children: { allow: true } } });

    sanitize(hierarchy);

    expect(hierarchy.id).toBe("x");
    expect(hierarchy.content).toEqual({ type: "html", value: "" });
    expect(hierarchy.from).toEqual({ ...defaults.from, ref: "r", children: { allow: true, placement: "after" } });
  });

  it("de-duplicates and sorts classes, include and exclude.", () => {
    const hierarchy = asHierarchy({ classes: ["b", "a", "b"], from: { ref: "r", include: ["id", "classes", "id"], exclude: ["name", "dataset", "name"] } });

    sanitize(hierarchy);

    expect(hierarchy.classes).toEqual(["a", "b"]);
    expect(hierarchy.from.include).toEqual(["classes", "id"]);
    expect(hierarchy.from.exclude).toEqual(["dataset", "name"]);
  });

  it("leaves unrestricted lists in their original order.", () => {
    const hierarchy = asHierarchy({ temmeIds: ["b", "a", "b"] });

    sanitize(hierarchy);

    expect(hierarchy.temmeIds).toEqual(["b", "a", "b"]);
  });

  it("sanitizes children recursively.", () => {
    const hierarchy = asHierarchy({ childNodes: [{ childNodes: [{ classes: ["b", "a"] }] }] });

    sanitize(hierarchy);

    expect(hierarchy.childNodes[0]!.name).toBe("div");
    expect(hierarchy.childNodes[0]!.childNodes[0]!.classes).toEqual(["a", "b"]);
  });

  it("sanitizes templates without the options templates can't have.", () => {
    const hierarchy = asHierarchy({ templates: [{ ref: "t", classes: ["z", "a", "z"] }] });

    sanitize(hierarchy);

    const template = hierarchy.templates[0]!;

    expect(template.classes).toEqual(["a", "z"]);
    expect(template.from.mode).toBe("append");
    expect(Object.keys(template).sort()).toEqual(["attributes", "classes", "content", "dataset", "from", "id", "ref", "temmeIds"]);
  });

  it("is idempotent.", () => {
    const hierarchy = asHierarchy({ classes: ["b", "a"], childNodes: [{}], templates: [{ ref: "t" }] });

    sanitize(hierarchy);

    const snapshot = structuredClone(hierarchy);

    sanitize(hierarchy);

    expect(hierarchy).toStrictEqual(snapshot);
  });
});
