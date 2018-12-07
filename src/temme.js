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
        }
    };

    /**
     * Temme's custom exception.
     * 
     * @param {*} name The name of the exception.
     * @param {*} message The message of the exception.
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
     * Producing an HTML skeleton out of a hierarchy object.
     * 
     * @param {*} hierarchy The hierarchy object that maps the skeleton.
     * @param {*} element The element to host the skeleton.
     */
    function temmefy(hierarchy, element) {

        for (let key in hierarchy) {

            // Checking if the option is valid.
            if (!(key in options)) {
                throw new TemmeError('InvalidOptionNameError', `“${key}” is not a valid option.`);
            } else {

                // Supervising the options.
                for (let key in options) {

                    // Populating the empty options with defaults.
                    if (!(key in hierarchy)) {
                        hierarchy[key] = options[key].default;

                    } else {

                        // Checking of the option types are correct.
                        if (!options[key].isValid(hierarchy[key])) {
                            throw new TemmeError('InvalidOptionTypeError', `The option “${key}” must be of type ${options[key].type}.`);
                        }
                    }
                }

                // Parsing the hierarchy object.
                switch (key) {

                    // Parsing the id.
                    case 'id': {

                        if (hierarchy[key].trim().length > 0) {

                            // If the id is a valid string, proceed.
                            element.id = hierarchy[key];

                        } else {

                            // If the id is an empty string, remove the id attribute.
                            element.removeAttribute(('id'));
                        }

                        break;
                    }

                    // Parsing the classes.
                    case 'classes': {

                        // If the classes array is not empty, proceed.
                        if (hierarchy[key].length > 0) {

                            // Removing any duplicate classes.
                            const filteredClasses = hierarchy[key].filter((cls, index) => !element.classList.contains(cls) && hierarchy[key].indexOf(cls) === index && cls.trim().length > 0);

                            // Sorting and concatinating the classes.
                            const sanitizedClasses = [...element.classList, ...filteredClasses].sort().join(' ');

                            // Assigning the classes.
                            element.classList = sanitizedClasses;
                        } else {

                            // If the classes array is empty, remove the class attribute.
                            element.removeAttribute('class');
                        }

                        break;
                    }

                    // Parsing the attributes.
                    case 'attributes': {

                        // Extracting all the attribute keys.
                        const attrKeys = Object.keys(hierarchy[key]);

                        // Looping through the extracted attribute keys.
                        attrKeys.forEach(attrKey => {
                            element.setAttribute(attrKey, hierarchy[key][attrKey]);
                        });

                        break;
                    }

                    // Parsing the dataset.
                    case 'dataset': {

                        // Appending values.
                        Object.assign(element.dataset, hierarchy[key]);

                        break;
                    }

                    // Parsing the text.
                    case 'text': {
                        element.textContent = hierarchy[key];

                        break;
                    }

                    // Parsing the HTML.
                    case 'html': {
                        element.innerHTML = hierarchy[key];

                        break;
                    }

                    // Parsing the child nodes.
                    case 'children': {

                        // Looping through the children of the hierarchy object.
                        hierarchy.children.forEach(child => {

                            // Creating an element given the name if the hierarchy object.
                            // If no valid name is found, create a div as the default behavior.
                            const childNode = document.createElement(child['name'] || options['name'].default);

                            // Temmefying all the sub children as well.
                            temmefy(child, childNode);

                            // Adding the temmefied element to its parent.
                            element.appendChild(childNode);
                        });

                        break;
                    }
                }
            }
        }
    }

    /**
     * The main function behind it all.
     * 
     * @param {*} hierarchy The hierarchy object that maps the HTML skeleton.
     * @param {*} target The HTML element that hosts the skeleton.
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
