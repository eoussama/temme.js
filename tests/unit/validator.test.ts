import { afterEach, describe, expect, it, vi } from "vitest";
import { isValidHierarchy, isValidHTMLElement, validateOptions, validateTemplates } from "../../src/modules/validator";
import { thrown } from "../helpers";



afterEach(() => {
  vi.unstubAllGlobals();
});


function errorOf(hierarchy: unknown, isTemplate?: boolean): { name: string; message: string } {
  const { name, message } = thrown(() => validateOptions(hierarchy, isTemplate));

  return { name, message };
}


describe("isValidHierarchy.", () => {
  it("accepts plain objects only.", () => {
    expect(isValidHierarchy({})).toBe(true);
    expect(isValidHierarchy(Object.create(null))).toBe(true);

    for (const value of [undefined, null, true, 1, "", []]) {
      expect(isValidHierarchy(value)).toBe(false);
    }
  });
});


describe("isValidHTMLElement.", () => {
  it("accepts HTML elements.", () => {
    expect(isValidHTMLElement(document.createElement("div"))).toBe(true);
  });

  it("rejects everything else.", () => {
    for (const value of [undefined, null, true, 1, "", [], {}, document.createTextNode("x"), document]) {
      expect(isValidHTMLElement(value)).toBe(false);
    }

    expect(isValidHTMLElement(document.createElementNS("http://www.w3.org/2000/svg", "svg"))).toBe(false);
  });

  it("checks elements against the HTMLElement of their own realm.", () => {
    class ForeignHTMLElement {}
    const foreign = Object.assign(new ForeignHTMLElement(), {
      ownerDocument: { defaultView: { HTMLElement: ForeignHTMLElement } },
    });

    expect(isValidHTMLElement(foreign)).toBe(true);
    expect(isValidHTMLElement(Object.assign(document.createElement("div"), {}))).toBe(true);
    expect(isValidHTMLElement({ ownerDocument: { defaultView: { HTMLElement: ForeignHTMLElement } } })).toBe(false);
  });

  it("falls back to the global HTMLElement for documents without a window.", () => {
    const element = document.implementation.createHTMLDocument("").createElement("div");

    expect(element.ownerDocument.defaultView).toBeNull();
    expect(isValidHTMLElement(element)).toBe(true);
  });

  it("returns false when there is no DOM at all.", () => {
    const fake = { ownerDocument: null };

    vi.stubGlobal("HTMLElement", undefined);

    expect(isValidHTMLElement(fake)).toBe(false);
  });
});


