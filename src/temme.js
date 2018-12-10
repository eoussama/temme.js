/**
*
* @name:       temmejs
* @version:    0.5.0
* @author:     EOussama
* @license     MIT
* @source:     https://github.com/EOussama/temmejs
* 
* Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
* with no doubts, Emmet saved us from the headache of working with HTML and CSS, 
* and now, Temme is doing Javascript the same favour too.
*
*/

"use strict";

(function (obj) {

    /**
     * The supported options of Temme.
     */
    const options = {

        /**
         * The unique id assigned by Temme.
         */
        temmeIds: {
            default: [],
            type: 'array',
            isValid: (temmeIds) => temmeIds != null && Array.isArray(temmeIds)
        },

        /**
         * The name of the HTML tag of the element.
         */
        name: {
            default: 'div',
            type: 'string',
            isValid: (name) => name != null && typeof name === 'string'
        },

        /**
         * The id of the HTML element.
         */
        id: {
            default: '',
            type: 'string',
            isValid: (id) => id != null && typeof id === 'string'
        },

        /**
         * The classes of the HTML element.
         */
        classes: {
            default: [],
            type: 'array',
            isValid: (classes) => classes != null && Array.isArray(classes)
        },

        /**
         * The attributes of the HTML element.
         */
        attributes: {
            default: {},
            type: 'object',
            isValid: (attributes) => attributes != null && !Array.isArray(attributes) && typeof attributes === 'object'
        },

        /**
         * The dataset of the HTML element.
         */
        dataset: {
            default: {},
            type: 'object',
            isValid: (dataset) => dataset != null && !Array.isArray(dataset) && typeof dataset === 'object'
        },

        /**
         * The text (textContent and innerText) of the HTML element.
         */
        text: {
            default: '',
            type: 'string',
            isValid: (text) => text != null && typeof text === 'string'
        },

        /**
         * The HTML (innerHTML) of the HTML element.
         */
        html: {
            default: '',
            type: 'string',
            isValid: (html) => html != null && typeof html === 'string'
        },

        /**
         * The child nodes of the HTML element.
         */
        children: {
            default: [],
            type: 'array',
            isValid: (children) => children != null && Array.isArray(children)
        },

        /**
         * The reference key of the element.
         */
        ref: {
            default: '',
            type: 'string',
            isValid: (ref) => ref != null && typeof ref === 'string'
        },

        /**
         * The referencing key of the element.
         */
        from: {
            default: { ref: '', mode: 'append', children: { allow: false, placement: 'after' } },
            type: 'object',
            keys: {
                ref: {
                    default: '',
                    type: 'string',
                    isValid: (ref) => ref != null && typeof ref === 'string'
                },
                mode: {
                    default: 'append',
                    type: 'string',
                    values: ['append', 'override'],
                    isValid: (mode) => mode != null && typeof mode === 'string'
                },
                children: {
                    default: { allow: false, placement: 'after' },
                    type: 'object',
                    keys: {
                        allow: {
                            default: false,
                            type: 'boolean',
                            isValid: (allow) => allow != null && typeof allow === 'boolean'
                        },
                        placement: {
                            default: 'after',
                            type: 'string',
                            values: ['after', 'before'],
                            isValid: (placement) => placement != null && typeof placement === 'string'
                        }
                    },
                    isValid: (children) => children != null && !Array.isArray(children) && typeof children === 'object'
                }
            },
            isValid: (from) => from != null && !Array.isArray(from) && typeof from === 'object'
        },

        /**
         * The templates.
         */
        templates: {
            default: [],
            type: 'array',
            isValid: (templates) => templates != null && Array.isArray(templates)
        },

        /**
         * Whether a sub-hierarchy object is a template or not. Used only internaly.
         */
        isTemplate: {
            default: false,
            type: 'boolean',
            isValid: (isTemplate) => isTemplate != null && typeof isTemplate === 'boolean'
        }
    };

    /**
     * Temme's custom exception.
     * 
     * @param {String} name The name of the exception.
     * @param {String} message The message of the exception.
     */
    function TemmeError(name = 'TemmeError', message = 'Something went wrong.') {

        /**
         * The name of the error.
         */
        this.name = name;

        /**
         * The message of the error.
         */
        this.message = message;
    }

    // Inheriting from the Error.
    TemmeError.prototype = Error.prototype;

    /**
     * Generates a unique string of 6 characters.
     */
    function generateTemmeId() {
        const chars = "0123456789abcdefghijklmnopqrstuvwxyz";
        let key = '';

        [...Array(6).keys()].forEach(() => {
            const
                index = Math.floor((Math.random() * chars.length)),
                uppercase = Math.floor(Math.random() * 2);

            key += uppercase === 1 ? chars[index].toUpperCase() : chars[index];
        });

        return key;
    }

    /**
     * Checks if the hierarchy has valid options.
     * 
     * @param {Object} hierarchy The hierarchy to check.
     * @param {Array} temmeIds The temme Id series associated with the object.
     * @param {Object} hierarchy The hierarchy to check.
     */
    function checkOptions(hierarchy, temmeIds, ignore = []) {

        // Looping through the hierarchy options.
        for (const key in hierarchy) {

            // Checking if the option is valid.
            if (!(key in options)) {
                throw new TemmeError('InvalidOptionNameError', `“${key}” is not a valid option.`);
            } else if (!options[key].isValid(hierarchy[key])) {
                throw new TemmeError('InvalidOptionTypeError', `The option “${key}” must be of type ${options[key].type}.`);
            } else if (key === 'ref' && hierarchy[key].trim()[0] === '@') {
                throw new TemmeError('InvalidReference', 'References should not start with the symbole `@`.');
            }
        }

        // Assigning temmeIds.
        hierarchy['temmeIds'] = Array.from(temmeIds);
        hierarchy['temmeIds'].push(generateTemmeId());

        // Populating empty options with defaults.
        for (const key in options) {
            if (!(key in hierarchy)) {

                // Ignore the optional passed arguments, used to 
                // skip on `name` and `children` for templates.
                if (!ignore.includes(key)) {
                    if (options[key].type === 'object') {
                        hierarchy[key] = Object.create(options[key].default);
                    } else {
                        hierarchy[key] = options[key].default;
                    }

                    if (hierarchy.isTemplate !== true) {
                        hierarchy.isTemplate = false;
                    }
                } else {
                    hierarchy.isTemplate = true;
                }
            } else if (key === 'from') {

                // If no `children` option exist, assign a default.
                if (!('children' in hierarchy['from'])) {
                    hierarchy['from']['children'] = Object.create(options['from']['keys']['children'].default);
                } else {

                    // Checking of the object lacks any `from.children` keys and setting the default values.
                    for (const _key in options['from']['keys']['children']['keys']) {
                        if (!(_key in hierarchy['from']['children'])) {
                            hierarchy['from']['children'][_key] = options['from']['keys']['children']['keys'][_key].default;
                        }
                    }
                }
            }
        }

        // Checking if the element has templates.
        if ('templates' in hierarchy) {

            // Looping through the children.
            hierarchy['templates'].forEach(template => {
                checkOptions(template, hierarchy['temmeIds'], ['name', 'children', 'templates', 'text', 'html']);
            });
        }

        // Checking if the element has children.
        if ('children' in hierarchy) {

            // Looping through the children.
            hierarchy['children'].forEach(child => {
                checkOptions(child, hierarchy['temmeIds']);
            });
        }
    }

    /**
     *  Gets all the references in the hierarchy object.
     * 
     * @param {Object} hierarchy The hierarchy object to get the references from.
     * @param {Number} depth The depth of the processed element in the hierarchy object.
     * @param {Array} references The array that will store the references found.
     */
    function getReferences(hierarchy, depth, references) {

        // Checking if the hierarchy object has any templates.
        if ('templates' in hierarchy && hierarchy['templates'].length > 0) {
            hierarchy['templates'].forEach(template => {
                if ('name' in template) {
                    throw new TemmeError('InvalidTemplate', "Templates must not have a `name` option.");
                } else if ('text' in template) {
                    throw new TemmeError('InvalidTemplate', "Templates must not have a `text` option.");
                } else if ('html' in template) {
                    throw new TemmeError('InvalidTemplate', "Templates must not have a `html` option.");
                } else if ('children' in template) {
                    throw new TemmeError('InvalidTemplate', "Templates must not have a `children` option.");
                } else if ('templates' in template) {
                    throw new TemmeError('InvalidTemplate', "Template nesting is not allowed.");
                } else if ('ref' in template) {

                    // Adding the element to the references array as it's a
                    // valid reference.
                    references.push({
                        refElement: template,
                        depth: depth,
                        isTemplate: true
                    });
                } else {
                    throw new TemmeError('InvalidTemplate', "Templates must have a `ref` option, otherwise, they are invalid.");
                }
            });
        }

        // Checking if the hierarchy object has a valid `ref` key.
        if ('ref' in hierarchy && hierarchy['ref'].length > 0) {

            // Adding the element to the references array as it's a
            // valid reference.
            references.push({
                refElement: hierarchy,
                depth: depth,
                isTemplate: false
            });
        }

        // Checking if the element has any children.
        if ('children' in hierarchy) {

            // Looping through the element's children and
            // getting all their sub references.
            hierarchy['children'].forEach(child => {
                getReferences(child, ++depth, references);
            });
        }
    }

    /**
     *  Processes all the references.
     * 
     * @param {Object} hierarchy The hierarchy object to process.
     * @param {Number} depth The depth of the current element in the hierarchy object.
     * @param {Array} references The array that has all the referenced elements.
     * @param {Boolean} templateOnly Whether or not to proccess only templates.
     */
    function processReferences(hierarchy, depth, references, templateOnly = false) {

        if (templateOnly === true) {
            if (hierarchy.isTemplate === true) {
                procRefs();
            }
        } else {
            procRefs();
        }

        // Actuall processing.
        function procRefs() {
            // Looping through all keys of the hierarchy object.
            for (const key in hierarchy) {
                switch (key) {

                    // Parssing the references.
                    case 'from': {

                        if (!('ref' in hierarchy['from'])) {
                            throw new TemmeError('InvalidReferencingObject', "The “from” option must have a “ref” key, otherwise, it's invalid");
                        } else {
                            for (const fromKey in hierarchy['from']) {

                                // Checking if the from key is invalid.
                                if (!Object.keys(options['from'].keys).includes(fromKey)) {
                                    throw new TemmeError('InvalidReferencingObject', `“${fromKey}” is an invalid key to have in the “from” option.`);
                                } else {

                                    // Checking if the keys' values are valid.
                                    if (!options['from'].keys[fromKey].isValid(hierarchy['from'][fromKey])) {
                                        throw new TemmeError('InvalidReferencingObject', `“${hierarchy['from'][fromKey]}” is not a valid value for “${fromKey}” of the “from” option.`);
                                    } else if ('values' in options['from'].keys[fromKey]) {

                                        // Check if the key has an unsupported value.
                                        if (!options['from'].keys[fromKey]['values'].includes(hierarchy['from'][fromKey])) {
                                            throw new TemmeError('InvalidReferencingObject', `“${hierarchy['from'][fromKey]}” is not a valid value for “${fromKey}” of the “from” option.`);
                                        }
                                    }
                                }
                            }
                        }

                        // Checking of the reference string is not empty.
                        if (hierarchy['from']['ref'].length > 0) {

                            // The reference object to append values from.
                            let reference = {
                                refElement: {},
                                depth: depth,
                                template: false
                            };

                            if (hierarchy['from']['ref'].trim()[0] === '@') {

                                // If the reference starts with `@` it's pointing to an outer element
                                // with that CSS selector.
                                const
                                    selector = hierarchy['from']['ref'].slice(1),
                                    outerElement = document.querySelector(selector);

                                // Checking if the referenced element is a valid HTML element.
                                if (outerElement != null || outerElement instanceof HTMLElement) {

                                    let
                                        outerAttr = {},
                                        outerData = {};

                                    // Getting the attributes.
                                    for (const attrKey in outerElement.attributes) {
                                        if (!isNaN(parseInt(attrKey)) && !['id', 'class'].includes(outerElement.attributes[attrKey].nodeName) && !outerElement.attributes[attrKey].nodeName.startsWith('data-')) {
                                            outerAttr[outerElement.attributes[attrKey].nodeName] = outerElement.attributes[attrKey].nodeValue;
                                        }
                                    }

                                    // Getting the dataset.
                                    for (const dataKey in outerElement.dataset) {
                                        outerData[dataKey] = outerElement.dataset[dataKey];
                                    }

                                    // Affecting all values.
                                    reference.refElement = {
                                        id: outerElement.id,
                                        html: outerElement.innerHTML,
                                        classes: [...outerElement.classList],
                                        attributes: outerAttr,
                                        dataset: outerData
                                    };
                                } else {
                                    throw new TemmeError('InvalidReference', `No valid HTML element corresponds to the CSS selector “${selector}”`);
                                }

                            } else {

                                // Getting the filtered references, must equal the one the current
                                // element is pointing to and has a lower or a matching depth
                                // indicating it's either a parent or a sibling so that no parent
                                // element can reference a child element.
                                reference = references
                                    .filter(ref => ref.refElement.ref === hierarchy['from']['ref'] && ref.depth <= depth)
                                    .sort((refA, refB) => refB.depth - refA.depth)[0];
                            }

                            if (hierarchy['from']['children']['allow'] === true && hierarchy['temmeIds'].includes(reference.refElement['temmeIds'][reference.refElement['temmeIds'].length - 1])) {
                                throw new TemmeError('InvalidReference', "Elements cannot reference their parents while “from.children.allow” is set to “true”.");
                            }

                            if (typeof reference !== 'undefined') {

                                // Checking if a template trying to inherite an element and preventing it.
                                if (reference.isTemplate === false && hierarchy.isTemplate === true) {
                                    throw new TemmeError('InvalidReference', 'Templates can only reference other templates.');
                                } else {

                                    // Checking if the referencing object `from` has a reference mode.
                                    if ('mode' in hierarchy['from']) {
                                        referenceMode(hierarchy['from']['mode']);
                                    } else {
                                        referenceMode('append');
                                    }
                                }
                            } else {
                                throw new TemmeError('InvalidReference', `“${hierarchy['from']['ref']}” is an invalid reference.`);
                            }

                            /**
                             * Performs the referencing process.
                             * 
                             * @param {String} mode The mode of the reference (append or override).
                             */
                            function referenceMode(mode) {
                                switch (mode) {
                                    case 'append': {

                                        // looping through all the referenced object's options.
                                        for (const k in reference.refElement) {

                                            // Avoiding inheriting the `from`, `name` options.
                                            if (!['from', 'ref', 'id', 'name', 'temmeIds', 'isTemplate', 'templates', (hierarchy['from']['children']['allow'] !== true ? 'children' : '')].includes(k)) {
                                                switch (options[k].type) {
                                                    case 'array': {

                                                        if (k !== 'children') {

                                                            // Removing any duplicate classes.
                                                            const filteredClasses = reference.refElement[k].filter((cls, index) => !hierarchy[k].includes(cls) && reference.refElement[k].indexOf(cls) === index && cls.trim().length > 0);

                                                            // Sorting and concatinating the classes.
                                                            const sanitizedClasses = ([...hierarchy[k], ...filteredClasses]).sort();

                                                            // Assigning the classes.
                                                            hierarchy[k] = sanitizedClasses;
                                                        } else {

                                                            // If the children's placement is set to `after`, meaning
                                                            // The referenced object's children should come after the
                                                            // referencing object's. Otherwise, the should come before.
                                                            switch (hierarchy['from']['children']['placement']) {
                                                                case 'after': {
                                                                    hierarchy[k].push(...reference.refElement[k]);

                                                                    break;
                                                                }

                                                                case 'before': {
                                                                    hierarchy[k].unshift(...reference.refElement[k]);

                                                                    break;
                                                                }

                                                                default: {
                                                                    throw new TemmeError('InvalidReferencingObject', `“${hierarchy['from']['children']['placement']}” is an invalid placement.`);
                                                                }
                                                            }
                                                        }

                                                        break;
                                                    }

                                                    case 'object': {

                                                        // Override only the matching keys.
                                                        for (const refKey in reference.refElement[k]) {
                                                            if (!(refKey in hierarchy[k])) {
                                                                hierarchy[k][refKey] = reference.refElement[k][refKey];
                                                            }
                                                        }

                                                        break;
                                                    }

                                                    default: {
                                                        hierarchy[k] = reference.refElement[k];
                                                    }
                                                }
                                            }
                                        }

                                        break;
                                    }

                                    case 'override': {

                                        // looping through all the referenced object's options.
                                        for (const k in reference.refElement) {

                                            // Avoiding inheriting the `from` and `name.
                                            if (!['from', 'ref', 'name', 'temmeIds', 'isTemplate', 'templates', (hierarchy['from']['children']['allow'] !== true ? 'children' : '')].includes(k)) {
                                                switch (options[k].type) {
                                                    case 'object': {

                                                        // Override only the matching keys.
                                                        for (const refKey in reference.refElement[k]) {
                                                            hierarchy[k][refKey] = reference.refElement[k][refKey];
                                                        }

                                                        break;
                                                    }

                                                    default: {
                                                        hierarchy[k] = reference.refElement[k];
                                                    }
                                                }
                                            }
                                        }

                                        break;
                                    }

                                    default: {
                                        throw new TemmeError('InvalidReferenceMode', `“${mode}” is not a valid referencing mode.`);
                                    }
                                }
                            }
                        }

                        break;
                    }
                }
            }
        }

        // Checking if the element has templates.
        if ('templates' in hierarchy) {

            // Looping through the hierarchy object's templates and
            // processing their references.
            hierarchy.templates.forEach(template => {
                processReferences(template, ++depth, references, templateOnly);
            });
        }

        // Checking if the element has children.
        if ('children' in hierarchy) {

            // Looping through the hierarchy object's children and
            // processing their references.
            hierarchy.children.forEach(child => {
                processReferences(child, ++depth, references, templateOnly);
            });
        }
    }

    /**
     * Producing an HTML skeleton out of a hierarchy object.
     * 
     * @param {Object} hierarchy The hierarchy object that maps the skeleton.
     * @param {HTMLElement} element The element to host the skeleton.
     * @param {Number} depth The depth of the current element in the hierarchy object.
     * @param {Function} callback The callback to execute whenever an element has been created.
     */
    function temmefy(hierarchy, element, depth, callback = (temmeId, currentHierarchy, depth) => { }) {

        // Parsing all the values.
        for (const key in hierarchy) {

            // Parsing the hierarchy object.
            switch (key) {

                // Parsing the id.
                case 'id': {

                    // If the id is a valid string, proceed.
                    if (hierarchy[key] !== options[key].default) {
                        element.id = hierarchy[key];
                    }

                    break;
                }

                // Parsing the classes.
                case 'classes': {

                    if (hierarchy[key] !== options[key].default) {

                        // Removing any duplicate classes.
                        const filteredClasses = hierarchy[key].filter((cls, index) => !element.classList.contains(cls) && hierarchy[key].indexOf(cls) === index && cls.trim().length > 0);

                        // Sorting and concatinating the classes.
                        const sanitizedClasses = [...element.classList, ...filteredClasses].sort().join(' ');

                        // Assigning the classes.
                        element.classList = sanitizedClasses;
                    }

                    break;
                }

                // Parsing the attributes.
                case 'attributes': {

                    if (hierarchy[key] !== options[key].default) {

                        // Extracting all the attribute keys.
                        const attrKeys = Object.keys(hierarchy[key]);

                        // Looping through the extracted attribute keys.
                        attrKeys.forEach(attrKey => {
                            element.setAttribute(attrKey, hierarchy[key][attrKey]);
                        });
                    }

                    break;
                }

                // Parsing the dataset.
                case 'dataset': {

                    if (hierarchy[key] !== options[key].default) {

                        // Appending values.
                        Object.assign(element.dataset, hierarchy[key]);
                    }

                    break;
                }

                // Parsing the text.
                case 'text': {

                    if (hierarchy[key] !== options[key].default) {

                        // Assigning the text.
                        element.textContent = hierarchy[key];
                    }

                    break;
                }

                // Parsing the HTML.
                case 'html': {

                    if (hierarchy[key] !== options[key].default) {

                        // Assigning the HTML.
                        element.innerHTML = hierarchy[key];
                    }

                    break;
                }

                // Parsing the child nodes.
                case 'children': {

                    if (hierarchy[key] !== options[key].default) {

                        // Looping through the children of the hierarchy object.
                        hierarchy.children.forEach(child => {

                            // Creating an element given the name if the hierarchy object.
                            const childNode = document.createElement(child['name']);

                            // Adding the temmefied element to its parent.
                            element.appendChild(childNode);

                            // Temmefying all the sub children as well.
                            temmefy(child, childNode, ++depth, callback);
                        });
                    }

                    break;
                }
            }
        }

        // Executing the passed callback.
        callback(hierarchy.temmeIds[hierarchy.temmeIds.length - 1], hierarchy, depth);
    }

    /**
     * The main function behind it all.
     * 
     * @param {Object} hierarchy The hierarchy object that maps the HTML skeleton.
     * @param {HTMLElement} target The HTML element that hosts the skeleton.
     * @param {Function} temmeCallback The callback to execute when all objects have been created.
     * @param {Function} elementCallback The callback to execute whenever an element has been created.
     */
    function Temme(hierarchy = {}, target = document.body, temmeCallback = () => { }, elementCallback = (temmeId, currentHierarchy, depth) => { }) {
        try {

            // Checking if the hierarchy object is valid.
            if (hierarchy == null || typeof hierarchy !== 'object' || Array.isArray(hierarchy)) {
                throw new TemmeError('InvalidHierarchyError', 'The hierarchy object is invalid.');
            }

            // Checking if the target object is a valid HTML element.
            if (!(target instanceof HTMLElement)) {
                throw new TemmeError('InvalidTargetError', 'The target must be a valid HTML element.');
            }

            // Checking the hierarchy options for our own good.
            checkOptions(hierarchy, []);

            // Supervising the references.
            (() => {

                /**
                 *  Holds all elements with a reference in the hierarchy object.
                 */
                let references = [];

                // Getting all the references.
                getReferences(hierarchy, 0, references);

                // Processing all template the references.
                processReferences(hierarchy, 0, references, true);

                // Processing all remaining the references.
                processReferences(hierarchy, 0, references);
            })();

            // Temme, go for it.
            temmefy(hierarchy, target, 0, elementCallback);

            // Execute the user's passed callback.
            temmeCallback();
        }
        catch (e) {

            // Appending a tag to the error message.
            e.message = `[Temme JS]: ${e.message}`;

            // Throwing the error.
            throw e;
        }
    }

    if (typeof exports !== 'undefined') {
        module.exports = Temme;
    } else {
        obj.Temme = Temme;
    }
})((typeof window !== 'undefined') ? window : this);
