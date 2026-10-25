import { describe, expect, it } from "vitest";
import Option from "../../src/modules/models/Option";
import { createTarget, sanitized } from "../helpers";



describe("option defaults.", () => {
  it("stores its metadata.", () => {
    const option = new Option("label", "array", ["a"], ["a"]);

    expect(option.label).toBe("label");
    expect(option.type).toBe("array");
    expect(option.values).toEqual(["a"]);
    expect(option.keys).toBeUndefined();
  });

  it("defaults to unrestricted values and an undefined default.", () => {
    const option = new Option("label", "string");

    expect(option.values).toEqual([]);
    expect(option.createDefault()).toBeUndefined();
  });

  it("creates a fresh copy of its default every time.", () => {
    const option = new Option("label", "object", [], { list: [1] });
    const first = option.createDefault() as { list: Array<number> };
    const second = option.createDefault() as { list: Array<number> };

    expect(first).toEqual({ list: [1] });
    expect(first).not.toBe(second);
    expect(first.list).not.toBe(second.list);
  });

  it("builds object defaults from its sub-options.", () => {
    const option = new Option("parent", "object", [], "ignored", {
      a: new Option("a", "string", [], "x"),
      b: new Option("b", "array", [], []),
    });

    expect(option.createDefault()).toStrictEqual({ a: "x", b: [] });
  });
});


describe("option base behaviour.", () => {
  it("inherits nothing, reads nothing from elements and renders nothing.", () => {
    const option = new Option("label", "string");
    const hierarchy = sanitized();
    const snapshot = structuredClone(hierarchy);
    const element = createTarget();

    option.inherit(hierarchy, "value");
    option.parse(element, hierarchy);

    expect(hierarchy).toEqual(snapshot);
    expect(element.outerHTML).toBe("<div></div>");
    expect(option.getKeyFromElement(element)).toBeNull();
  });
});


describe("option.typeOf.", () => {
  it("distinguishes arrays and null from objects.", () => {
    expect(Option.typeOf(null)).toBe("null");
    expect(Option.typeOf([])).toBe("array");
    expect(Option.typeOf({})).toBe("object");
    expect(Option.typeOf("")).toBe("string");
    expect(Option.typeOf(1)).toBe("number");
    expect(Option.typeOf(true)).toBe("boolean");
    expect(Option.typeOf(undefined)).toBe("undefined");
  });
});


describe("option.validateOptionType.", () => {
  it("reports whether the type matches, along with the detected type.", () => {
    const option = new Option("label", "object");

    expect(Option.validateOptionType({}, option)).toEqual({ valid: true, type: "object" });
    expect(Option.validateOptionType(null, option)).toEqual({ valid: false, type: "null" });
    expect(Option.validateOptionType([], option)).toEqual({ valid: false, type: "array" });
  });
});


describe("option.validateOptionValue.", () => {
  it("accepts anything when no values are listed.", () => {
    expect(Option.validateOptionValue("anything", new Option("label", "string"))).toBe(true);
  });

  it("checks scalar values against the allowed set.", () => {
    const option = new Option("mode", "string", ["append", "override"]);

    expect(Option.validateOptionValue("append", option)).toBe(true);
    expect(Option.validateOptionValue("other", option)).toBe(false);
  });

  it("checks every entry of array values.", () => {
    const option = new Option("include", "array", ["id", "classes"]);

    expect(Option.validateOptionValue([], option)).toBe(true);
    expect(Option.validateOptionValue(["id", "classes"], option)).toBe(true);
    expect(Option.validateOptionValue(["id", "other"], option)).toBe(false);
  });

  it("does not treat a scalar option's array value as a list of entries.", () => {
    expect(Option.validateOptionValue(["append"], new Option("mode", "string", ["append"]))).toBe(false);
  });
});
