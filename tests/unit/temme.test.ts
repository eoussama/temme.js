import { afterEach, describe, expect, it, vi } from "vitest";
import * as Temme from "../../src/temme";
import { createTarget, thrown } from "../helpers";



afterEach(() => {
  vi.restoreAllMocks();
  document.body.innerHTML = "";
});


describe("module exports.", () => {
  it("exposes parse, validate and every error class, and nothing else.", () => {
    expect(Object.keys(Temme).sort()).toEqual([
      "CircularReferenceError",
      "InvalidHierarchyError",
      "InvalidOptionNameError",
      "InvalidOptionTypeError",
      "InvalidOptionValueError",
      "InvalidReferenceError",
      "InvalidReferenceOptionValueError",
      "InvalidReferencingOptionError",
      "InvalidSubOptionNameError",
      "InvalidSubOptionTypeError",
      "InvalidSubOptionValueError",
      "InvalidTargetError",
      "InvalidTemplateError",
      "InvalidTemplateOptionError",
      "InvalidTemplateReferencingError",
      "ReferenceOutOfScopeError",
      "TemmyError",
      "parse",
      "validate",
    ]);
  });
});


describe("parse.", () => {
  it("renders the hierarchy and returns the completed object itself.", () => {
    const hierarchy = { childNodes: [{ name: "p" }] };
    const target = createTarget();
    const result = Temme.parse(hierarchy, target);

    expect(result).toBe(hierarchy);
    expect(target.innerHTML).toBe("<p></p>");
    expect(result.temmeIds).toHaveLength(1);
    expect(result.childNodes[0]!.temmeIds).toHaveLength(2);
  });

  it("works without callbacks.", () => {
    expect(() => Temme.parse({}, createTarget())).not.toThrow();
    expect(() => Temme.parse({}, createTarget(), undefined, undefined)).not.toThrow();
  });

  it("rejects invalid targets before looking at the hierarchy.", () => {
    const error = thrown(() => Temme.parse({ bogus: 1 }, {} as HTMLElement));

    expect(error).toBeInstanceOf(Temme.InvalidTargetError);
    expect(error.message).toBe("[Temme]: The target is not a valid HTML element.");
  });

  it("prefixes Temme errors once.", () => {
    const error = thrown(() => Temme.parse(null as unknown as object, createTarget()));

    expect(error).toBeInstanceOf(Temme.InvalidHierarchyError);
    expect(error.message).toBe("[Temme]: The hierarchy object is not valid.");
  });

  it("prefixes reference errors too.", () => {
    expect(thrown(() => Temme.parse({ from: { ref: "x" } }, createTarget())).message).toBe("[Temme]: “x” is an invalid reference.");
  });

  it("leaves non-Temme errors raised while preparing untouched.", () => {
    const failure = new Error("unreadable document");
    const target = createTarget();

    Object.defineProperty(target, "ownerDocument", {
      get: () => {
        throw failure;
      },
    });

    expect(thrown(() => Temme.parse({}, target))).toBe(failure);
    expect(failure.message).toBe("unreadable document");
  });

  it("renders nothing when the hierarchy is invalid.", () => {
    const target = createTarget();

    thrown(() => Temme.parse({ childNodes: [{}, { bogus: 1 }] }, target));

    expect(target.innerHTML).toBe("");
  });

  it("queries @selectors in the target's own document.", () => {
    const target = createTarget();
    const querySelector = vi.spyOn(target.ownerDocument, "querySelector");

    document.body.innerHTML = "<i id=\"o\" class=\"c\"></i>";
    Temme.parse({ from: { ref: "@#o" } }, target);

    expect(querySelector).toHaveBeenCalledWith("#o");
    expect(target.className).toBe("c");
  });

  it("calls the end callback with the completed hierarchy, after rendering.", () => {
    const hierarchy = { childNodes: [{}] };
    const target = createTarget();
    const end = vi.fn((result: Temme.Hierarchy) => {
      expect(target.children).toHaveLength(1);
      expect(result).toBe(hierarchy);
    });

    Temme.parse(hierarchy, target, end);

    expect(end).toHaveBeenCalledOnce();
  });

  it("calls the node callback for every element, root first.", () => {
    const hierarchy = { childNodes: [{ childNodes: [{}] }, {}] };
    const calls: Array<Temme.Hierarchy> = [];

    const result = Temme.parse(hierarchy, createTarget(), undefined, (_id, node) => calls.push(node));

    expect(calls).toEqual([result, result.childNodes[0], result.childNodes[0]!.childNodes[0], result.childNodes[1]]);
  });

  it("re-throws callback errors untouched.", () => {
    const original = new Error("mine");

    expect(thrown(() => Temme.parse({}, createTarget(), () => {
      throw original;
    }))).toBe(original);
    expect(original.message).toBe("mine");

    const temmeError = new Temme.InvalidTargetError("from a callback");

    expect(thrown(() => Temme.parse({}, createTarget(), undefined, () => {
      throw temmeError;
    })).message).toBe("from a callback");
  });

  it("re-throws non-Error values untouched.", () => {
    expect(() => Temme.parse({}, createTarget(), () => {
      // eslint-disable-next-line no-throw-literal -- verifies that non-Error throws pass through.
      throw "boom";
    })).toThrow("boom");
  });

  it("supports async end callbacks.", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    let done = false;

    Temme.parse({}, createTarget(), async () => {
      await Promise.resolve();
      done = true;
    });
    await vi.waitFor(() => expect(done).toBe(true));

    expect(warn).not.toHaveBeenCalled();
  });

  it("reports rejected async end callbacks with a warning, without throwing.", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const reason = new Error("async failure");

    expect(() => Temme.parse({}, createTarget(), async () => {
      throw reason;
    })).not.toThrow();

    await vi.waitFor(() => expect(warn).toHaveBeenCalledWith("[Temme]: async end-callback rejected:", reason));
  });
});


