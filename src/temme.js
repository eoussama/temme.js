/**
*
* @name:       temmejs
* @version:    0.3.0
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
            default: { ref: '' },
            type: 'object',
            keys: ['ref', 'mode', 'children'],
            isValid: (from) => from != null && !Array.isArray(from) && typeof from === 'object'
        }
    };

    /**
     * Checks if the hierarchy has valid options.
     * 
     * @param {Object} hierarchy The hierarchy to check.
     */
    function checkOptions(hierarchy) {

        // Looping through the hierarchy options.
        for (let key in hierarchy) {

            // Checking if the option is valid.
            if (!(key in options)) {
                throw new TemmeError('InvalidOptionNameError', `“${key}” is not a valid option.`);
            } else if (!options[key].isValid(hierarchy[key])) {
                throw new TemmeError('InvalidOptionTypeError', `The option “${key}” must be of type ${options[key].type}.`);
            }
        }

        // Populating empty options with defaults.
        for (let key in options) {
            if (!(key in hierarchy)) {
                hierarchy[key] = options[key].default;
            }
        }

        // Checking if the element has children.
        if ('children' in hierarchy) {

            // Looping through the children.
            hierarchy['children'].forEach(child => {
                checkOptions(child);
            });
        }
    }

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
     *  Gets all the references in the hierarchy object.
     * 
     * @param {Object} hierarchy The hierarchy object to get the references from.
     * @param {Number} depth The depth of the processed element in the hierarchy object.
     * @param {Array} references The array that will store the references found.
     */
    function getReferences(hierarchy, depth, references) {

        // Checking if the hierarchy object has a valid `ref` key.
        if ('ref' in hierarchy && hierarchy['ref'].length > 0) {

            // Adding the element to the references array as it's a
            // valid reference.
            references.push({
                refElement: hierarchy,
                depth: depth
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
     */
    function processReferences(hierarchy, depth, references) {

        // Looping through all keys of the hierarchy object.
        for (let key in hierarchy) {
            switch (key) {

                // Parssing the references.
                case 'from': {

                    if (!('ref' in hierarchy['from'])) {
                        throw new TemmeError('InvalidReferencingObject', "The “from” option must have a “ref” key, otherwise, it's invalid");
                    } else {
                        for (let fromKey in hierarchy['from']) {

                            // Checking if the from key is invalid.
                            if (!options['from'].keys.includes(fromKey)) {
                                throw new TemmeError('InvalidReferencingObject', `“${fromKey}” is an invalid key to have in the “from” option.`);
                            }
                        }
                    }

                    if (hierarchy['from']['ref'].length > 0) {
                        // Getting the filtered references, must equal the one the current
                        // element is pointing to and has a lower or a matching depth
                        // indicating it's either a parent or a sibling so that no parent
                        // element can reference a child element.
                        const reference = references
                            .filter(ref => ref.refElement.ref === hierarchy['from']['ref'] && ref.depth < depth)
                            .sort((refA, refB) => refB.depth - refA.depth)[0];

                        /**
                         * Performs the referencing process.
                         * 
                         * @param {String} mode The mode of the reference (append or override).
                         */
                        function referenceMode(mode) {
                            switch (mode) {
                                case 'append': {

                                    // looping through all the referenced object's options.
                                    for (let k in reference.refElement) {

                                        // Avoiding inheriting the `from`, `name` options.
                                        if (!['from', 'ref', 'name'].includes(k)) {
                                            switch (options[k].type) {
                                                case 'array': {

                                                    // If the array is not empty, proceed.
                                                    if (hierarchy[k].length > 0) {
                                                        // Removing any duplicate classes.
                                                        const filteredClasses = reference.refElement[k].filter((cls, index) => !hierarchy[k].includes(cls) && reference.refElement[k].indexOf(cls) === index && cls.trim().length > 0);

                                                        // Sorting and concatinating the classes.
                                                        const sanitizedClasses = ([...hierarchy[k], ...filteredClasses]).sort();

                                                        // Assigning the classes.
                                                        hierarchy[k] = sanitizedClasses;
                                                    }

                                                    break;
                                                }

                                                case 'object': {
                                                    Object.assign(hierarchy[k], reference.refElement[k]);

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
                                    for (let k in reference.refElement) {

                                        // Avoiding inheriting the `from` and `name.
                                        if (!['from', 'ref', 'name'].includes(k)) {
                                            hierarchy[k] = reference.refElement[k];
                                        }
                                    }

                                    break;
                                }

                                default: {
                                    throw TemmeError('InvalidReferenceMode', `“${mode}” is not a valid referencing mode.`);
                                }
                            }
                        }

                        if (typeof reference !== 'undefined') {

                            // Checking if the referencing object `from` has a reference mode.
                            if ('mode' in hierarchy['from']) {
                                referenceMode(hierarchy['from']['mode']);
                            } else {
                                referenceMode('append');
                            }
                        } else {
                            throw new TemmeError('InvalidReference', `“${hierarchy['from']['ref']}” is an invalid reference.`);
                        }
                    }

                    break;
                }
            }
        }

        // Checkinf if the element has children.
        if ('children' in hierarchy) {

            // Looping through the hierarchy object's children and
            // processing their references.
            hierarchy.children.forEach(child => {
                processReferences(child, ++depth, references);
            });
        }
    }

    /**
     * Producing an HTML skeleton out of a hierarchy object.
     * 
     * @param {Object} hierarchy The hierarchy object that maps the skeleton.
     * @param {HTMLElement} element The element to host the skeleton.
     */
    function temmefy(hierarchy, element) {

        for (let key in hierarchy) {

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

                            // Temmefying all the sub children as well.
                            temmefy(child, childNode);

                            // Adding the temmefied element to its parent.
                            element.appendChild(childNode);
                        });
                    }

                    break;
                }
            }
        }
    }

    /**
     * The main function behind it all.
     * 
     * @param {Object} hierarchy The hierarchy object that maps the HTML skeleton.
     * @param {HTMLElement} target The HTML element that hosts the skeleton.
     */
    function Temme(hierarchy = {}, target = document.body) {
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
            checkOptions(hierarchy);

            // Supervising the references.
            (() => {
                /**
                 *  Holds all elements with a reference in the hierarchy object.
                 */
                let references = [];

                // Getting all the references.
                getReferences(hierarchy, 0, references);

                // Processing all the references.
                processReferences(hierarchy, 0, references);
            })();

            // Temme, go for it.
            temmefy(hierarchy, target);
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
