import type { Hierarchy, HierarchyInput } from "../../src/temme";
import { afterEach, describe, expect, it } from "vitest";
import { process } from "../../src/modules/referencer";
import { isResolved } from "../../src/modules/utils";
import { sanitized, thrown } from "../helpers";



afterEach(() => {
  document.body.innerHTML = "";
});


/**
 * Sanitizes and resolves a hierarchy against a document.
 *
 * @param input The hierarchy literal.
 * @param dom The root `@selector` references are queried in.
 * @returns {Hierarchy} The resolved hierarchy.
 */
function resolve(input: HierarchyInput, dom: ParentNode = document): Hierarchy {
  const hierarchy = sanitized(input);

  process(hierarchy, dom);

  return hierarchy;
}

function errorOf(input: HierarchyInput, dom: ParentNode = document): { name: string; message: string } {
  const { name, message } = thrown(() => resolve(input, dom));

  return { name, message };
}

function child(hierarchy: Hierarchy, ...path: Array<number>): Hierarchy {
  return path.reduce((node: Hierarchy, index: number) => node.childNodes[index]!, hierarchy);
}


describe("reference validation.", () => {
  it("rejects references to unknown hierarchies.", () => {
    expect(errorOf({ childNodes: [{ from: { ref: "nope" } }] })).toEqual({ name: "InvalidReferenceError", message: "“nope” is an invalid reference" });
  });

  it("rejects self references.", () => {
    expect(errorOf({ childNodes: [{ ref: "self", from: { ref: "self" } }] }).name).toBe("InvalidReferenceError");
  });

  it("rejects @selectors that match nothing.", () => {
    expect(errorOf({ from: { ref: "@#missing" } })).toEqual({ name: "InvalidReferenceOptionValueError", message: "No outer element corresponds to the selector \"#missing\"" });
  });

  it("rejects malformed @selectors, keeping the DOM error as the cause.", () => {
    const error = thrown(() => resolve({ from: { ref: "@##" } }));

    expect(error.name).toBe("InvalidReferenceOptionValueError");
    expect(error.message).toBe("\"##\" is not a valid selector");
    expect(error.cause).toBeInstanceOf(Error);
  });

  it("rejects templates that reference plain hierarchies.", () => {
    expect(errorOf({ ref: "root", templates: [{ ref: "t", from: { ref: "root" } }] })).toEqual({
      name: "InvalidTemplateReferencingError",
      message: "The template with the reference “t” is trying to reference “root” a non-template object",
    });
  });

  it("rejects references to hierarchies nested deeper than the referencing one.", () => {
    expect(errorOf({ from: { ref: "deep" }, childNodes: [{ ref: "deep" }] })).toEqual({ name: "ReferenceOutOfScopeError", message: "An object is referencing an element out of its scope" });
    expect(errorOf({ childNodes: [{ from: { ref: "nephew" } }, { childNodes: [{ ref: "nephew" }] }] }).name).toBe("ReferenceOutOfScopeError");
  });

  it("scopes templates at the depth of the hierarchy declaring them.", () => {
    // A root template can't reach a template declared by a child.
    expect(errorOf({ templates: [{ ref: "t", from: { ref: "inner" } }], childNodes: [{ templates: [{ ref: "inner" }] }] }).name).toBe("ReferenceOutOfScopeError");
    // A child can reach the templates of its parent, and its own.
    expect(() => resolve({ templates: [{ ref: "t" }], childNodes: [{ from: { ref: "t" } }] })).not.toThrow();
    expect(() => resolve({ childNodes: [{ templates: [{ ref: "own" }], from: { ref: "own" } }] })).not.toThrow();
  });

  it("allows references to shallower and same-depth hierarchies.", () => {
    expect(() => resolve({ ref: "root", childNodes: [{ from: { ref: "root" } }, { ref: "sibling" }, { from: { ref: "sibling" } }] })).not.toThrow();
  });

  it("validates every reference before applying any inheritance.", () => {
    const hierarchy = sanitized({ childNodes: [{ ref: "a", classes: ["x"] }, { from: { ref: "a" } }, { from: { ref: "nope" } }] });

    expect(() => process(hierarchy, document)).toThrow();
    expect(child(hierarchy, 1).classes).toEqual([]);
  });
});


