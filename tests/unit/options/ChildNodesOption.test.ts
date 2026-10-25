import { describe, expect, it } from "vitest";
import ChildNodesOption from "../../../src/modules/options/ChildrenNodesOption";
import { sanitized } from "../../helpers";



const option = new ChildNodesOption();
const own = (): ReturnType<typeof sanitized> => sanitized({ name: "own" });
const incoming = (): Array<ReturnType<typeof sanitized>> => [sanitized({ name: "in1" }), sanitized({ name: "in2" })];
const names = (hierarchy: ReturnType<typeof sanitized>): Array<string> => hierarchy.childNodes.map(child => child.name);


describe("childNodesOption.inherit.", () => {
  it("inherits nothing unless children are allowed.", () => {
    const hierarchy = sanitized({ childNodes: [{ name: "own" }], from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, incoming());

    expect(names(hierarchy)).toEqual(["own"]);
  });

  it("appends after the own children by default.", () => {
    const hierarchy = sanitized({ from: { ref: "x", children: { allow: true } } });

    hierarchy.childNodes = [own()];
    option.inherit(hierarchy, incoming());

    expect(names(hierarchy)).toEqual(["own", "in1", "in2"]);
  });

  it("prepends before the own children with the before placement.", () => {
    const hierarchy = sanitized({ from: { ref: "x", children: { allow: true, placement: "before" } } });

    hierarchy.childNodes = [own()];
    option.inherit(hierarchy, incoming());

    expect(names(hierarchy)).toEqual(["in1", "in2", "own"]);
  });

  it("replaces the own children in override mode.", () => {
    const hierarchy = sanitized({ from: { ref: "x", mode: "override", children: { allow: true, placement: "before" } } });

    hierarchy.childNodes = [own()];
    option.inherit(hierarchy, incoming());

    expect(names(hierarchy)).toEqual(["in1", "in2"]);
  });
});


describe("childNodesOption.getKeyFromElement.", () => {
  it("never reads children from outer elements.", () => {
    const element = document.createElement("div");

    element.innerHTML = "<p></p>";

    expect(option.getKeyFromElement(element)).toBeNull();
  });
});
