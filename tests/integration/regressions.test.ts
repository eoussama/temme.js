/**
 * One test per bug fixed in 1.0.8, through the public API.
 */

import { afterEach, describe, expect, it } from "vitest";
import * as Temme from "../../src/temme";
import { createTarget, thrown } from "../helpers";



afterEach(() => {
  document.body.innerHTML = "";
});


function render(hierarchy: object): string {
  const target = createTarget();

  Temme.parse(hierarchy, target);

  return target.innerHTML;
}


describe("1.0.8 regressions.", () => {
  it("inherited content no longer leaks into other elements or later calls.", () => {
    expect(render({ childNodes: [{ ref: "a", content: { value: "A" } }, { from: { ref: "a" } }, { name: "p" }] })).toBe("<div>A</div><div>A</div><p></p>");
    expect(render({ childNodes: [{ name: "p" }] })).toBe("<p></p>");
  });

  it("inherited template classes no longer leak into other elements.", () => {
    render({ templates: [{ ref: "t1", from: { ref: "t2" } }, { ref: "t2", classes: ["leak"] }] });

    expect(render({ templates: [{ ref: "x" }], childNodes: [{ from: { ref: "x" } }] })).toBe("<div></div>");
  });

  it("null values and entries throw Temme errors instead of TypeErrors.", () => {
    expect(thrown(() => render({ content: null }))).toBeInstanceOf(Temme.InvalidOptionTypeError);
    expect(thrown(() => render({ from: null }))).toBeInstanceOf(Temme.InvalidOptionTypeError);
    expect(thrown(() => render({ attributes: null }))).toBeInstanceOf(Temme.InvalidOptionTypeError);
    expect(thrown(() => render({ childNodes: [null] }))).toBeInstanceOf(Temme.InvalidHierarchyError);
    expect(thrown(() => render({ templates: [null] }))).toBeInstanceOf(Temme.InvalidHierarchyError);
  });

  it("templates can reference outer elements.", () => {
    document.body.innerHTML = "<div id=\"o\" class=\"c\"></div>";

    expect(render({ templates: [{ ref: "t", from: { ref: "@#o", include: ["classes"] } }], childNodes: [{ from: { ref: "t" } }] })).toBe("<div class=\"c\"></div>");
  });

  it("outer element references honor exclude and never copy children.", () => {
    document.body.innerHTML = "<div id=\"o\" class=\"c\" title=\"t\"><b>x</b></div>";

    expect(render({ childNodes: [{ from: { ref: "@#o", exclude: ["id", "classes", "content"], children: { allow: true } } }] })).toBe("<div title=\"t\"></div>");
  });

  it("inheritance chains resolve whatever the declaration order.", () => {
    expect(render({ childNodes: [{ name: "i", from: { ref: "b" } }, { ref: "b", from: { ref: "c" } }, { ref: "c", classes: ["c"] }] })).toBe("<i class=\"c\"></i><div class=\"c\"></div><div class=\"c\"></div>");
  });

  it("circular references throw instead of overflowing the stack.", () => {
    expect(thrown(() => render({ childNodes: [{ ref: "a", from: { ref: "b" } }, { ref: "b", from: { ref: "a" } }] }))).toBeInstanceOf(Temme.CircularReferenceError);
    expect(thrown(() => render({ ref: "root", childNodes: [{ from: { ref: "root", children: { allow: true } } }] }))).toBeInstanceOf(Temme.CircularReferenceError);
  });

  it("inherited values are copies, not shared references.", () => {
    const hierarchy = Temme.parse({ childNodes: [{ ref: "a", classes: ["x"] }, { from: { ref: "a", mode: "override" } }] }, createTarget());

    expect(hierarchy.childNodes[1]!.classes).not.toBe(hierarchy.childNodes[0]!.classes);
  });

  it("callback errors and non-Error throws propagate untouched.", () => {
    expect(thrown(() => Temme.parse({}, createTarget(), () => {
      throw new Error("mine");
    })).message).toBe("mine");
    expect(() => Temme.parse({}, createTarget(), () => {
      // eslint-disable-next-line no-throw-literal -- verifies that non-Error throws pass through.
      throw "boom";
    })).toThrow("boom");
  });

  it("validate catches reference errors.", () => {
    expect(Temme.validate({ childNodes: [{ from: { ref: "nope" } }] }).valid).toBe(false);
  });

  it("a returned hierarchy can be parsed again.", () => {
    const hierarchy = Temme.parse({ childNodes: [{ ref: "a", content: { value: "A" } }, { content: { value: "B" }, from: { ref: "a" } }] }, createTarget());

    expect(render(hierarchy)).toBe("<div>A</div><div>B A</div>");
  });

  it("prototype keys are not treated as options.", () => {
    expect(() => render(Object.create({ bogus: 1 }))).not.toThrow();
  });

  it("outer element attributes are read reliably.", () => {
    document.body.innerHTML = "<div id=\"o\" title=\"t\" data-x=\"1\" class=\"c\"></div>";

    expect(render({ childNodes: [{ from: { ref: "@#o" } }] })).toBe("<div id=\"o\" class=\"c\" title=\"t\" data-x=\"1\"></div>");
  });

  it("appending to empty content adds no leading space and keeps the inherited type.", () => {
    document.body.innerHTML = "<div id=\"o\"><b>x</b></div>";

    expect(render({ childNodes: [{ ref: "a", content: { value: "A" } }, { from: { ref: "a" } }] })).toBe("<div>A</div><div>A</div>");
    expect(render({ childNodes: [{ from: { ref: "@#o", include: ["content"] } }] })).toBe("<div><b>x</b></div>");
  });

  it("malformed @selectors throw Temme errors.", () => {
    expect(thrown(() => render({ from: { ref: "@##" } }))).toBeInstanceOf(Temme.InvalidReferenceOptionValueError);
  });

  it("inheriting from a template with children allowed no longer crashes.", () => {
    expect(render({ templates: [{ ref: "t", classes: ["c"] }], childNodes: [{ from: { ref: "t", children: { allow: true } } }] })).toBe("<div class=\"c\"></div>");
  });

  it("templates can't reach templates nested deeper than themselves.", () => {
    expect(thrown(() => render({ templates: [{ ref: "t", from: { ref: "inner" } }], childNodes: [{ templates: [{ ref: "inner" }] }] }))).toBeInstanceOf(Temme.ReferenceOutOfScopeError);
  });
});