describe("inheritance from hierarchies.", () => {
  it("inherits every inheritable option by default.", () => {
    const hierarchy = resolve({
      childNodes: [
        { ref: "a", name: "p", id: "a-id", classes: ["c"], attributes: { title: "t" }, dataset: { k: "v" }, content: { value: "text" } },
        { from: { ref: "a" } },
      ],
    });

    expect(child(hierarchy, 1)).toMatchObject({ name: "div", id: "a-id", classes: ["c"], attributes: { title: "t" }, dataset: { k: "v" }, content: { type: "text", value: "text" } });
  });

  it("only inherits included options, minus excluded ones.", () => {
    const hierarchy = resolve({
      childNodes: [
        { ref: "a", id: "a-id", classes: ["c"], dataset: { k: "v" } },
        { from: { ref: "a", include: ["classes"] } },
        { from: { ref: "a", exclude: ["classes"] } },
      ],
    });

    expect(child(hierarchy, 1)).toMatchObject({ id: "", classes: ["c"], dataset: {} });
    expect(child(hierarchy, 2)).toMatchObject({ id: "a-id", classes: [], dataset: { k: "v" } });
  });

  it("copies inherited values instead of sharing them.", () => {
    const hierarchy = resolve({ childNodes: [{ ref: "a", classes: ["c"], attributes: { t: "1" } }, { from: { ref: "a", mode: "override" } }] });

    expect(child(hierarchy, 1).classes).not.toBe(child(hierarchy, 0).classes);
    expect(child(hierarchy, 1).attributes).not.toBe(child(hierarchy, 0).attributes);
    expect(child(hierarchy, 1).content).not.toBe(child(hierarchy, 0).content);
  });

  it("resolves chains in dependency order, whatever the declaration order.", () => {
    const hierarchy = resolve({ childNodes: [{ from: { ref: "b" } }, { ref: "b", from: { ref: "c" } }, { ref: "c", classes: ["deep"] }] });

    expect(child(hierarchy, 0).classes).toEqual(["deep"]);
    expect(child(hierarchy, 1).classes).toEqual(["deep"]);
  });

  it("resolves template chains in dependency order.", () => {
    const hierarchy = resolve({
      templates: [{ ref: "t1", from: { ref: "t2" } }, { ref: "t2", from: { ref: "t3" } }, { ref: "t3", classes: ["deep"] }],
      childNodes: [{ from: { ref: "t1" } }],
    });

    expect(child(hierarchy, 0).classes).toEqual(["deep"]);
  });

  it("doesn't inherit name and children from templates, which have none.", () => {
    const hierarchy = resolve({ templates: [{ ref: "t", classes: ["c"] }], childNodes: [{ name: "p", childNodes: [{}], from: { ref: "t", mode: "override", children: { allow: true } } }] });

    expect(child(hierarchy, 0).name).toBe("p");
    expect(child(hierarchy, 0).childNodes).toHaveLength(1);
    expect(child(hierarchy, 0).classes).toEqual(["c"]);
  });

  it("templates don't inherit name and children.", () => {
    const hierarchy = resolve({ templates: [{ ref: "t1", from: { ref: "t2", children: { allow: true } } }, { ref: "t2", classes: ["c"] }] });
    const template = hierarchy.templates[0]!;

    expect(template.classes).toEqual(["c"]);
    expect(Object.keys(template)).not.toContain("name");
    expect(Object.keys(template)).not.toContain("childNodes");
  });

  it("rejects circular references.", () => {
    expect(errorOf({ childNodes: [{ ref: "a", from: { ref: "b" } }, { ref: "b", from: { ref: "a" } }] })).toEqual({
      name: "CircularReferenceError",
      message: "The “b” reference is part of a circular inheritance chain",
    });
    expect(errorOf({ templates: [{ ref: "t1", from: { ref: "t2" } }, { ref: "t2", from: { ref: "t1" } }] }).name).toBe("CircularReferenceError");
  });

  it("rejects inheriting the children of an ancestor, which would contain the heir itself.", () => {
    expect(errorOf({ ref: "root", childNodes: [{ from: { ref: "root", children: { allow: true } } }] }).name).toBe("CircularReferenceError");
  });

  it("allows inheriting an ancestor's other options.", () => {
    const hierarchy = resolve({ ref: "root", classes: ["r"], childNodes: [{ from: { ref: "root" } }] });

    expect(child(hierarchy, 0).classes).toEqual(["r"]);
  });

  it("marks every hierarchy and template as resolved.", () => {
    const hierarchy = resolve({ templates: [{ ref: "t" }], childNodes: [{ from: { ref: "t" } }, {}] });

    expect([hierarchy, hierarchy.templates[0], ...hierarchy.childNodes].every(node => isResolved(node as object))).toBe(true);
  });

  it("skips hierarchies that are already resolved.", () => {
    const hierarchy = resolve({ childNodes: [{ ref: "a", content: { value: "A" } }, { content: { value: "B" }, from: { ref: "a" } }] });

    process(hierarchy, document);

    expect(child(hierarchy, 1).content.value).toBe("B A");
  });

  it("never inherits twice along a chain of appended content.", () => {
    const hierarchy = resolve({
      childNodes: [
        { ref: "c", content: { value: "C" } },
        { ref: "b", content: { value: "B" }, from: { ref: "c" } },
        { from: { ref: "b" } },
      ],
    });

    expect(child(hierarchy, 1).content.value).toBe("B C");
    expect(child(hierarchy, 2).content.value).toBe("B C");
  });

  it("leaves resolved hierarchies out of later validations.", () => {
    // The referenced hierarchy is removed after the first resolution: the heir keeps its
    // inherited values and is not validated again.
    const hierarchy = resolve({ childNodes: [{ ref: "a", classes: ["c"] }, { from: { ref: "a" } }] });

    hierarchy.childNodes.shift();

    expect(() => process(hierarchy, document)).not.toThrow();
    expect(child(hierarchy, 0).classes).toEqual(["c"]);
  });

  it("resolves hierarchies added after a previous resolution.", () => {
    const hierarchy = resolve({ childNodes: [{ ref: "a", classes: ["c"] }] });

    hierarchy.childNodes.push(sanitized({ from: { ref: "a" } }));
    process(hierarchy, document);

    expect(child(hierarchy, 1).classes).toEqual(["c"]);
  });
});