describe("validate.", () => {
  it("reports valid hierarchies.", () => {
    expect(Temme.validate({ childNodes: [{ ref: "a" }, { from: { ref: "a" } }] })).toEqual({ valid: true, error: null });
  });

  it("reports the error parse would throw, without the prefix.", () => {
    const { valid, error } = Temme.validate({ bogus: 1 });

    expect(valid).toBe(false);
    expect(error).toBeInstanceOf(Temme.InvalidOptionNameError);
    expect((error as Error).message).toBe("“bogus” is not a valid option");
  });

  it("catches reference, scope and cycle errors.", () => {
    expect(Temme.validate({ childNodes: [{ from: { ref: "nope" } }] }).error).toBeInstanceOf(Temme.InvalidReferenceError);
    expect(Temme.validate({ from: { ref: "deep" }, childNodes: [{ ref: "deep" }] }).error).toBeInstanceOf(Temme.ReferenceOutOfScopeError);
    expect(Temme.validate({ childNodes: [{ ref: "a", from: { ref: "b" } }, { ref: "b", from: { ref: "a" } }] }).error).toBeInstanceOf(Temme.CircularReferenceError);
  });

  it("checks @selectors against the global document.", () => {
    expect(Temme.validate({ from: { ref: "@#missing" } }).error).toBeInstanceOf(Temme.InvalidReferenceOptionValueError);

    document.body.innerHTML = "<i id=\"present\"></i>";

    expect(Temme.validate({ from: { ref: "@#present" } }).valid).toBe(true);
  });

  it("rejects non-object hierarchies.", () => {
    expect(Temme.validate(null as unknown as object).error).toBeInstanceOf(Temme.InvalidHierarchyError);
    expect(Temme.validate([]).error).toBeInstanceOf(Temme.InvalidHierarchyError);
  });

  it("never modifies the hierarchy.", () => {
    const hierarchy = { classes: ["b", "a"], childNodes: [{ ref: "a", content: { value: "A" } }, { from: { ref: "a" } }] };
    const snapshot = structuredClone(hierarchy);

    Temme.validate(hierarchy);

    expect(hierarchy).toStrictEqual(snapshot);
  });

  it("accepts hierarchies returned by parse.", () => {
    const hierarchy = Temme.parse({ childNodes: [{ ref: "a", childNodes: [{}] }, { from: { ref: "a", children: { allow: true } } }] }, createTarget());

    expect(Temme.validate(hierarchy)).toEqual({ valid: true, error: null });
  });
});
