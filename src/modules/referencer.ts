/**
 * @description
 * Responsible for validating references and applying template and hierarchy inheritance.
 */


import type { Hierarchy, InheritableOption } from "./models/Hierarchy";
import type Option from "./models/Option";
import CircularReferenceError from "./errors/CircularReferenceError";
import InvalidReferenceError from "./errors/InvalidReferenceError";
import InvalidReferenceOptionValueError from "./errors/InvalidReferenceOptionValueError";
import InvalidTemplateReferencingError from "./errors/InvalidTemplateReferencingError";
import ReferenceOutOfScopeError from "./errors/ReferenceOutOfScopeError";
import { findOption, forbiddenOptions } from "./options";
import { clone, isResolved, markResolved } from "./utils";



/**
 * @description
 * A hierarchy (or template) of the tree, along with its position.
 */
export type ReferenceNode = {

  /** The hierarchy or template object. */
  hierarchy: Hierarchy;

  /** The nesting depth; templates share the depth of the hierarchy that declares them. */
  depth: number;

  /** Whether the object is a template. */
  isTemplate: boolean;
};


/**
 * @description
 * The state shared while resolving one tree.
 */
type Context = {

  /** Every node of the tree, in lookup order. */
  nodes: Array<ReferenceNode>;

  /** The node of every hierarchy object of the tree. */
  byHierarchy: Map<Hierarchy, ReferenceNode>;

  /** The hierarchies whose inheritance is being resolved (used to detect cycles). */
  resolving: Set<Hierarchy>;

  /** The document (or any root node) that `@selector` references are queried in, if any. */
  dom: ParentNode | undefined;
};


/**
 * @description
 * Validates every reference of a sanitized hierarchy tree, then applies inheritance in
 * dependency order: a hierarchy inherits only once the one it references is fully resolved.
 * Hierarchies resolved by a previous call are left untouched.
 *
 * @param root The root hierarchy to process.
 * @param dom The document `@selector` references are looked up in; when absent (e.g. no DOM),
 *   outer-element references are neither checked nor inherited.
 * @returns {void}
 */
export function process(root: Hierarchy, dom: ParentNode | undefined): void {
  const nodes = collect(root, 1, false);
  const context: Context = {
    nodes,
    byHierarchy: new Map(nodes.map((node: ReferenceNode) => [node.hierarchy, node])),
    resolving: new Set(),
    dom,
  };
  const pending = nodes.filter((node: ReferenceNode) => !isResolved(node.hierarchy));

  pending.forEach((node: ReferenceNode) => validateReference(node, context));
  pending.forEach((node: ReferenceNode) => validateTemplateReference(node, context));
  pending.forEach((node: ReferenceNode) => validateScope(node, context));
  pending.forEach((node: ReferenceNode) => resolve(node, context));
}


/**
 * @description
 * Lists a hierarchy, its children (recursively) and its templates with their depth.
 *
 * @param hierarchy The hierarchy to collect from.
 * @param depth The hierarchy's depth.
 * @param isTemplate Whether the hierarchy is a template.
 * @returns {Array<ReferenceNode>} The nodes, the hierarchy first.
 */
function collect(hierarchy: Hierarchy, depth: number, isTemplate: boolean): Array<ReferenceNode> {
  return [
    { hierarchy, depth, isTemplate },
    ...(hierarchy.childNodes ?? []).flatMap((child: Hierarchy) => collect(child, depth + 1, false)),
    ...(hierarchy.templates ?? []).flatMap((template: Hierarchy) => collect(template, depth, true)),
  ];
}


/**
 * @description
 * Finds the node a hierarchy references by name (never the hierarchy itself).
 *
 * @param node The referencing node.
 * @param context The resolution context.
 * @returns {ReferenceNode | undefined} The first node with a matching `ref`, if any.
 */
function findReferenced(node: ReferenceNode, context: Context): ReferenceNode | undefined {
  return context.nodes.find(
    (candidate: ReferenceNode) => candidate.hierarchy.ref === node.hierarchy.from.ref && candidate !== node,
  );
}


/**
 * @description
 * Tells whether a node references another hierarchy of the tree (as opposed to nothing
 * or an outer element).
 *
 * @param node The node to inspect.
 * @returns {boolean} `true` for inner references.
 */
function hasInnerReference(node: ReferenceNode): boolean {
  const { ref } = node.hierarchy.from;

  return ref !== "" && !ref.startsWith("@");
}


/**
 * @description
 * Looks an outer element up, turning malformed selectors into Temme errors.
 *
 * @param dom The root to query.
 * @param selector The CSS selector.
 * @returns {Element | null} The matching element, if any.
 * @throws {InvalidReferenceOptionValueError} When the selector is malformed.
 */
function queryOuterElement(dom: ParentNode, selector: string): Element | null {
  try {
    return dom.querySelector(selector);
  }
  catch (error) {
    throw new InvalidReferenceOptionValueError(`"${selector}" is not a valid selector`, { cause: error });
  }
}


/**
 * @description
 * Checks that a node's `from.ref` points to an existing hierarchy, or to an existing
 * outer element for `@selector` references.
 *
 * @param node The node to validate.
 * @param context The resolution context.
 * @returns {void}
 * @throws {InvalidReferenceOptionValueError} When no outer element matches a `@selector`.
 * @throws {InvalidReferenceError} When no hierarchy has the referenced `ref`.
 */
