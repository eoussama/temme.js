type From = {
    ref: string;
    mode: string;
    include: Array<string>;
    exclude: Array<string>;
    children: {
        allow: boolean;
        placement: string;
    };
};
type Content = {
    type: string;
    value: string;
};
type Hierarchy = {
    ref: string;
    name: string;
    id: string;
    temmeIds: Array<string>;
    classes: Array<string>;
    templates: Array<Hierarchy>;
    childNodes: Array<Hierarchy>;
    content: Content;
    from: From;
    attributes: Record<string, string>;
    dataset: Record<string, string>;
    [key: string]: unknown;
};

type TParseEndCallback = (resultedHierarchy: Hierarchy) => void | Promise<void>;
type TParseNodeCallback = (temmeId: string, currentHierarchy: Hierarchy) => void;
declare function parse(hierarchy: object, target: HTMLElement, endCallback?: TParseEndCallback, nodeCallback?: TParseNodeCallback): object;
declare function validate(hierarchy: object): {
    valid: boolean;
    error: unknown;
};

export { parse, validate };
