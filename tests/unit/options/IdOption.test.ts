import { describe, expect, it } from "vitest";
import IdOption from "../../../src/modules/options/IdOption";
import { createTarget, sanitized } from "../../helpers";



const option = new IdOption();


describe("idOption.inherit.", () => {
  it("only fills an empty id in append mode.", () => {
    const empty = sanitized();
    const own = sanitized({ id: "own" });

    option.inherit(empty, "in");
    option.inherit(own, "in");

    expect(empty.id).toBe("in");
    expect(own.id).toBe("own");
  });

  it("replaces the id in override mode.", () => {
    const hierarchy = sanitized({ id: "own", from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, "in");

    expect(hierarchy.id).toBe("in");
  });

  it("ignores empty ids.", () => {
    const hierarchy = sanitized({ id: "own", from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, "");

    expect(hierarchy.id).toBe("own");
  });
});


describe("idOption.getKeyFromElement.", () => {
  it("reads the element's id.", () => {
    const element = createTarget();

    element.id = "the-id";

    expect(option.getKeyFromElement(element)).toBe("the-id");
  });
});


describe("idOption.parse.", () => {
  it("sets a non-empty id.", () => {
    const element = createTarget();

    option.parse(element, sanitized({ id: "x" }));

    expect(element.id).toBe("x");
  });

  it("leaves the id alone when empty.", () => {
    const element = createTarget();

    element.id = "existing";
    option.parse(element, sanitized());

    expect(element.id).toBe("existing");
    expect(createTarget().hasAttribute("id")).toBe(false);
  });
});
