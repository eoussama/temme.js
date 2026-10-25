import { describe, expect, it } from "vitest";
import * as Temme from "../../src/temme";



type ErrorCase = {
  name: keyof typeof Temme;
  create: (...args: Array<string>) => Error;
  args: Array<string>;
  message: string;
  emptyArgs: Array<string>;
  fallback: string;
};

const cases: Array<ErrorCase> = [
  { name: "InvalidHierarchyError", create: m => new Temme.InvalidHierarchyError(m!), args: ["custom"], message: "custom", emptyArgs: [""], fallback: "The hierarchy object is not valid" },
  { name: "InvalidTargetError", create: m => new Temme.InvalidTargetError(m!), args: ["custom"], message: "custom", emptyArgs: [""], fallback: "The target is not a valid HTML element" },
  { name: "InvalidTemplateError", create: m => new Temme.InvalidTemplateError(m!), args: ["custom"], message: "custom", emptyArgs: [""], fallback: "A template does not have a “ref” option" },
  { name: "InvalidReferenceOptionValueError", create: m => new Temme.InvalidReferenceOptionValueError(m!), args: ["custom"], message: "custom", emptyArgs: [""], fallback: "“ref” options must not begin with the “@” symbol" },
  { name: "InvalidReferencingOptionError", create: m => new Temme.InvalidReferencingOptionError(m!), args: ["custom"], message: "custom", emptyArgs: [""], fallback: "A referencing option is not valid" },
  { name: "ReferenceOutOfScopeError", create: m => new Temme.ReferenceOutOfScopeError(m!), args: ["custom"], message: "custom", emptyArgs: [""], fallback: "An object is referencing an element out of its scope" },
  { name: "InvalidOptionNameError", create: o => new Temme.InvalidOptionNameError(o!), args: ["foo"], message: "“foo” is not a valid option", emptyArgs: [""], fallback: "An option is not valid" },
  { name: "InvalidOptionTypeError", create: (o, t) => new Temme.InvalidOptionTypeError(o!, t!), args: ["id", "number"], message: "The \"id\" option doesn't accept values of type \"number\"", emptyArgs: ["", "number"], fallback: "An option doesn't have a valid value type" },
  { name: "InvalidOptionValueError", create: (o, v) => new Temme.InvalidOptionValueError(o!, v!), args: ["mode", "x"], message: "The “mode” option doesn't accept “x” as a value", emptyArgs: ["", "x"], fallback: "An option doesn't have a valid value" },
  { name: "InvalidReferenceError", create: r => new Temme.InvalidReferenceError(r!), args: ["r"], message: "“r” is an invalid reference", emptyArgs: [""], fallback: "A reference is invalid" },
  { name: "InvalidSubOptionNameError", create: (o, s) => new Temme.InvalidSubOptionNameError(o!, s!), args: ["from", "x"], message: "The “from” option doesn't recognize “x” as a valid sub-option", emptyArgs: ["", ""], fallback: "A sub-option is not valid" },
  { name: "InvalidSubOptionTypeError", create: (s, t) => new Temme.InvalidSubOptionTypeError(s!, t!), args: ["mode", "number"], message: "The \"mode\" sub-option doesn't accept values of type \"number\"", emptyArgs: ["", ""], fallback: "A sub-option doesn't have a valid value type" },
  { name: "InvalidSubOptionValueError", create: (s, v) => new Temme.InvalidSubOptionValueError(s!, v!), args: ["mode", "x"], message: "The “mode” sub-option doesn't accept “x” as a value", emptyArgs: ["", ""], fallback: "A sub-option doesn't have a valid value" },
  { name: "InvalidTemplateOptionError", create: o => new Temme.InvalidTemplateOptionError(o!), args: ["name"], message: "“name” is not a valid option to use in templates", emptyArgs: [""], fallback: "A template has an invalid option" },
  { name: "InvalidTemplateReferencingError", create: (r, t) => new Temme.InvalidTemplateReferencingError(r!, t!), args: ["t", "h"], message: "The template with the reference “t” is trying to reference “h” a non-template object", emptyArgs: ["", "h"], fallback: "Templates can only reference other templates." },
  { name: "CircularReferenceError", create: r => new Temme.CircularReferenceError(r!), args: ["a"], message: "The “a” reference is part of a circular inheritance chain", emptyArgs: [""], fallback: "A reference is part of a circular inheritance chain" },
];


describe("temmyError.", () => {
  it("is an Error with its own name and a fallback message.", () => {
    const error = new Temme.TemmyError("");

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("TemmyError");
    expect(error.message).toBe("Temme isn't feeling good");
  });

  it("prefers the given message over the fallback.", () => {
    expect(new Temme.TemmyError("boom", "fallback").message).toBe("boom");
    expect(new Temme.TemmyError("", "fallback").message).toBe("fallback");
  });

  it("supports a cause.", () => {
    const cause = new Error("root");

    expect(new Temme.TemmyError("x", "y", { cause }).cause).toBe(cause);
    expect(new Temme.InvalidTargetError("x", { cause }).cause).toBe(cause);
  });
});


describe.each(cases)("$name.", ({ name, create, args, message, emptyArgs, fallback }) => {
  it("is a named TemmyError.", () => {
    const error = create(...args);

    expect(error).toBeInstanceOf(Temme.TemmyError);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe(name);
  });

  it("builds its message from its arguments.", () => {
    expect(create(...args).message).toBe(message);
  });

  it("falls back to a generic message.", () => {
    expect(create(...emptyArgs).message).toBe(fallback);
  });
});


describe("sub-option error messages.", () => {
  it("are built when only one of the two arguments is given.", () => {
    expect(new Temme.InvalidSubOptionNameError("", "x").message).toBe("The “” option doesn't recognize “x” as a valid sub-option");
    expect(new Temme.InvalidSubOptionNameError("from", "").message).toBe("The “from” option doesn't recognize “” as a valid sub-option");
    expect(new Temme.InvalidSubOptionTypeError("", "number").message).toBe("The \"\" sub-option doesn't accept values of type \"number\"");
    expect(new Temme.InvalidSubOptionTypeError("mode", "").message).toBe("The \"mode\" sub-option doesn't accept values of type \"\"");
    expect(new Temme.InvalidSubOptionValueError("", "x").message).toBe("The “” sub-option doesn't accept “x” as a value");
    expect(new Temme.InvalidSubOptionValueError("mode", "").message).toBe("The “mode” sub-option doesn't accept “” as a value");
  });
});
