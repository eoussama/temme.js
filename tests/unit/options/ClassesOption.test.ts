import { describe, expect, it } from "vitest";
import ClassesOption from "../../../src/modules/options/ClassesOption";
import { createTarget, sanitized } from "../../helpers";



const option = new ClassesOption();


describe("classesOption.inherit.", () => {
  it("merges, de-duplicates and sorts classes in append mode.", () => {
    const hierarchy = sanitized({ classes: ["b", "a"] });

    option.inherit(hierarchy, ["c", "a"]);

    expect(hierarchy.classes).toEqual(["a", "b", "c"]);
  });

  it("replaces classes in override mode.", () => {
    const hierarchy = sanitized({ classes: ["own"], from: { ref: "x", mode: "override" } });

    option.inherit(hierarchy, ["z", "y", "z"]);

    expect(hierarchy.classes).toEqual(["y", "z"]);
  });

  it("never shares the incoming list.", () => {
    const hierarchy = sanitized({ from: { ref: "x", mode: "override" } });
    const incoming = ["a"];

    option.inherit(hierarchy, incoming);

    expect(hierarchy.classes).not.toBe(incoming);
  });
});


describe("classesOption.getKeyFromElement.", () => {
  it("reads the class list.", () => {
    const element = createTarget();

    element.className = "one two";

    expect(option.getKeyFromElement(element)).toEqual(["one", "two"]);
    expect(option.getKeyFromElement(createTarget())).toEqual([]);
  });
});


describe("classesOption.parse.", () => {
  it("adds the classes to the element.", () => {
    const element = createTarget();

    element.className = "existing";
    option.parse(element, sanitized({ classes: ["a", "b"] }));

    expect([...element.classList]).toEqual(["existing", "a", "b"]);
  });

  it("does not create an empty class attribute.", () => {
    const element = createTarget();

    option.parse(element, sanitized());

    expect(element.hasAttribute("class")).toBe(false);
  });
});
