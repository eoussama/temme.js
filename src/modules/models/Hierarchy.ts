/**
 * @description
 * The hierarchy models that map the HTML skeleton.
 */


/**
 * @description
 * The labels of the options that can be inherited through the `from` option.
 */
export type InheritableOption = "name" | "id" | "classes" | "attributes" | "dataset" | "content" | "childNodes";


/**
 * @description
 * The shape of the `from` referencing sub-object inside a sanitized hierarchy.
 */
export type From = {

  /** The reference key of the element to inherit from, or `@selector` for an outer element. */
  ref: string;

  /** The inheritance mode. */
  mode: "append" | "override";

  /** The option keys to include during inheritance. */
  include: Array<InheritableOption>;

  /** The option keys to exclude during inheritance. */
  exclude: Array<InheritableOption>;

  /** Child-node inheritance settings. */
  children: {

    /** Whether child nodes should be inherited. */
    allow: boolean;

    /** Where to place the inherited children. */
    placement: "before" | "after";
  };
};


/**
 * @description
 * The shape of the `content` sub-object inside a sanitized hierarchy.
 */
export type Content = {

  /** The content type. */
  type: "text" | "html";

  /** The actual content string. */
  value: string;
};


/**
 * @description
 * A sanitized hierarchy object, as handed to the parse callbacks and returned by `parse`.
 * Templates share this shape, minus the `name`, `childNodes` and `templates` options.
 */
export type Hierarchy = {

  /** The hierarchy's reference key. */
  ref: string;

  /** The HTML element's tag name. */
  name: string;

  /** The HTML element's id. */
  id: string;

  /** The hierarchy object's temmeIds trail. */
  temmeIds: Array<string>;

  /** The HTML element's classes. */
  classes: Array<string>;

  /** The hierarchy object's templates. */
  templates: Array<Hierarchy>;

  /** The hierarchy object's children. */
  childNodes: Array<Hierarchy>;

  /** The HTML element's content. */
  content: Content;

  /** The hierarchy object's referencing configuration. */
  from: From;

  /** The HTML element's attributes. */
  attributes: Record<string, string>;

  /** The HTML element's dataset entries. */
  dataset: Record<string, string>;

  /** Index signature for dynamic key access during sanitization and validation. */
  [key: string]: unknown;
};


/**
 * @description
 * The scalar values accepted for attributes and dataset entries; they are stringified by the DOM.
 */
export type AttributeValue = string | number | boolean;


/**
 * @description
 * A template object as written by the user: a reusable, render-less set of options.
 */
export type TemplateInput = {
  ref: string;
  id?: string;
  classes?: Array<string>;
  content?: { type?: Content["type"]; value?: string };
  attributes?: Record<string, AttributeValue>;
  dataset?: Record<string, AttributeValue>;
  from?: FromInput;
};


/**
 * @description
 * The `from` option as written by the user; only `ref` is required.
 */
export type FromInput = {
  ref: string;
  mode?: From["mode"];
  include?: Array<InheritableOption>;
  exclude?: Array<InheritableOption>;
  children?: { allow?: boolean; placement?: From["children"]["placement"] };
};


/**
 * @description
 * A hierarchy object as written by the user, every option is optional.
 */
export type HierarchyInput = Omit<TemplateInput, "ref"> & {
  ref?: string;
  name?: string;
  childNodes?: Array<HierarchyInput>;
  templates?: Array<TemplateInput>;
};
