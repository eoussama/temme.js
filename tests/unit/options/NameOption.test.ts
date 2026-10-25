import { describe, expect, it } from "vitest";
import NameOption from "../../../src/modules/options/NameOption";
import { sanitized } from "../../helpers";



const option = new NameOption();


describe("nameOption.inherit.", () => {
  it("keeps the own tag name in append mode.", () => {
    const hierarchy = sanitized({ name: "span" });

    option.inherit(hierarchy, "p");

    expect(hierarchy.name).toBe("span");
  });

  it("takes the incoming tag name in override mode.", () => {
    const hierarchy = sanitized({ name: "span", from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, "p");

    expect(hierarchy.name).toBe("p");
  });
});


describe("nameOption.getKeyFromElement.", () => {
  it("never reads tag names from outer elements.", () => {
    expect(option.getKeyFromElement(document.createElement("p"))).toBeNull();
  });
});
