/* global jest */

const idfier = require("../build/modules/idfier");
const parser = require("../build/modules/parser");
const sanitizer = require("../build/modules/sanitizer");
const validator = require("../build/modules/validator");
const Temme = require("../build/temme");



function createTarget() {
  return document.createElement("div");
}

describe("parse callback behavior.", () => {
  it("calls the end callback with the resulting hierarchy.", () => {
    const target = createTarget();
    const hierarchy = {};
    let received = null;

    Temme.parse(hierarchy, target, (result) => {
      received = result;
    });

    expect(received).toBe(hierarchy);
  });

  it("calls the node callback for the root and a single parsed child.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [{}],
    };
    const calls = [];

    Temme.parse(hierarchy, target, () => {}, (temmeId, currentHierarchy) => {
      calls.push({ temmeId, currentHierarchy });
    });

    expect(calls).toHaveLength(2);
    expect(calls[0].currentHierarchy).toBe(hierarchy);
    expect(calls[1].temmeId).toEqual(expect.any(String));
    expect(calls[1].currentHierarchy).toBe(hierarchy.childNodes[0]);
  });

  it("calls the node callback for each parsed node in depth-first order including the root.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          childNodes: [
            {},
            {},
          ],
        },
        {},
      ],
    };
    const calls = [];

    Temme.parse(hierarchy, target, () => {}, (temmeId) => {
      calls.push(temmeId);
    });

    expect(calls).toHaveLength(5);
    expect(new Set(calls).size).toBe(5);
  });

  it("allows an async end callback that resolves.", async () => {
    const target = createTarget();
    const hierarchy = {};
    let resolved = false;

    Temme.parse(hierarchy, target, async () => {
      resolved = true;
    });

    await Promise.resolve();
    expect(resolved).toBe(true);
  });

  it("warns when the async end callback rejects.", async () => {
    const target = createTarget();
    const hierarchy = {};
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});

    Temme.parse(hierarchy, target, async () => {
      throw new Error("boom");
    });

    await Promise.resolve();
    await Promise.resolve();

    expect(warnSpy).toHaveBeenCalledWith(
      "[Temme]: async end-callback rejected:",
      expect.any(Error),
    );

    warnSpy.mockRestore();
  });

  it("validate returns a success object for a valid hierarchy.", () => {
    expect(Temme.validate({})).toEqual({ valid: true, error: null });
  });

  it("validate returns an error object for an invalid hierarchy.", () => {
    const result = Temme.validate({ name: [] });

    expect(result.valid).toBe(false);
    expect(result.error).toBeTruthy();
    expect(result.error.name).toBe("InvalidOptionTypeError");
  });
});


describe("parsing content and element details.", () => {
  it("renders text content by default.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          content: {
            value: "hello",
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.firstChild.textContent).toBe("hello");
  });

  it("renders html content when content type is html.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          content: {
            type: "html",
            value: "<span>hello</span>",
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.firstChild.innerHTML).toBe("<span>hello</span>");
  });

  it("applies an id to the rendered node.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          id: "main-title",
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.firstChild.id).toBe("main-title");
  });

  it("applies dataset values as strings.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          dataset: {
            count: 12,
            enabled: true,
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.firstChild.dataset.count).toBe("12");
    expect(target.firstChild.dataset.enabled).toBe("true");
  });

  it("applies boolean attributes.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          attributes: {
            hidden: true,
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.firstChild.getAttribute("hidden")).toBe("true");
  });

  it("creates the specified element name.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          name: "section",
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.firstChild.tagName).toBe("SECTION");
  });

  it("deduplicates and sorts classes during sanitization.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          classes: ["z", "a", "z", "b", "a"],
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(Array.from(target.firstChild.classList)).toEqual(["a", "b", "z"]);
  });

  it("parses nested childNodes recursively.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          childNodes: [
            {
              name: "span",
            },
          ],
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.firstChild.firstChild.tagName).toBe("SPAN");
  });
});


