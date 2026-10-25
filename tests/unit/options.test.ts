import type Option from "../../src/modules/models/Option";
import { describe, expect, it } from "vitest";
import { findOption, forbiddenOptions, getOptions } from "../../src/modules/options";
import AttributesOption from "../../src/modules/options/AttributesOption";
import ChildNodesOption from "../../src/modules/options/ChildrenNodesOption";
import ClassesOption from "../../src/modules/options/ClassesOption";
import ContentOption from "../../src/modules/options/ContentOption";
import DatasetOption from "../../src/modules/options/DatasetOption";
import FromOption from "../../src/modules/options/FromOption";
import IdOption from "../../src/modules/options/IdOption";
import NameOption from "../../src/modules/options/NameOption";
import RefOption from "../../src/modules/options/RefOption";
import ChildrenAllowSubOption from "../../src/modules/options/sub-options/ChildrenAllowSubOption";
import ChildrenSubOption from "../../src/modules/options/sub-options/ChildrenSubOption";
import ContentTypeSubOption from "../../src/modules/options/sub-options/ContentTypeSubOption";
import ExcludeSubOption from "../../src/modules/options/sub-options/ExcludeSubOption";
import IncludeSubOption from "../../src/modules/options/sub-options/IncludeSubOption";
import ModeSubOption from "../../src/modules/options/sub-options/ModeSubOption";
import PlacementSubOption from "../../src/modules/options/sub-options/PlacementSubOption";
import ValueSubOption from "../../src/modules/options/sub-options/ValueSubOption";
import TemmeIdsOption from "../../src/modules/options/TemmeIdsOption";
import TemplatesOption from "../../src/modules/options/TemplatesOption";



describe("option registry.", () => {
  it("lists every option in sanitizing and rendering order.", () => {
    expect(getOptions().map((option: Option) => option.label)).toEqual([
      "ref",
      "name",
      "id",
      "content",
      "temmeIds",
      "templates",
      "classes",
      "childNodes",
      "attributes",
      "dataset",
      "from",
    ]);
  });

  it("creates the options once.", () => {
    expect(getOptions()).toBe(getOptions());
  });

  it("finds options by label.", () => {
    expect(findOption("classes")?.label).toBe("classes");
    expect(findOption("unknown")).toBeUndefined();
  });

  it("forbids name, childNodes and templates inside templates.", () => {
    expect(forbiddenOptions).toEqual(["name", "childNodes", "templates"]);
  });
});


describe("option metadata.", () => {
  const metadata = (label: string): { type: string; values: ReadonlyArray<unknown>; default: unknown } => {
    const option = findOption(label) as Option;

    return { type: option.type, values: option.values, default: option.createDefault() };
  };

  it("declares the type, allowed values and default of every option.", () => {
    expect(metadata("ref")).toEqual({ type: "string", values: [], default: "" });
    expect(metadata("name")).toEqual({ type: "string", values: [], default: "div" });
    expect(metadata("id")).toEqual({ type: "string", values: [], default: "" });
    expect(metadata("content")).toEqual({ type: "object", values: [], default: { type: "text", value: "" } });
    expect(metadata("temmeIds")).toEqual({ type: "array", values: [], default: [] });
    expect(metadata("templates")).toEqual({ type: "array", values: [], default: [] });
    expect(metadata("classes")).toEqual({ type: "array", values: [], default: [] });
    expect(metadata("childNodes")).toEqual({ type: "array", values: [], default: [] });
    expect(metadata("attributes")).toEqual({ type: "object", values: [], default: {} });
    expect(metadata("dataset")).toEqual({ type: "object", values: [], default: {} });
  });

  it("declares the sub-options of content.", () => {
    const keys = (findOption("content") as Option).keys as Record<string, Option>;

    expect(Object.keys(keys)).toEqual(["type", "value"]);
    expect(keys.type!.values).toEqual(["text", "html"]);
    expect(keys.value!.type).toBe("string");
  });

  it("declares the sub-options of from.", () => {
    const from = findOption("from") as Option;
    const keys = from.keys as Record<string, Option>;
    const inheritable = ["name", "id", "classes", "attributes", "dataset", "content", "childNodes"];

    expect(Object.keys(keys)).toEqual(["ref", "mode", "children", "include", "exclude"]);
    expect(keys.mode!.values).toEqual(["append", "override"]);
    expect(keys.include!.values).toEqual(inheritable);
    expect(keys.exclude!.values).toEqual(inheritable);
    expect(Object.keys(keys.children!.keys as object)).toEqual(["allow", "placement"]);
    expect((keys.children!.keys as Record<string, Option>).allow!.type).toBe("boolean");
    expect((keys.children!.keys as Record<string, Option>).placement!.values).toEqual(["before", "after"]);
    expect(from.createDefault()).toStrictEqual({
      ref: "",
      mode: "append",
      children: { allow: false, placement: "after" },
      include: [...inheritable].sort(),
      exclude: [],
    });
  });
});


