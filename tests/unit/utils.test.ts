import { describe, expect, it } from "vitest";
import { clone, isResolved, markResolved, uniqueSorted } from "../../src/modules/utils";



describe("clone.", () => {
  it("returns primitives and functions as-is.", () => {
    const fn = (): void => {};

    expect(clone("a")).toBe("a");
    expect(clone(1)).toBe(1);
    expect(clone(true)).toBe(true);
    expect(clone(null)).toBeNull();
    expect(clone(undefined)).toBeUndefined();
    expect(clone(fn)).toBe(fn);
  });

  it("deep-copies arrays and plain objects.", () => {
    const source = { list: [1, { a: [2] }], nested: { b: "c" } };
    const copy = clone(source);

    expect(copy).toEqual(source);
    expect(copy).not.toBe(source);
    expect(copy.list).not.toBe(source.list);
    expect(copy.list[1]).not.toBe(source.list[1]);
    expect(copy.nested).not.toBe(source.nested);
  });

  it("copies own enumerable keys only.", () => {
    const source = Object.create({ inherited: true }) as Record<string, unknown>;

    source.own = 1;

    expect(clone(source)).toStrictEqual({ own: 1 });
  });

  it("carries the resolved state over to copies.", () => {
    const resolvedSource = { a: 1 };
    const pendingSource = { a: 1 };

    markResolved(resolvedSource);

    expect(isResolved(clone(resolvedSource))).toBe(true);
    expect(isResolved(clone(pendingSource))).toBe(false);
    expect(isResolved(clone([resolvedSource])[0] as object)).toBe(true);
  });
});


describe("resolved state.", () => {
  it("is false until an object is marked.", () => {
    const target = {};

    expect(isResolved(target)).toBe(false);
    markResolved(target);
    expect(isResolved(target)).toBe(true);
    expect(isResolved({})).toBe(false);
  });
});


describe("uniqueSorted.", () => {
  it("removes duplicates and sorts.", () => {
    expect(uniqueSorted(["b", "a", "b", "c", "a"])).toEqual(["a", "b", "c"]);
  });

  it("returns a new array.", () => {
    const list = ["a"];

    expect(uniqueSorted(list)).not.toBe(list);
  });
});
