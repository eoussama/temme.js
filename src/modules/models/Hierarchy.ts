/**
 * @description
 * The hierarchy model that maps the HTML skeleton.
 */


/**
 * @description
 * The shape of the `from` referencing sub-object inside a hierarchy.
 */
export type From = {

  /** The reference key of the element to inherit from. */
  ref: string;

  /** The inheritance mode ("override" | "append"). */
  mode: string;

  /** The list of option keys to include during inheritance. */
  include: Array<string>;

  /** The list of option keys to exclude during inheritance. */
  exclude: Array<string>;

  /** Child-node inheritance settings. */
  children: {

    /** Whether child nodes should be inherited. */
    allow: boolean;

    /** Where to place the inherited children ("before" | "after"). */
    placement: string;
  };
};


/**
 * @description
 * The shape of the `content` sub-object inside a hierarchy.
 */
export type Content = {

  /** The content type ("text" | "html"). */
  type: string;

  /** The actual content string. */
  value: string;
};


/**
 * @description
 * The hierarchy type that maps the HTML skeleton.
 */
export type Hierarchy = {

  /** The hierarchy's reference key. */
  ref: string;

  /** The HTML element's tag name. */
  name: string;

  /** The HTML element's id. */
  id: string;

  /** The hierarchy object's temmeIds. */
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
