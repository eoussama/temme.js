/**
 * End-to-end rendering scenarios through the public `parse` API.
 */

import { describe, expect, it } from "vitest";
import { parse } from "../../src/temme";
import { childAt, createTarget } from "../helpers";



describe("rendering.", () => {
  it("renders the root options onto the target itself.", () => {
    const target = createTarget();

    parse({ id: "root", classes: ["b", "a"], attributes: { role: "main" }, dataset: { k: "v" } }, target);

    expect(target.outerHTML).toBe("<div id=\"root\" class=\"a b\" role=\"main\" data-k=\"v\"></div>");
  });

  it("creates children with the requested tag names, divs by default.", () => {
    const target = createTarget();

    parse({ childNodes: [{ name: "section" }, {}] }, target);

    expect(target.innerHTML).toBe("<section></section><div></div>");
  });

  it("renders nested children recursively.", () => {
    const target = createTarget();

    parse({ childNodes: [{ name: "ul", childNodes: [{ name: "li", content: { value: "1" } }, { name: "li", content: { value: "2" } }] }] }, target);

    expect(target.innerHTML).toBe("<ul><li>1</li><li>2</li></ul>");
  });

  it("renders text content as text and html content as markup.", () => {
    const target = createTarget();

    parse({ childNodes: [{ content: { value: "<b>x</b>" } }, { content: { type: "html", value: "<b>x</b>" } }] }, target);

    expect(childAt(target, 0).textContent).toBe("<b>x</b>");
    expect(childAt(target, 1).innerHTML).toBe("<b>x</b>");
  });

  it("stringifies number and boolean attributes and dataset values.", () => {
    const target = createTarget();

    parse({ childNodes: [{ attributes: { tabindex: 0, hidden: true }, dataset: { count: 2, on: false } }] }, target);

    expect(target.innerHTML).toBe("<div tabindex=\"0\" hidden=\"true\" data-count=\"2\" data-on=\"false\"></div>");
  });

  it("de-duplicates and sorts classes.", () => {
    const target = createTarget();

    parse({ childNodes: [{ classes: ["c", "a", "c", "b"] }] }, target);

    expect(childAt(target, 0).className).toBe("a b c");
  });

  it("keeps the target's existing content and attributes when the root sets none.", () => {
    const target = createTarget();

    target.id = "kept";
    target.innerHTML = "<span></span>";
    parse({ childNodes: [{ name: "p" }] }, target);

    expect(target.outerHTML).toBe("<div id=\"kept\"><span></span><p></p></div>");
  });

  it("renders the same tree when the returned hierarchy is parsed again.", () => {
    const first = createTarget();
    const second = createTarget();
    const hierarchy = parse({
      templates: [{ ref: "t", classes: ["tpl"] }],
      childNodes: [
        { ref: "a", content: { value: "A" }, childNodes: [{ name: "i" }] },
        { content: { value: "B" }, from: { ref: "a", children: { allow: true } } },
        { from: { ref: "t" } },
      ],
    }, first);

    parse(hierarchy, second);

    expect(second.innerHTML).toBe(first.innerHTML);
    expect(first.innerHTML).toBe("<div>A<i></i></div><div>B A<i></i></div><div class=\"tpl\"></div>");
  });

  it("renders children added to a returned hierarchy.", () => {
    const target = createTarget();
    const hierarchy = parse({ childNodes: [{ ref: "a", classes: ["c"] }] }, createTarget());

    hierarchy.childNodes.push({ name: "p", from: { ref: "a" } } as unknown as typeof hierarchy);
    parse(hierarchy, target);

    expect(target.innerHTML).toBe("<div class=\"c\"></div><p class=\"c\"></p>");
  });
});