describe("inheritance mode and range behavior.", () => {
  it("append mode preserves the inheriting node name.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          name: "div",
          classes: ["red"],
        },
        {
          name: "h1",
          from: {
            ref: "base",
            mode: "append",
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.children[1].tagName).toBe("H1");
  });

  it("override mode inherits the referenced node name.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          name: "section",
        },
        {
          name: "h1",
          from: {
            ref: "base",
            mode: "override",
            include: ["name"],
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.children[1].tagName).toBe("SECTION");
  });

  it("append mode merges classes.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          classes: ["red", "bold"],
        },
        {
          classes: ["green"],
          from: {
            ref: "base",
            mode: "append",
            include: ["classes"],
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(Array.from(target.children[1].classList)).toEqual(["bold", "green", "red"]);
  });

  it("override mode replaces classes.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          classes: ["red", "bold"],
        },
        {
          classes: ["green"],
          from: {
            ref: "base",
            mode: "override",
            include: ["classes"],
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(Array.from(target.children[1].classList)).toEqual(["bold", "red"]);
  });

  it("include limits inheritance to the requested keys.", () => {
    const target = createTarget();
    const hierarchy = {
      templates: [
        {
          ref: "temp",
          classes: ["red"],
          dataset: { id: 1 },
        },
      ],
      childNodes: [
        {
          from: {
            ref: "temp",
            include: ["dataset"],
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(Array.from(target.children[0].classList)).toEqual([]);
    expect(target.children[0].dataset.id).toBe("1");
  });

  it("exclude removes the excluded keys from inheritance.", () => {
    const target = createTarget();
    const hierarchy = {
      templates: [
        {
          ref: "temp",
          classes: ["red"],
          dataset: { id: 1 },
        },
      ],
      childNodes: [
        {
          from: {
            ref: "temp",
            exclude: ["dataset"],
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(Array.from(target.children[0].classList)).toEqual(["red"]);
    expect(target.children[0].dataset.id).toBeUndefined();
  });

  it("inherits child nodes when children.allow is true.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          childNodes: [
            {
              name: "span",
            },
          ],
        },
        {
          from: {
            ref: "base",
            children: {
              allow: true,
            },
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.children[1].children).toHaveLength(1);
    expect(target.children[1].firstChild.tagName).toBe("SPAN");
  });

  it("does not inherit child nodes when children.allow is false.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          childNodes: [
            {
              name: "span",
            },
          ],
        },
        {
          from: {
            ref: "base",
            children: {
              allow: false,
            },
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.children[1].children).toHaveLength(0);
  });
});


describe("sanitizer behavior.", () => {
  it("populates missing top-level defaults.", () => {
    const hierarchy = {};

    sanitizer.sanitize(hierarchy);

    expect(hierarchy.name).toBe("div");
    expect(hierarchy.classes).toEqual([]);
    expect(hierarchy.childNodes).toEqual([]);
    expect(hierarchy.templates).toEqual([]);
  });

  it("populates missing from sub-option defaults.", () => {
    const hierarchy = {
      from: {
        ref: "base",
      },
    };

    sanitizer.sanitize(hierarchy);

    expect(hierarchy.from.mode).toBe("append");
    expect(hierarchy.from.exclude).toEqual([]);
    expect(hierarchy.from.include).toEqual(["name", "id", "classes", "attributes", "dataset", "content", "childNodes"]);
    expect(hierarchy.from.children.allow).toBe(false);
    expect(hierarchy.from.children.placement).toBe("after");
  });

  it("deduplicates and sorts classes during sanitize.", () => {
    const hierarchy = {
      classes: ["z", "a", "z", "b"],
    };

    sanitizer.sanitize(hierarchy);

    expect(hierarchy.classes).toEqual(["a", "b", "z"]);
  });

  it("deduplicates and sorts include during sanitize.", () => {
    const hierarchy = {
      from: {
        ref: "base",
        include: ["classes", "name", "classes"],
      },
    };

    sanitizer.sanitize(hierarchy);

    expect(hierarchy.from.include).toEqual(["classes", "name"]);
  });

  it("deduplicates and sorts exclude during sanitize.", () => {
    const hierarchy = {
      from: {
        ref: "base",
        exclude: ["dataset", "classes", "dataset"],
      },
    };

    sanitizer.sanitize(hierarchy);

    expect(hierarchy.from.exclude).toEqual(["classes", "dataset"]);
  });

  it("sanitizes child hierarchies recursively.", () => {
    const hierarchy = {
      childNodes: [
        {},
      ],
    };

    sanitizer.sanitize(hierarchy);

    expect(hierarchy.childNodes[0].name).toBe("div");
    expect(hierarchy.childNodes[0].classes).toEqual([]);
  });

  it("sanitizes templates recursively with sub-option defaults.", () => {
    const hierarchy = {
      templates: [
        {
          ref: "temp",
          classes: ["z", "a", "z"],
        },
      ],
    };

    sanitizer.sanitize(hierarchy);

    expect(hierarchy.templates[0].classes).toEqual(["z", "a", "z"]);
    expect(hierarchy.templates[0].from.mode).toBe("append");
    expect(hierarchy.templates[0].templates).toBeUndefined();
  });
});


describe("idfier behavior.", () => {
  it("assigns a temmeIds chain to the root hierarchy.", () => {
    const hierarchy = {};

    sanitizer.sanitize(hierarchy);
    idfier.idfy(hierarchy);

    expect(hierarchy.temmeIds).toHaveLength(1);
    expect(hierarchy.temmeIds[0]).toHaveLength(6);
  });

  it("assigns descendant temmeIds chains including ancestor ids.", () => {
    const hierarchy = {
      childNodes: [
        {},
      ],
    };

    sanitizer.sanitize(hierarchy);
    idfier.idfy(hierarchy);

    expect(hierarchy.childNodes[0].temmeIds).toHaveLength(2);
    expect(hierarchy.childNodes[0].temmeIds[0]).toBe(hierarchy.temmeIds[0]);
  });
});


describe("validator behavior through public APIs.", () => {
  it("throws no error for a valid template reference graph.", () => {
    const hierarchy = {
      templates: [
        {
          ref: "temp-a",
        },
        {
          ref: "temp-b",
          from: {
            ref: "temp-a",
          },
        },
      ],
      childNodes: [
        {
          from: {
            ref: "temp-b",
          },
        },
      ],
    };

    expect(() => Temme.parse(hierarchy, createTarget())).not.toThrow();
  });

  it("throws no error for a valid previous-sibling reference.", () => {
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
        },
        {
          from: {
            ref: "base",
          },
        },
      ],
    };

    expect(() => Temme.parse(hierarchy, createTarget())).not.toThrow();
  });

  it("validateOptions throws InvalidReferencingOptionError when ref is missing.", () => {
    expect(() => validator.validateOptions({ from: {} })).toThrow(
      "The “from” option must always have a “ref” sub-option",
    );
  });

  it("validateOptions throws InvalidReferencingOptionError when include and exclude coexist.", () => {
    expect(() => validator.validateOptions({
      from: {
        ref: "x",
        include: [],
        exclude: [],
      },
    })).toThrow();
  });
});


