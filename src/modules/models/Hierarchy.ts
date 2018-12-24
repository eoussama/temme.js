/**
 * The hierarchy model that maps the HTML skeleton.
 */


import ContentKeys from "../options/ContentOption";
import FromKeys from "../options/FromOption";


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
    templates: Array<Object>;

    /**
     * The hierarchy object's children.
     */
    childrenNodes: Array<Hierarchy>;
    
    /**
     * The HTML element's content.
     */
    content: ContentKeys;
    
    /**
     * The hierarchy object's referencing object.
     */
    from: FromKeys;

    /**
     * The HTML element's attributes.
     */
    attributes: Object;

    /**
     * The HTML element's dataset.
     */
    dataset: Object;
}
