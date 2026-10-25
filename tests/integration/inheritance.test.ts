/**
 * Inheritance scenarios through the public `parse` API.
 */

import { afterEach, describe, expect, it } from "vitest";
import { parse } from "../../src/temme";
import { childAt, createTarget } from "../helpers";



afterEach(() => {
  document.body.innerHTML = "";
});


function render(hierarchy: object): HTMLElement {
  const target = createTarget();

  parse(hierarchy, target);

  return target;
}


describe("inheritance modes.", () => {
  it("append keeps own values and adds inherited ones.", () => {
    const target = render({
      childNodes: [
        { ref: "a", name: "p", id: "a", classes: ["x"], attributes: { title: "a", lang: "en" }, content: { value: "A" } },
        { name: "span", classes: ["own"], attributes: { title: "own" }, content: { value: "B" }, from: { ref: "a" } },
      ],
    });

    expect(childAt(target, 1).outerHTML).toBe("<span id=\"a\" class=\"own x\" title=\"own\" lang=\"en\">B A</span>");
  });

  it("override replaces own values with inherited ones.", () => {
    const target = render({
      childNodes: [
        { ref: "a", name: "p", id: "a", classes: ["x"], attributes: { title: "a" }, content: { value: "A" } },
        { name: "span", id: "own", classes: ["own"], attributes: { title: "own", lang: "fr" }, content: { value: "B" }, from: { ref: "a", mode: "override" } },
      ],
    });

    expect(childAt(target, 1).outerHTML).toBe("<p id=\"a\" class=\"x\" title=\"a\" lang=\"fr\">A</p>");
  });
});


describe("inheritance range.", () => {
  it("include limits inheritance to the listed options.", () => {
    const target = render({ childNodes: [{ ref: "a", id: "a", classes: ["x"] }, { from: { ref: "a", include: ["classes"] } }] });

    expect(childAt(target, 1).outerHTML).toBe("<div class=\"x\"></div>");
  });

  it("exclude removes the listed options from inheritance.", () => {
    const target = render({ childNodes: [{ ref: "a", id: "a", classes: ["x"] }, { from: { ref: "a", exclude: ["classes"] } }] });

    expect(childAt(target, 1).outerHTML).toBe("<div id=\"a\"></div>");
  });
});


describe("children inheritance.", () => {
  const source = { ref: "a", childNodes: [{ name: "b" }, { name: "i" }] };

  it("is off by default.", () => {
    expect(childAt(render({ childNodes: [source, { childNodes: [{ name: "u" }], from: { ref: "a" } }] }), 1).innerHTML).toBe("<u></u>");
  });

  it("appends inherited children after the own ones.", () => {
    expect(childAt(render({ childNodes: [source, { childNodes: [{ name: "u" }], from: { ref: "a", children: { allow: true } } }] }), 1).innerHTML).toBe("<u></u><b></b><i></i>");
  });

  it("can prepend inherited children.", () => {
    expect(childAt(render({ childNodes: [source, { childNodes: [{ name: "u" }], from: { ref: "a", children: { allow: true, placement: "before" } } }] }), 1).innerHTML).toBe("<b></b><i></i><u></u>");
  });

  it("replaces the own children in override mode.", () => {
    expect(childAt(render({ childNodes: [source, { childNodes: [{ name: "u" }], from: { ref: "a", mode: "override", children: { allow: true } } }] }), 1).innerHTML).toBe("<b></b><i></i>");
  });

  it("gives inherited children their own temmeIds.", () => {
    const ids: Array<string> = [];

    parse({ childNodes: [source, { from: { ref: "a", children: { allow: true } } }] }, createTarget(), undefined, id => ids.push(id));

    expect(ids).toHaveLength(7);
    expect(new Set(ids).size).toBe(7);
  });
});


describe("templates.", () => {
  it("are not rendered.", () => {
    expect(render({ templates: [{ ref: "t", classes: ["x"] }] }).innerHTML).toBe("");
  });

  it("can be inherited from anywhere in their scope.", () => {
    const target = render({ templates: [{ ref: "card", classes: ["card"], attributes: { role: "note" } }], childNodes: [{ childNodes: [{ from: { ref: "card" } }] }] });

    expect(target.innerHTML).toBe("<div><div class=\"card\" role=\"note\"></div></div>");
  });

  it("can inherit from each other in any order.", () => {
    const target = render({
      templates: [{ ref: "big", classes: ["big"], from: { ref: "base" } }, { ref: "base", classes: ["base"] }],
      childNodes: [{ from: { ref: "big" } }],
    });

    expect(target.innerHTML).toBe("<div class=\"base big\"></div>");
  });
});


describe("outer elements.", () => {
  it("are referenced with @ and a CSS selector.", () => {
    document.body.innerHTML = "<nav id=\"menu\" class=\"dark\" data-theme=\"night\" aria-label=\"main\"><a>x</a></nav>";

    const target = render({ childNodes: [{ from: { ref: "@#menu" } }] });

    expect(target.innerHTML).toBe("<div id=\"menu\" class=\"dark\" aria-label=\"main\" data-theme=\"night\"><a>x</a></div>");
  });

  it("respect include and exclude.", () => {
    document.body.innerHTML = "<nav id=\"menu\" class=\"dark\" aria-label=\"main\">x</nav>";

    const target = render({ childNodes: [{ from: { ref: "@#menu", include: ["classes"] } }, { from: { ref: "@#menu", exclude: ["id", "content"] } }] });

    expect(target.innerHTML).toBe("<div class=\"dark\"></div><div class=\"dark\" aria-label=\"main\"></div>");
  });
});