describe("children inheritance.", () => {
  it("copies fully resolved children without their refs.", () => {
    const hierarchy = resolve({
      childNodes: [
        { from: { ref: "a", children: { allow: true } } },
        { ref: "a", childNodes: [{ ref: "kid", from: { ref: "t" }, templates: [{ ref: "inner" }] }] },
        { ref: "t", classes: ["late"] },
      ],
    });
    const copy = child(hierarchy, 0, 0);
    const original = child(hierarchy, 1, 0);

    expect(copy).not.toBe(original);
    expect(copy.classes).toEqual(["late"]);
    expect(copy.ref).toBe("");
    expect(copy.templates[0]!.ref).toBe("");
    expect(original.ref).toBe("kid");
    expect(isResolved(copy)).toBe(true);
  });

  it("does not copy children unless allowed.", () => {
    const hierarchy = resolve({ childNodes: [{ ref: "a", childNodes: [{}] }, { from: { ref: "a" } }] });

    expect(child(hierarchy, 1).childNodes).toHaveLength(0);
  });

  it("does not resolve the source's descendants when children aren't inherited.", () => {
    // `b` reads `a`'s descendants only when allowed to: without it, there's no cycle here.
    expect(() => resolve({ ref: "b", childNodes: [{ ref: "a", childNodes: [{ from: { ref: "b" } }] }, { from: { ref: "a" } }] })).not.toThrow();
  });
});


describe("inheritance from outer elements.", () => {
  const outer = (): void => {
    document.body.innerHTML = "<p id=\"outer\" class=\"x y\" title=\"t\" data-key=\"v\"><b>bold</b></p>";
  };

  it("inherits the outer element's options.", () => {
    outer();

    const hierarchy = resolve({ name: "span", from: { ref: "@#outer" } });

    expect(hierarchy).toMatchObject({
      name: "span",
      id: "outer",
      classes: ["x", "y"],
      attributes: { title: "t" },
      dataset: { key: "v" },
      content: { type: "html", value: "<b>bold</b>" },
      childNodes: [],
    });
  });

  it("honors include and exclude.", () => {
    outer();

    expect(resolve({ from: { ref: "@#outer", include: ["classes"] } })).toMatchObject({ id: "", classes: ["x", "y"], attributes: {} });
    expect(resolve({ from: { ref: "@#outer", exclude: ["id", "content"] } })).toMatchObject({ id: "", classes: ["x", "y"], content: { value: "" } });
  });

  it("keeps options that can't be read from the DOM in override mode.", () => {
    outer();

    const hierarchy = resolve({ name: "span", childNodes: [{}], from: { ref: "@#outer", mode: "override", children: { allow: true } } });

    expect(hierarchy.name).toBe("span");
    expect(hierarchy.childNodes).toHaveLength(1);
  });

  it("never inherits children, even when allowed.", () => {
    outer();

    expect(resolve({ from: { ref: "@#outer", children: { allow: true } } }).childNodes).toEqual([]);
  });

  it("works for templates.", () => {
    outer();

    const hierarchy = resolve({ templates: [{ ref: "t", from: { ref: "@#outer", include: ["classes"] } }], childNodes: [{ from: { ref: "t" } }] });

    expect(child(hierarchy, 0).classes).toEqual(["x", "y"]);
  });

  it("is skipped without a document to query.", () => {
    const hierarchy = sanitized({ from: { ref: "@#outer" } });

    process(hierarchy, undefined);

    expect(hierarchy.classes).toEqual([]);
    expect(isResolved(hierarchy)).toBe(true);
  });

  it("queries the given root.", () => {
    const root = document.createElement("div");

    root.innerHTML = "<i class=\"scoped\"></i>";

    expect(resolve({ from: { ref: "@i" } }, root).classes).toEqual(["scoped"]);
  });
});
