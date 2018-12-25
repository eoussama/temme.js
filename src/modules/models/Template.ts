/**
 * The template model.
 */
export type Template = {
    
    /**
     * The template's reference.
     */
    ref: string;

    /**
     * The HTML element's id.
     */
    id: string;

    /**
     * The template's temmeIds.
     */
    temmeIds: Array<string>;

    /**
     * The HTML element's classes.
     */
    classes: Array<string>;
    
    /**
     * The HTML element's content.
     */
    content: Object;
    
    /**
     * The template object's referencing object.
     */
    from: Object;

    /**
     * The HTML element's attributes.
     */
    attributes: Object;

    /**
     * The HTML element's dataset.
     */
    dataset: Object;
}
