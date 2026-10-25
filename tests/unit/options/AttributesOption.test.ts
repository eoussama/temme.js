import { describe, expect, it } from "vitest";
import AttributesOption from "../../../src/modules/options/AttributesOption";
import { createTarget, sanitized } from "../../helpers";



const option = new AttributesOption();


describe("attributesOption.inherit.", () => {
  it("keeps existing attributes over incoming ones in append mode.", () => {
    const hierarchy = sanitized({ attributes: { a: "own", b: "own" } });

    option.inherit(hierarchy, { b: "in", c: "in" });

    expect(hierarchy.attributes).toStrictEqual({ b: "own", c: "in", a: "own" });
  });

  it("lets incoming attributes win in override mode.", () => {
    const hierarchy = sanitized({ attributes: { a: "own", b: "own" }, from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, { b: "in", c: "in" });

    expect(hierarchy.attributes).toStrictEqual({ a: "own", b: "in", c: "in" });
  });

  it("never shares the incoming object.", () => {
    const hierarchy = sanitized();
    const incoming = { a: "in" };

    option.inherit(hierarchy, incoming);

    expect(hierarchy.attributes).not.toBe(incoming);
  });
});


describe("attributesOption.getKeyFromElement.", () => {
  it("reads every attribute but id, class and data-*.", () => {
    const element = createTarget();

    element.id = "id";
    element.className = "cls";
    element.dataset.key = "value";
    element.setAttribute("title", "t");
    element.setAttribute("aria-label", "label");
    element.setAttribute("database", "kept");

    expect(option.getKeyFromElement(element)).toStrictEqual({ "title": "t", "aria-label": "label", "database": "kept" });
  });

  it("returns an empty map for an element without attributes.", () => {
    expect(option.getKeyFromElement(createTarget())).toStrictEqual({});
  });
});


describe("attributesOption.parse.", () => {
  it("sets every attribute, stringifying scalar values.", () => {
    const element = createTarget();
    const hierarchy = sanitized({ attributes: { title: "t", tabindex: 0, hidden: true } });

    option.parse(element, hierarchy);

    expect(element.getAttribute("title")).toBe("t");
    expect(element.getAttribute("tabindex")).toBe("0");
    expect(element.getAttribute("hidden")).toBe("true");
  });
});