describe("parser helpers.", () => {
  it("parse mutates the provided top parent when topParent is true.", () => {
    const target = createTarget();
    const hierarchy = {
      name: "section",
      id: "root-id",
    };

    sanitizer.sanitize(hierarchy);
    idfier.idfy(hierarchy);
    parser.parse(hierarchy, target, () => {}, true);

    expect(target.id).toBe("root-id");
    expect(target.tagName).toBe("DIV");
  });

  it("parse appends inherited children after local children by default.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          childNodes: [
            {
              name: "span",
              id: "inherited",
            },
          ],
        },
        {
          childNodes: [
            {
              name: "span",
              id: "local",
            },
          ],
          from: {
            ref: "base",
            children: {
              allow: true,
              placement: "after",
            },
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.children[1].children[0].id).toBe("local");
    expect(target.children[1].children[1].id).toBe("inherited");
  });

  it("parse prepends inherited children when placement is before.", () => {
    const target = createTarget();
    const hierarchy = {
      childNodes: [
        {
          ref: "base",
          childNodes: [
            {
              name: "span",
              id: "inherited",
            },
          ],
        },
        {
          childNodes: [
            {
              name: "span",
              id: "local",
            },
          ],
          from: {
            ref: "base",
            children: {
              allow: true,
              placement: "before",
            },
          },
        },
      ],
    };

    Temme.parse(hierarchy, target);

    expect(target.children[1].children[0].id).toBe("inherited");
    expect(target.children[1].children[1].id).toBe("local");
  });
});


describe("outer element references.", () => {
  it("inherits classes from an outer element.", () => {
    const target = createTarget();
    const outer = document.createElement("div");

    outer.id = "outer-classes";
    outer.className = "z a";

    document.body.appendChild(outer);


    Temme.parse({
      from: {
        ref: "@#outer-classes",
      },
    }, target);

    expect(Array.from(target.classList)).toEqual(["a", "z"]);

    outer.remove();
  });

  it("inherits dataset from an outer element.", () => {
    const target = createTarget();
    const outer = document.createElement("div");

    outer.id = "outer-dataset";
    outer.dataset.userId = "10";

    document.body.appendChild(outer);


    Temme.parse({
      from: {
        ref: "@#outer-dataset",
        include: ["dataset"],
      },
    }, target);

    expect(target.dataset.userId).toBe("10");

    outer.remove();
  });

  it("inherits attributes from an outer element.", () => {
    const target = createTarget();
    const outer = document.createElement("div");

    outer.id = "outer-attrs";
    outer.setAttribute("visible", "true");

    document.body.appendChild(outer);


    Temme.parse({
      from: {
        ref: "@#outer-attrs",
        include: ["attributes"],
      },
    }, target);

    expect(target.getAttribute("visible")).toBe("true");

    outer.remove();
  });
});
