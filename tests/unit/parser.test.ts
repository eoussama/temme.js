import { describe, expect, it, vi } from "vitest";
import { getTemmeId, idfy } from "../../src/modules/idfier";
import { parse } from "../../src/modules/parser";
import { createTarget, sanitized } from "../helpers";



function prepared(input: Parameters<typeof sanitized>[0]): ReturnType<typeof sanitized> {
  const hierarchy = sanitized(input);

  idfy(hierarchy);

  return hierarchy;
}


describe("parser.parse.", () => {
  it("renders onto the parent itself at the top level.", () => {
    const target = createTarget();

    parse(prepared({ id: "root", classes: ["c"] }), target, () => {}, true);

    expect(target.outerHTML).toBe("<div id=\"root\" class=\"c\"></div>");
  });

  it("creates and appends an element below the top level.", () => {
    const target = createTarget();

    parse(prepared({ name: "section", id: "s" }), target, () => {});

    expect(target.innerHTML).toBe("<section id=\"s\"></section>");
  });

  it("renders children recursively, in order.", () => {
    const target = createTarget();

    parse(prepared({ childNodes: [{ name: "p", childNodes: [{ name: "b" }] }, { name: "i" }] }), target, () => {}, true);

    expect(target.innerHTML).toBe("<p><b></b></p><i></i>");
  });

  it("calls the node callback once per element, depth-first, after the element is attached.", () => {
    const hierarchy = prepared({ childNodes: [{ childNodes: [{}] }, {}] });
    const target = createTarget();
    const calls: Array<[string, unknown, boolean]> = [];

    parse(hierarchy, target, (temmeId, current) => {
      calls.push([temmeId, current, target.contains(target.querySelector("*")) || current === hierarchy]);
    }, true);

    const [first, second] = hierarchy.childNodes as [typeof hierarchy, typeof hierarchy];

    expect(calls.map(([id]) => id)).toEqual([
      getTemmeId(hierarchy),
      getTemmeId(first),
      getTemmeId(first.childNodes[0]!),
      getTemmeId(second),
    ]);
    expect(calls.map(([, current]) => current)).toEqual([hierarchy, first, first.childNodes[0], second]);
    expect(calls.every(([, , attached]) => attached)).toBe(true);
  });

  it("creates elements with the parent's own document.", () => {
    const target = createTarget();
    const createElement = vi.spyOn(target.ownerDocument, "createElement");

    parse(prepared({ name: "p" }), target, () => {});

    expect(createElement).toHaveBeenCalledWith("p");
    createElement.mockRestore();
  });
});