describe("validateOptions.", () => {
  it("accepts a valid hierarchy.", () => {
    expect(() => validateOptions({
      ref: "r",
      name: "p",
      id: "i",
      classes: ["a"],
      content: { type: "html", value: "<b></b>" },
      attributes: { title: "t" },
      dataset: { key: "v" },
      templates: [{ ref: "t", classes: ["b"] }],
      childNodes: [{ from: { ref: "t", mode: "override", include: ["classes"], children: { allow: true, placement: "before" } } }],
    })).not.toThrow();
  });

  it("rejects non-object hierarchies.", () => {
    for (const value of [undefined, null, 1, "x", []]) {
      expect(errorOf(value)).toEqual({ name: "InvalidHierarchyError", message: "The hierarchy object is not valid" });
    }
  });

  it("rejects unknown and inherited option names.", () => {
    expect(errorOf({ bogus: 1 })).toEqual({ name: "InvalidOptionNameError", message: "“bogus” is not a valid option" });
    expect(() => validateOptions(Object.create({ bogus: 1 }))).not.toThrow();
  });

  it("rejects values of the wrong type, including null.", () => {
    expect(errorOf({ name: [] })).toEqual({ name: "InvalidOptionTypeError", message: "The \"name\" option doesn't accept values of type \"array\"" });
    expect(errorOf({ content: null })).toEqual({ name: "InvalidOptionTypeError", message: "The \"content\" option doesn't accept values of type \"null\"" });
    expect(errorOf({ classes: "a" }).name).toBe("InvalidOptionTypeError");
  });

  it("rejects disallowed values.", () => {
    // No top-level option restricts its values today, so restricted sub-options cover this.
    expect(errorOf({ from: { ref: "r", mode: "merge" } })).toEqual({ name: "InvalidSubOptionValueError", message: "The “mode” sub-option doesn't accept “merge” as a value" });
    expect(errorOf({ from: { ref: "r", include: ["id", "nope"] } })).toEqual({ name: "InvalidSubOptionValueError", message: "The “include” sub-option doesn't accept “id,nope” as a value" });
  });

  it("rejects unknown sub-options, including inherited keys.", () => {
    expect(errorOf({ content: { kind: "x" } })).toEqual({ name: "InvalidSubOptionNameError", message: "The “content” option doesn't recognize “kind” as a valid sub-option" });
    expect(errorOf({ from: { ref: "r", constructor: 1 } }).name).toBe("InvalidSubOptionNameError");
    expect(errorOf({ from: { ref: "r", children: { other: 1 } } })).toEqual({ name: "InvalidSubOptionNameError", message: "The “children” option doesn't recognize “other” as a valid sub-option" });
  });

  it("rejects sub-option values of the wrong type.", () => {
    expect(errorOf({ content: { value: 1 } })).toEqual({ name: "InvalidSubOptionTypeError", message: "The \"value\" sub-option doesn't accept values of type \"number\"" });
    expect(errorOf({ from: { ref: "r", children: null } }).name).toBe("InvalidSubOptionTypeError");
    expect(errorOf({ from: { ref: "r", children: { allow: "yes" } } }).name).toBe("InvalidSubOptionTypeError");
  });

  it("rejects nested sub-option values that aren't allowed.", () => {
    expect(errorOf({ from: { ref: "r", children: { placement: "middle" } } }).name).toBe("InvalidSubOptionValueError");
  });

  it("rejects refs starting with @.", () => {
    expect(errorOf({ ref: "@x" })).toEqual({ name: "InvalidReferenceOptionValueError", message: "“ref” options must not begin with the “@” symbol" });
  });

  it("requires a ref in from.", () => {
    expect(errorOf({ from: {} })).toEqual({ name: "InvalidReferencingOptionError", message: "The “from” option must always have a “ref” sub-option" });
  });

  it("rejects include and exclude only when both restrict.", () => {
    const conflict = { name: "InvalidReferencingOptionError", message: "The “from” option can’t have both the “include” and “exclude” sub-options at the same time" };

    expect(errorOf({ from: { ref: "r", include: ["id"], exclude: ["classes"] } })).toEqual(conflict);
    expect(() => validateOptions({ from: { ref: "r", include: [], exclude: ["classes"] } })).not.toThrow();
    expect(() => validateOptions({ from: { ref: "r", include: ["id"], exclude: [] } })).not.toThrow();
    expect(() => validateOptions({ from: { ref: "r", exclude: ["id"] } })).not.toThrow();
    expect(() => validateOptions({ from: { ref: "r", include: ["id"] } })).not.toThrow();
  });

  it("validates children recursively.", () => {
    expect(errorOf({ childNodes: [{ childNodes: [{ bogus: 1 }] }] }).name).toBe("InvalidOptionNameError");
    expect(errorOf({ childNodes: [null] }).name).toBe("InvalidHierarchyError");
  });

  it("validates templates.", () => {
    expect(errorOf({ templates: [{ classes: [] }] }).name).toBe("InvalidTemplateError");
    expect(errorOf({ templates: [{ ref: "t", name: "p" }] })).toEqual({ name: "InvalidTemplateOptionError", message: "“name” is not a valid option to use in templates" });
    expect(errorOf({ templates: [1] }).name).toBe("InvalidHierarchyError");
  });

  it("rejects forbidden options in template mode only.", () => {
    expect(errorOf({ childNodes: [] }, true).name).toBe("InvalidTemplateOptionError");
    expect(errorOf({ templates: [] }, true).name).toBe("InvalidTemplateOptionError");
    expect(() => validateOptions({ childNodes: [] })).not.toThrow();
  });
});


describe("validateTemplates.", () => {
  it("requires an object with a ref.", () => {
    expect(thrown(() => validateTemplates(null)).message).toBe("The hierarchy object is not valid");
    expect(thrown(() => validateTemplates(null)).name).toBe("InvalidHierarchyError");
    expect(thrown(() => validateTemplates({})).message).toBe("A template does not have a “ref” option");
    expect(thrown(() => validateTemplates({})).name).toBe("InvalidTemplateError");
    expect(thrown(() => validateTemplates(Object.create({ ref: "t" }))).name).toBe("InvalidTemplateError");
    expect(() => validateTemplates({ ref: "t" })).not.toThrow();
  });

  it("validates the template's options.", () => {
    expect(thrown(() => validateTemplates({ ref: "t", classes: 1 })).name).toBe("InvalidOptionTypeError");
  });
});
