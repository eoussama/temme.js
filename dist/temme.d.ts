declare function parse(hierarchy: Object, target: HTMLElement, endCallback?: (resultedHierarchy: any) => void | Promise<void>, nodeCallback?: (temmeId: string, currentHierarchy: any) => void): Object;
declare function validate(hierarchy: Object): Object;

export { parse, validate };