function validateReference(node: ReferenceNode, context: Context): void {
  const { ref } = node.hierarchy.from;

  if (ref.startsWith("@")) {
    const selector = ref.substring(1);

    if (context.dom !== undefined && queryOuterElement(context.dom, selector) === null) {
      throw new InvalidReferenceOptionValueError(`No outer element corresponds to the selector "${selector}"`);
    }
  }
  else if (ref !== "" && findReferenced(node, context) === undefined) {
    throw new InvalidReferenceError(ref);
  }
}


/**
 * @description
 * Checks that templates only reference other templates (or outer elements).
 *
 * @param node The node to validate.
 * @param context The resolution context.
 * @returns {void}
 * @throws {InvalidTemplateReferencingError} When a template references a plain hierarchy.
 */
function validateTemplateReference(node: ReferenceNode, context: Context): void {
  if (node.isTemplate && hasInnerReference(node) && !(findReferenced(node, context) as ReferenceNode).isTemplate) {
    throw new InvalidTemplateReferencingError(node.hierarchy.ref, node.hierarchy.from.ref);
  }
}


/**
 * @description
 * Checks that a node does not reference a hierarchy nested deeper than itself.
 *
 * @param node The node to validate.
 * @param context The resolution context.
 * @returns {void}
 * @throws {ReferenceOutOfScopeError} When the referenced hierarchy is out of scope.
 */
function validateScope(node: ReferenceNode, context: Context): void {
  if (hasInnerReference(node) && (findReferenced(node, context) as ReferenceNode).depth > node.depth) {
    throw new ReferenceOutOfScopeError("");
  }
}


/**
 * @description
 * Returns the option labels a node inherits: `include` minus `exclude`, without the
 * options templates can't hold.
 *
 * @param node The inheriting node.
 * @returns {Array<InheritableOption>} The labels to inherit.
 */
function getInheritedLabels(node: ReferenceNode): Array<InheritableOption> {
  const { include, exclude } = node.hierarchy.from;

  return include.filter(
    (label: InheritableOption) => !exclude.includes(label) && !(node.isTemplate && forbiddenOptions.includes(label)),
  );
}


/**
 * @description
 * Applies a node's inheritance, after resolving whatever it depends on.
 *
 * @param node The node to resolve.
 * @param context The resolution context.
 * @returns {void}
 * @throws {CircularReferenceError} When the node (indirectly) depends on itself.
 */
function resolve(node: ReferenceNode, context: Context): void {
  const { hierarchy } = node;
  const { ref } = hierarchy.from;

  if (isResolved(hierarchy)) {
    return;
  }

  if (context.resolving.has(hierarchy)) {
    throw new CircularReferenceError(ref);
  }

  context.resolving.add(hierarchy);

  if (ref.startsWith("@")) {
    inheritFromElement(node, context);
  }
  else if (ref !== "") {
    inheritFromHierarchy(node, findReferenced(node, context) as ReferenceNode, context);
  }

  context.resolving.delete(hierarchy);
  markResolved(hierarchy);
}


/**
 * @description
 * Applies inheritance from an outer element. Child nodes are never inherited from the DOM.
 *
 * @param node The inheriting node.
 * @param context The resolution context.
 * @returns {void}
 */
function inheritFromElement(node: ReferenceNode, context: Context): void {
  if (context.dom === undefined) {
    return;
  }

  const element = queryOuterElement(context.dom, node.hierarchy.from.ref.substring(1)) as Element;

  getInheritedLabels(node)
    .filter((label: InheritableOption) => label !== "childNodes")
    .forEach((label: InheritableOption) => {
      const option = findOption(label) as Option;
      const value = option.getKeyFromElement(element);

      if (value !== null) {
        option.inherit(node.hierarchy, value);
      }
    });
}


/**
 * @description
 * Applies inheritance from another hierarchy of the tree, resolving it first.
 * Inherited values are copied, so the two hierarchies never share mutable state.
 *
 * @param node The inheriting node.
 * @param source The referenced node.
 * @param context The resolution context.
 * @returns {void}
 */
function inheritFromHierarchy(node: ReferenceNode, source: ReferenceNode, context: Context): void {
  resolve(source, context);

  getInheritedLabels(node)
    .filter((label: InheritableOption) => Object.hasOwn(source.hierarchy, label))
    .forEach((label: InheritableOption) => {
      const value = label === "childNodes"
        ? inheritChildNodes(node, source, context)
        : clone(source.hierarchy[label]);

      (findOption(label) as Option).inherit(node.hierarchy, value);
    });
}


/**
 * @description
 * Builds the child nodes a node inherits: fully resolved copies of the source's children,
 * stripped of their `ref` so that they never shadow the originals.
 *
 * @param node The inheriting node.
 * @param source The referenced node.
 * @param context The resolution context.
 * @returns {Array<Hierarchy>} The copied children (empty when children aren't allowed).
 */
function inheritChildNodes(node: ReferenceNode, source: ReferenceNode, context: Context): Array<Hierarchy> {
  if (!node.hierarchy.from.children.allow) {
    return [];
  }

  collect(source.hierarchy, source.depth, source.isTemplate)
    .slice(1)
    .forEach((descendant: ReferenceNode) => resolve(context.byHierarchy.get(descendant.hierarchy) as ReferenceNode, context));

  const copies = clone(source.hierarchy.childNodes);

  copies.forEach(stripReferences);

  return copies;
}


/**
 * @description
 * Clears the `ref` of a copied hierarchy and of everything it contains.
 *
 * @param hierarchy The copied hierarchy.
 * @returns {void}
 */
function stripReferences(hierarchy: Hierarchy): void {
  hierarchy.ref = "";
  hierarchy.childNodes?.forEach(stripReferences);
  hierarchy.templates?.forEach(stripReferences);
}
