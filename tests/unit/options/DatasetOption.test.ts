import { describe, expect, it } from "vitest";
import DatasetOption from "../../../src/modules/options/DatasetOption";
import { createTarget, sanitized } from "../../helpers";



const option = new DatasetOption();


describe("datasetOption.inherit.", () => {
  it("keeps existing entries over incoming ones in append mode.", () => {
    const hierarchy = sanitized({ dataset: { a: "own", b: "own" } });

    option.inherit(hierarchy, { b: "in", c: "in" });

    expect(hierarchy.dataset).toStrictEqual({ b: "own", c: "in", a: "own" });
  });

  it("lets incoming entries win in override mode.", () => {
    const hierarchy = sanitized({ dataset: { a: "own", b: "own" }, from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, { b: "in", c: "in" });

    expect(hierarchy.dataset).toStrictEqual({ a: "own", b: "in", c: "in" });
  });

  it("never shares the incoming object.", () => {
    const hierarchy = sanitized();
    const incoming = { a: "in" };

    option.inherit(hierarchy, incoming);

    expect(hierarchy.dataset).not.toBe(incoming);
  });
});


describe("datasetOption.getKeyFromElement.", () => {
  it("reads the element's dataset as a plain object.", () => {
    const element = createTarget();

    element.dataset.firstKey = "1";
    element.dataset.second = "2";

    expect(option.getKeyFromElement(element)).toStrictEqual({ firstKey: "1", second: "2" });
  });
});


describe("datasetOption.parse.", () => {
  it("sets every entry, stringifying scalar values.", () => {
    const element = createTarget();

    option.parse(element, sanitized({ dataset: { someKey: "v", count: 2, on: false } }));

    expect(element.getAttribute("data-some-key")).toBe("v");
    expect(element.dataset.count).toBe("2");
    expect(element.dataset.on).toBe("false");
  });
});
