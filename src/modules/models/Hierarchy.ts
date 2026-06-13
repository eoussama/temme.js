/**
 * The hierarchy model that maps the HTML skeleton.
 */
export type Hierarchy = {

  /**
   * The hierarchy's reference.
   */
  ref: string;

  /**
   * The HTML element's tag name.
   */
  name: string;

  /**
   * The HTML element's id.
   */
  id: string;

  /**
   * The hierarchy object's temmeIds.
   */
  temmeIds: Array<string>;

  /**
   * The HTML element's classes.
   */
  classes: Array<string>;

  /**
   * The hierarchy object's templates.
   */
  templates: Array<object>;

  /**
   * The hierarchy object's children.
   */
  childNodes: Array<Hierarchy>;

  /**
   * The HTML element's content.
   */
  content: object;

  /**
   * The hierarchy object's referencing object.
   */
  from: object;

  /**
   * The HTML element's attributes.
   */
  attributes: object;

  /**
   * The HTML element's dataset.
   */
  dataset: object;
};
