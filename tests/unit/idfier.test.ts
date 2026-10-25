import { afterEach, describe, expect, it, vi } from "vitest";
import { generateTemmeId, getTemmeId, HIERARCHY_ID_LENGTH, idfy, TEMPLATE_ID_LENGTH } from "../../src/modules/idfier";
import { sanitized } from "../helpers";



afterEach(() => {
  vi.restoreAllMocks();
});


describe("generateTemmeId.", () => {
  it("generates ids of the requested length.", () => {
    expect(generateTemmeId(6)).toHaveLength(6);
    expect(generateTemmeId(4)).toHaveLength(4);
    expect(generateTemmeId(0)).toBe("");
  });

  it("only uses digits and ASCII letters.", () => {
    expect(generateTemmeId(200)).toMatch(/^[0-9a-z]+$/i);
  });

  it("maps the random range onto the whole alphabet.", () => {
    vi.spyOn(Math, "random").mockReturnValue(0);
    expect(generateTemmeId(3)).toBe("000");

    vi.spyOn(Math, "random").mockReturnValue(10 / 62);
    expect(generateTemmeId(1)).toBe("a");

    vi.spyOn(Math, "random").mockReturnValue(36 / 62);
    expect(generateTemmeId(1)).toBe("A");

    vi.spyOn(Math, "random").mockReturnValue(0.999999);
    expect(generateTemmeId(1)).toBe("Z");
  });
});


describe("idfy.", () => {
  it("uses 6-character ids for hierarchies and 4-character ids for templates.", () => {
    expect(HIERARCHY_ID_LENGTH).toBe(6);
    expect(TEMPLATE_ID_LENGTH).toBe(4);

    const hierarchy = sanitized({ templates: [{ ref: "t" }], childNodes: [{}] });

    idfy(hierarchy);

    expect(hierarchy.temmeIds).toHaveLength(1);
    expect(getTemmeId(hierarchy)).toHaveLength(6);
    expect(getTemmeId(hierarchy.childNodes[0]!)).toHaveLength(6);
    expect(getTemmeId(hierarchy.templates[0]!)).toHaveLength(4);
  });

  it("builds temmeId trails from the ancestors.", () => {
    const hierarchy = sanitized({ childNodes: [{ childNodes: [{}], templates: [{ ref: "t" }] }] });

    idfy(hierarchy);

    const child = hierarchy.childNodes[0]!;
    const grandChild = child.childNodes[0]!;
    const template = child.templates[0]!;

    expect(child.temmeIds).toEqual([...hierarchy.temmeIds, getTemmeId(child)]);
    expect(grandChild.temmeIds).toEqual([...child.temmeIds, getTemmeId(grandChild)]);
    expect(template.temmeIds).toEqual([...child.temmeIds, getTemmeId(template)]);
  });

  it("starts from the given trail.", () => {
    const hierarchy = sanitized();

    idfy(hierarchy, ["parent"]);

    expect(hierarchy.temmeIds[0]).toBe("parent");
    expect(hierarchy.temmeIds).toHaveLength(2);
  });

  it("never hands out the same temmeId twice in a tree.", () => {
    const random = vi.spyOn(Math, "random");

    // The first two ids are identical ("000000"), the third differs ("111111").
    random.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0);
    random.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(0);
    random.mockReturnValue(1 / 62);

    const hierarchy = sanitized({ childNodes: [{}] });

    idfy(hierarchy);

    expect(getTemmeId(hierarchy)).toBe("000000");
    expect(getTemmeId(hierarchy.childNodes[0]!)).toBe("111111");
  });

  it("replaces previous temmeIds.", () => {
    const hierarchy = sanitized();

    idfy(hierarchy);
    idfy(hierarchy);

    expect(hierarchy.temmeIds).toHaveLength(1);
  });

  it("handles templates, which have no children of their own.", () => {
    const template = sanitized({ ref: "t" });

    delete (template as Record<string, unknown>).childNodes;
    delete (template as Record<string, unknown>).templates;

    expect(() => idfy(template, [], true)).not.toThrow();
    expect(getTemmeId(template)).toHaveLength(4);
  });
});


describe("getTemmeId.", () => {
  it("returns the innermost temmeId.", () => {
    expect(getTemmeId(sanitized({ temmeIds: ["a", "b", "c"] }))).toBe("c");
  });
});