describe("option classes.", () => {
  const inheritable = ["name", "id", "classes", "attributes", "dataset", "content", "childNodes"];
  const describeOption = (option: Option): object => ({
    label: option.label,
    type: option.type,
    values: option.values,
    keys: option.keys === undefined ? undefined : Object.keys(option.keys),
    default: option.createDefault(),
  });

  // Fresh instances, so each constructor runs inside this test (the registry is memoized).
  it.each([
    [RefOption, { label: "ref", type: "string", values: [], keys: undefined, default: "" }],
    [NameOption, { label: "name", type: "string", values: [], keys: undefined, default: "div" }],
    [IdOption, { label: "id", type: "string", values: [], keys: undefined, default: "" }],
    [ContentOption, { label: "content", type: "object", values: [], keys: ["type", "value"], default: { type: "text", value: "" } }],
    [TemmeIdsOption, { label: "temmeIds", type: "array", values: [], keys: undefined, default: [] }],
    [TemplatesOption, { label: "templates", type: "array", values: [], keys: undefined, default: [] }],
    [ClassesOption, { label: "classes", type: "array", values: [], keys: undefined, default: [] }],
    [ChildNodesOption, { label: "childNodes", type: "array", values: [], keys: undefined, default: [] }],
    [AttributesOption, { label: "attributes", type: "object", values: [], keys: undefined, default: {} }],
    [DatasetOption, { label: "dataset", type: "object", values: [], keys: undefined, default: {} }],
    [FromOption, { label: "from", type: "object", values: [], keys: ["ref", "mode", "children", "include", "exclude"], default: { ref: "", mode: "append", children: { allow: false, placement: "after" }, include: [...inheritable].sort(), exclude: [] } }],
    [ContentTypeSubOption, { label: "type", type: "string", values: ["text", "html"], keys: undefined, default: "text" }],
    [ValueSubOption, { label: "value", type: "string", values: [], keys: undefined, default: "" }],
    [ModeSubOption, { label: "mode", type: "string", values: ["append", "override"], keys: undefined, default: "append" }],
    [ChildrenSubOption, { label: "children", type: "object", values: [], keys: ["allow", "placement"], default: { allow: false, placement: "after" } }],
    [ChildrenAllowSubOption, { label: "allow", type: "boolean", values: [], keys: undefined, default: false }],
    [PlacementSubOption, { label: "placement", type: "string", values: ["before", "after"], keys: undefined, default: "after" }],
    [IncludeSubOption, { label: "include", type: "array", values: inheritable, keys: undefined, default: [...inheritable].sort() }],
    [ExcludeSubOption, { label: "exclude", type: "array", values: inheritable, keys: undefined, default: [] }],
  ])("%o declares its metadata.", (OptionClass: new () => Option, expected: object) => {
    expect(describeOption(new OptionClass())).toStrictEqual(expected);
  });
});
