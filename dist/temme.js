/**
 *
 * @name:       temmejs
 * @version:    0.4.0
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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
}

function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
    }
    return _typeof(obj);
}

(function(obj) {
    /**
     * The supported options of Temme.
     */
    var options = {
        /**
         * The unique id assigned by Temme.
         */
        temmeIds: {
            default: [],
            type: 'array',
            isValid: function isValid(temmeIds) {
                return temmeIds != null && Array.isArray(temmeIds);
            }
        },

        /**
         * The name of the HTML tag of the element.
         */
        name: {
            default: 'div',
            type: 'string',
            isValid: function isValid(name) {
                return name != null && typeof name === 'string';
            }
        },

        /**
         * The id of the HTML element.
         */
        id: {
            default: '',
            type: 'string',
            isValid: function isValid(id) {
                return id != null && typeof id === 'string';
            }
        },

        /**
         * The classes of the HTML element.
         */
        classes: {
            default: [],
            type: 'array',
            isValid: function isValid(classes) {
                return classes != null && Array.isArray(classes);
            }
        },

        /**
         * The attributes of the HTML element.
         */
        attributes: {
            default: {},
            type: 'object',
            isValid: function isValid(attributes) {
                return attributes != null && !Array.isArray(attributes) && _typeof(attributes) === 'object';
            }
        },

        /**
         * The dataset of the HTML element.
         */
        dataset: {
            default: {},
            type: 'object',
            isValid: function isValid(dataset) {
                return dataset != null && !Array.isArray(dataset) && _typeof(dataset) === 'object';
            }
        },

        /**
         * The text (textContent and innerText) of the HTML element.
         */
        text: {
            default: '',
            type: 'string',
            isValid: function isValid(text) {
                return text != null && typeof text === 'string';
            }
        },

        /**
         * The HTML (innerHTML) of the HTML element.
         */
        html: {
            default: '',
            type: 'string',
            isValid: function isValid(html) {
                return html != null && typeof html === 'string';
            }
        },

        /**
         * The child nodes of the HTML element.
         */
        children: {
            default: [],
            type: 'array',
            isValid: function isValid(children) {
                return children != null && Array.isArray(children);
            }
        },

        /**
         * The reference key of the element.
         */
        ref: {
            default: '',
            type: 'string',
            isValid: function isValid(ref) {
                return ref != null && typeof ref === 'string';
            }
        },

        /**
         * The referencing key of the element.
         */
        from: {
            default: {
                ref: '',
                mode: 'append',
                children: {
                    allow: false,
                    placement: 'after'
                }
            },
            type: 'object',
            keys: {
                ref: {
                    default: '',
                    type: 'string',
                    isValid: function isValid(ref) {
                        return ref != null && typeof ref === 'string';
                    }
                },
                mode: {
                    default: 'append',
                    type: 'string',
                    values: ['append', 'override'],
                    isValid: function isValid(mode) {
                        return mode != null && typeof mode === 'string';
                    }
                },
                children: {
                    default: {
                        allow: false,
                        placement: 'after'
                    },
                    type: 'object',
                    keys: {
                        allow: {
                            default: false,
                            type: 'boolean',
                            isValid: function isValid(allow) {
                                return allow != null && typeof allow === 'boolean';
                            }
                        },
                        placement: {
                            default: 'after',
                            type: 'string',
                            values: ['after', 'before'],
                            isValid: function isValid(placement) {
                                return placement != null && typeof placement === 'string';
                            }
                        }
                    },
                    isValid: function isValid(children) {
                        return children != null && !Array.isArray(children) && _typeof(children) === 'object';
                    }
                }
            },
            isValid: function isValid(from) {
                return from != null && !Array.isArray(from) && _typeof(from) === 'object';
            }
        }
    };
    /**
     * Temme's custom exception.
     * 
     * @param {String} name The name of the exception.
     * @param {String} message The message of the exception.
     */

    function TemmeError() {
        var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'TemmeError';
        var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Something went wrong.';

        /**
         * The name of the error.
         */
        this.name = name;
        /**
         * The message of the error.
         */

        this.message = message;
    } // Inheriting from the Error.


    TemmeError.prototype = Error.prototype;
    /**
     * Generates a unique string of 6 characters.
     */

    function generateTemmeId() {
        var chars = "0123456789abcdefghijklmnopqrstuvwxyz";
        var key = '';

        _toConsumableArray(Array(6).keys()).forEach(function() {
            var index = Math.floor(Math.random() * chars.length),
                uppercase = Math.floor(Math.random() * 2);
            key += uppercase === 1 ? chars[index].toUpperCase() : chars[index];
        });

        return key;
    }
    /**
     * Checks if the hierarchy has valid options.
     * 
     * @param {Object} hierarchy The hierarchy to check.
     */


    function checkOptions(hierarchy, temmeIds) {
        // Looping through the hierarchy options.
        for (var key in hierarchy) {
            // Checking if the option is valid.
            if (!(key in options)) {
                throw new TemmeError('InvalidOptionNameError', "\u201C".concat(key, "\u201D is not a valid option."));
            } else if (!options[key].isValid(hierarchy[key])) {
                throw new TemmeError('InvalidOptionTypeError', "The option \u201C".concat(key, "\u201D must be of type ").concat(options[key].type, "."));
            } else if (key === 'ref' && hierarchy[key].trim()[0] === '@') {
                throw new TemmeError('InvalidReference', 'References should not start with the symbole `@`.');
            }
        } // Assigning temmeIds.


        hierarchy['temmeIds'] = Array.from(temmeIds);
        hierarchy['temmeIds'].push(generateTemmeId()); // Populating empty options with defaults.

        for (var _key2 in options) {
            if (!(_key2 in hierarchy)) {
                if (options[_key2].type === 'object') {
                    hierarchy[_key2] = Object.create(options[_key2].default);
                } else {
                    hierarchy[_key2] = options[_key2].default;
                }
            } else if (_key2 === 'from') {
                if (!('children' in hierarchy['from'])) {
                    hierarchy['from']['children'] = Object.create(options['from']['keys']['children'].default);
                } else {
                    // Checking of the object lacks any `from.children` keys and setting the default values.
                    for (var _key in options['from']['keys']['children']['keys']) {
                        if (!(_key in hierarchy['from']['children'])) {
                            hierarchy['from']['children'][_key] = options['from']['keys']['children']['keys'][_key].default;
                        }
                    }
                }
            }
        } // Checking if the element has children.


        if ('children' in hierarchy) {
            // Looping through the children.
            hierarchy['children'].forEach(function(child) {
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
        // Checking if the hierarchy object has a valid `ref` key.
        if ('ref' in hierarchy && hierarchy['ref'].length > 0) {
            // Adding the element to the references array as it's a
            // valid reference.
            references.push({
                refElement: hierarchy,
                depth: depth
            });
        } // Checking if the element has any children.


        if ('children' in hierarchy) {
            // Looping through the element's children and
            // getting all their sub references.
            hierarchy['children'].forEach(function(child) {
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
        for (var key in hierarchy) {
            switch (key) {
                // Parssing the references.
                case 'from':
                    {
                        if (!('ref' in hierarchy['from'])) {
                            throw new TemmeError('InvalidReferencingObject', "The “from” option must have a “ref” key, otherwise, it's invalid");
                        } else {
                            for (var fromKey in hierarchy['from']) {
                                // Checking if the from key is invalid.
                                if (!Object.keys(options['from'].keys).includes(fromKey)) {
                                    throw new TemmeError('InvalidReferencingObject', "\u201C".concat(fromKey, "\u201D is an invalid key to have in the \u201Cfrom\u201D option."));
                                } else {
                                    // Checking if the keys' values are valid.
                                    if (!options['from'].keys[fromKey].isValid(hierarchy['from'][fromKey])) {
                                        throw new TemmeError('InvalidReferencingObject', "\u201C".concat(hierarchy['from'][fromKey], "\u201D is not a valid value for \u201C").concat(fromKey, "\u201D of the \u201Cfrom\u201D option."));
                                    } else if ('values' in options['from'].keys[fromKey]) {
                                        // Check if the key has an unsupported value.
                                        if (!options['from'].keys[fromKey]['values'].includes(hierarchy['from'][fromKey])) {
                                            throw new TemmeError('InvalidReferencingObject', "\u201C".concat(hierarchy['from'][fromKey], "\u201D is not a valid value for \u201C").concat(fromKey, "\u201D of the \u201Cfrom\u201D option."));
                                        }
                                    }
                                }
                            }
                        } // Checking of the reference string is not empty.


                        if (hierarchy['from']['ref'].length > 0) {
                            (function() {
                                /**
                                 * Performs the referencing process.
                                 * 
                                 * @param {String} mode The mode of the reference (append or override).
                                 */
                                var referenceMode = function referenceMode(mode) {
                                    switch (mode) {
                                        case 'append':
                                            {
                                                var _loop = function _loop(k) {
                                                    // Avoiding inheriting the `from`, `name` options.
                                                    if (!['from', 'ref', 'id', 'name', 'temmeIds', hierarchy['from']['children']['allow'] !== true ? 'children' : ''].includes(k)) {
                                                        switch (options[k].type) {
                                                            case 'array':
                                                                {
                                                                    if (k !== 'children') {
                                                                        // Removing any duplicate classes.
                                                                        var filteredClasses = reference.refElement[k].filter(function(cls, index) {
                                                                            return !hierarchy[k].includes(cls) && reference.refElement[k].indexOf(cls) === index && cls.trim().length > 0;
                                                                        }); // Sorting and concatinating the classes.

                                                                        var sanitizedClasses = _toConsumableArray(hierarchy[k]).concat(_toConsumableArray(filteredClasses)).sort(); // Assigning the classes.


                                                                        hierarchy[k] = sanitizedClasses;
                                                                    } else {
                                                                        // If the children's placement is set to `after`, meaning
                                                                        // The referenced object's children should come after the
                                                                        // referencing object's. Otherwise, the should come before.
                                                                        switch (hierarchy['from']['children']['placement']) {
                                                                            case 'after':
                                                                                {
                                                                                    var _hierarchy$k;

                                                                                    (_hierarchy$k = hierarchy[k]).push.apply(_hierarchy$k, _toConsumableArray(reference.refElement[k]));

                                                                                    break;
                                                                                }

                                                                            case 'before':
                                                                                {
                                                                                    var _hierarchy$k2;

                                                                                    (_hierarchy$k2 = hierarchy[k]).unshift.apply(_hierarchy$k2, _toConsumableArray(reference.refElement[k]));

                                                                                    break;
                                                                                }

                                                                            default:
                                                                                {
                                                                                    throw new TemmeError('InvalidReferencingObject', "\u201C".concat(hierarchy['from']['children']['placement'], "\u201D is an invalid placement."));
                                                                                }
                                                                        }
                                                                    }

                                                                    break;
                                                                }

                                                            case 'object':
                                                                {
                                                                    // Override only the matching keys.
                                                                    for (var refKey in reference.refElement[k]) {
                                                                        if (!(refKey in hierarchy[k])) {
                                                                            hierarchy[k][refKey] = reference.refElement[k][refKey];
                                                                        }
                                                                    }

                                                                    break;
                                                                }

                                                            default:
                                                                {
                                                                    hierarchy[k] = reference.refElement[k];
                                                                }
                                                        }
                                                    }
                                                };

                                                // looping through all the referenced object's options.
                                                for (var k in reference.refElement) {
                                                    _loop(k);
                                                }

                                                break;
                                            }

                                        case 'override':
                                            {
                                                // looping through all the referenced object's options.
                                                for (var k in reference.refElement) {
                                                    // Avoiding inheriting the `from` and `name.
                                                    if (!['from', 'ref', 'name', 'temmeIds', hierarchy['from']['children']['allow'] !== true ? 'children' : ''].includes(k)) {
                                                        switch (options[k].type) {
                                                            case 'object':
                                                                {
                                                                    // Override only the matching keys.
                                                                    for (var refKey in reference.refElement[k]) {
                                                                        hierarchy[k][refKey] = reference.refElement[k][refKey];
                                                                    }

                                                                    break;
                                                                }

                                                            default:
                                                                {
                                                                    hierarchy[k] = reference.refElement[k];
                                                                }
                                                        }
                                                    }
                                                }

                                                break;
                                            }

                                        default:
                                            {
                                                throw new TemmeError('InvalidReferenceMode', "\u201C".concat(mode, "\u201D is not a valid referencing mode."));
                                            }
                                    }
                                };

                                // The reference object to append values from.
                                var reference = {
                                    refElement: {},
                                    depth: depth
                                };

                                if (hierarchy['from']['ref'].trim()[0] === '@') {
                                    // If the reference starts with `@` it's pointing to an outer element
                                    // with that CSS selector.
                                    var selector = hierarchy['from']['ref'].slice(1),
                                        outerElement = document.querySelector(selector); // Checking if the referenced element is a valid HTML element.

                                    if (outerElement != null || outerElement instanceof HTMLElement) {
                                        var outerAttr = {},
                                            outerData = {}; // Getting the attributes.

                                        for (var attrKey in outerElement.attributes) {
                                            if (!isNaN(parseInt(attrKey)) && !['id', 'class'].includes(outerElement.attributes[attrKey].nodeName) && !outerElement.attributes[attrKey].nodeName.startsWith('data-')) {
                                                outerAttr[outerElement.attributes[attrKey].nodeName] = outerElement.attributes[attrKey].nodeValue;
                                            }
                                        } // Getting the dataset.


                                        for (var dataKey in outerElement.dataset) {
                                            outerData[dataKey] = outerElement.dataset[dataKey];
                                        } // Affecting all values.


                                        reference.refElement = {
                                            id: outerElement.id,
                                            html: outerElement.innerHTML,
                                            classes: _toConsumableArray(outerElement.classList),
                                            attributes: outerAttr,
                                            dataset: outerData
                                        };
                                    } else {
                                        throw new TemmeError('InvalidReference', "No valid HTML element corresponds to the CSS selector \u201C".concat(selector, "\u201D"));
                                    }
                                } else {
                                    // Getting the filtered references, must equal the one the current
                                    // element is pointing to and has a lower or a matching depth
                                    // indicating it's either a parent or a sibling so that no parent
                                    // element can reference a child element.
                                    reference = references.filter(function(ref) {
                                        return ref.refElement.ref === hierarchy['from']['ref'] && ref.depth < depth;
                                    }).sort(function(refA, refB) {
                                        return refB.depth - refA.depth;
                                    })[0];
                                }

                                if (hierarchy['from']['children']['allow'] === true && hierarchy['temmeIds'].includes(reference.refElement['temmeIds'][reference.refElement['temmeIds'].length - 1])) {
                                    throw new TemmeError('InvalidReference', "Elements cannot reference their parents while “from.children.allow” is set to “true”.");
                                }

                                if (typeof reference !== 'undefined') {
                                    // Checking if the referencing object `from` has a reference mode.
                                    if ('mode' in hierarchy['from']) {
                                        referenceMode(hierarchy['from']['mode']);
                                    } else {
                                        referenceMode('append');
                                    }
                                } else {
                                    throw new TemmeError('InvalidReference', "\u201C".concat(hierarchy['from']['ref'], "\u201D is an invalid reference."));
                                }
                            })();
                        }

                        break;
                    }
            }
        } // Checkinf if the element has children.


        if ('children' in hierarchy) {
            // Looping through the hierarchy object's children and
            // processing their references.
            hierarchy.children.forEach(function(child) {
                processReferences(child, ++depth, references);
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


    function temmefy(hierarchy, element, depth) {
        var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function(temmeId, currentHierarchy, depth) {};

        var _loop2 = function _loop2(key) {
            // Parsing the hierarchy object.
            switch (key) {
                // Parsing the id.
                case 'id':
                    {
                        // If the id is a valid string, proceed.
                        if (hierarchy[key] !== options[key].default) {
                            element.id = hierarchy[key];
                        }

                        break;
                    }
                    // Parsing the classes.

                case 'classes':
                    {
                        if (hierarchy[key] !== options[key].default) {
                            // Removing any duplicate classes.
                            var filteredClasses = hierarchy[key].filter(function(cls, index) {
                                return !element.classList.contains(cls) && hierarchy[key].indexOf(cls) === index && cls.trim().length > 0;
                            }); // Sorting and concatinating the classes.

                            var sanitizedClasses = _toConsumableArray(element.classList).concat(_toConsumableArray(filteredClasses)).sort().join(' '); // Assigning the classes.


                            element.classList = sanitizedClasses;
                        }

                        break;
                    }
                    // Parsing the attributes.

                case 'attributes':
                    {
                        if (hierarchy[key] !== options[key].default) {
                            // Extracting all the attribute keys.
                            var attrKeys = Object.keys(hierarchy[key]); // Looping through the extracted attribute keys.

                            attrKeys.forEach(function(attrKey) {
                                element.setAttribute(attrKey, hierarchy[key][attrKey]);
                            });
                        }

                        break;
                    }
                    // Parsing the dataset.

                case 'dataset':
                    {
                        if (hierarchy[key] !== options[key].default) {
                            // Appending values.
                            Object.assign(element.dataset, hierarchy[key]);
                        }

                        break;
                    }
                    // Parsing the text.

                case 'text':
                    {
                        if (hierarchy[key] !== options[key].default) {
                            // Assigning the text.
                            element.textContent = hierarchy[key];
                        }

                        break;
                    }
                    // Parsing the HTML.

                case 'html':
                    {
                        if (hierarchy[key] !== options[key].default) {
                            // Assigning the HTML.
                            element.innerHTML = hierarchy[key];
                        }

                        break;
                    }
                    // Parsing the child nodes.

                case 'children':
                    {
                        if (hierarchy[key] !== options[key].default) {
                            // Looping through the children of the hierarchy object.
                            hierarchy.children.forEach(function(child) {
                                // Creating an element given the name if the hierarchy object.
                                var childNode = document.createElement(child['name']); // Adding the temmefied element to its parent.

                                element.appendChild(childNode); // Temmefying all the sub children as well.

                                temmefy(child, childNode, ++depth, callback);
                            });
                        }

                        break;
                    }
            }
        };

        // Parsing all the values.
        for (var key in hierarchy) {
            _loop2(key);
        } // Executing the passed callback.


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


    function Temme() {
        var hierarchy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;
        var temmeCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function() {};
        var elementCallback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function(temmeId, currentHierarchy, depth) {};

        try {
            // Checking if the hierarchy object is valid.
            if (hierarchy == null || _typeof(hierarchy) !== 'object' || Array.isArray(hierarchy)) {
                throw new TemmeError('InvalidHierarchyError', 'The hierarchy object is invalid.');
            } // Checking if the target object is a valid HTML element.


            if (!(target instanceof HTMLElement)) {
                throw new TemmeError('InvalidTargetError', 'The target must be a valid HTML element.');
            } // Checking the hierarchy options for our own good.


            checkOptions(hierarchy, []); // Supervising the references.

            (function() {
                /**
                 *  Holds all elements with a reference in the hierarchy object.
                 */
                var references = []; // Getting all the references.

                getReferences(hierarchy, 0, references); // Processing all the references.

                processReferences(hierarchy, 0, references);
            })(); // Temme, go for it.


            temmefy(hierarchy, target, 0, elementCallback); // Execute the user's passed callback.

            temmeCallback();
        } catch (e) {
            // Appending a tag to the error message.
            e.message = "[Temme JS]: ".concat(e.message); // Throwing the error.

            throw e;
        }
    }

    if (typeof exports !== 'undefined') {
        module.exports = Temme;
    } else {
        obj.Temme = Temme;
    }
})(typeof window !== 'undefined' ? window : void 0);