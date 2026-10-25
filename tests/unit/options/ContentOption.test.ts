import { describe, expect, it } from "vitest";
import ContentOption from "../../../src/modules/options/ContentOption";
import { createTarget, sanitized } from "../../helpers";



const option = new ContentOption();


describe("contentOption.inherit.", () => {
  it("ignores empty incoming content.", () => {
    const hierarchy = sanitized({ content: { value: "own" }, from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, { type: "html", value: "" });

    expect(hierarchy.content).toEqual({ type: "text", value: "own" });
  });

  it("appends after existing content, keeping its type.", () => {
    const hierarchy = sanitized({ content: { value: "own" } });

    option.inherit(hierarchy, { type: "html", value: "<b>in</b>" });

    expect(hierarchy.content).toEqual({ type: "text", value: "own <b>in</b>" });
  });

  it("takes the incoming content as-is when appending to empty content.", () => {
    const hierarchy = sanitized();

    option.inherit(hierarchy, { type: "html", value: "<b>in</b>" });

    expect(hierarchy.content).toEqual({ type: "html", value: "<b>in</b>" });
  });

  it("replaces content in override mode.", () => {
    const hierarchy = sanitized({ content: { value: "own" }, from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, { type: "html", value: "in" });

    expect(hierarchy.content).toEqual({ type: "html", value: "in" });
  });

  it("never shares the incoming object.", () => {
    const hierarchy = sanitized({ from: { ref: "x", mode: "override" } });
    const incoming = { type: "text", value: "in" };

    option.inherit(hierarchy, incoming);

    expect(hierarchy.content).not.toBe(incoming);
  });

  it("never mutates the previous content object.", () => {
    const hierarchy = sanitized({ content: { value: "own" } });
    const previous = hierarchy.content;

    option.inherit(hierarchy, { type: "text", value: "in" });

    expect(previous).toEqual({ type: "text", value: "own" });
  });
});


describe("contentOption.getKeyFromElement.", () => {
  it("reads the inner HTML as html content.", () => {
    const element = createTarget();

    element.innerHTML = "<i>x</i>";

    expect(option.getKeyFromElement(element)).toEqual({ type: "html", value: "<i>x</i>" });
  });
});


describe("contentOption.parse.", () => {
  it("renders text content as text.", () => {
    const element = createTarget();

    option.parse(element, sanitized({ content: { value: "<b>x</b>" } }));

    expect(element.textContent).toBe("<b>x</b>");
    expect(element.children).toHaveLength(0);
  });

  it("renders html content as markup.", () => {
    const element = createTarget();

    option.parse(element, sanitized({ content: { type: "html", value: "<b>x</b>" } }));

    expect(element.innerHTML).toBe("<b>x</b>");
  });

  it("leaves the element untouched for empty content.", () => {
    const element = createTarget();

    element.innerHTML = "<span></span>";
    option.parse(element, sanitized({ content: { type: "html" } }));
    option.parse(element, sanitized());

    expect(element.innerHTML).toBe("<span></span>");
  });
});
