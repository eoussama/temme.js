/**
 *
 * @name:       temmejs
 * @version:    0.2.4
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
    function Temme() {
        var hierarchy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document.body;

        try {
            if (hierarchy == null || _typeof(hierarchy) !== 'object' || Array.isArray(hierarchy)) throw 'The hierarchy must be a valid object.';
            if (target == null || !(target instanceof HTMLElement)) throw 'The target must be a valid HTML element.';
            /**
             * Performs the Temme JS magic on a given element.
             * 
             * @param {*} hierarchy 
             * @param {*} element
             */

            (function temmefy(hierarchy, element) {
                for (var key in hierarchy) {
                    switch (key) {
                        // Adding id to the element.
                        case 'id':
                            {
                                if (hierarchy[key] == null || typeof hierarchy[key] !== 'string') {
                                    throw "The element's id must be a string.";
                                } else {
                                    element.id = hierarchy[key];
                                }

                                break;
                            }
                            // Adding classes to the element.

                        case 'classes':
                            {
                                if (hierarchy[key] == null || !Array.isArray(hierarchy[key])) {
                                    throw "The element's classes must be an array.";
                                } else {
                                    element.classList = _toConsumableArray(element.classList).concat(_toConsumableArray(hierarchy[key])).join(' ');
                                }

                                break;
                            }
                            // Adding attributes to the element.

                        case 'attributes':
                            {
                                if (hierarchy[key] == null || !Array.isArray(hierarchy[key])) {
                                    throw "The element's attributes must be an array.";
                                } else {
                                    hierarchy.attributes.forEach(function(attr) {
                                        if (attr == null || Array.isArray(attr) || _typeof(attr) !== 'object') {
                                            throw 'Attributes must be of type object.';
                                        } else {
                                            var attributeName = Object.keys(attr)[0];
                                            element.setAttribute(attributeName, attr[attributeName]);
                                        }
                                    });
                                }

                                break;
                            }
                            // Adding data attributes to the element.

                        case 'data':
                            {
                                if (hierarchy[key] == null || Array.isArray(hierarchy[key]) || _typeof(hierarchy[key]) !== 'object') {
                                    throw "The element's dataset must be an object.";
                                } else {
                                    Object.assign(element.dataset, hierarchy.data);
                                }

                                break;
                            }
                            // Adding text to the element.

                        case 'text':
                            {
                                if (hierarchy[key] == null || typeof hierarchy[key] !== 'string') {
                                    throw "The element's text must be a string.";
                                } else {
                                    element.textContent = hierarchy[key];
                                }

                                break;
                            }
                            // Adding HTML to the element.

                        case 'html':
                            {
                                if (hierarchy[key] == null || typeof hierarchy[key] !== 'string') {
                                    throw "The element's HTML must be a string.";
                                } else {
                                    element.innerHTML = hierarchy[key];
                                }

                                break;
                            }
                            // Adding children to the element.

                        case 'children':
                            {
                                if (hierarchy[key] == null || !Array.isArray(hierarchy.children)) {
                                    throw "The element's children must be an array.";
                                } else {
                                    hierarchy.children.forEach(function(child) {
                                        var childNode = document.createElement(child['name']);
                                        temmefy(child, childNode);
                                        element.appendChild(childNode);
                                    });
                                }

                                break;
                            }
                            // If it was none of the above options, 
                            // flag it as invalid.

                        default:
                            {
                                if (key !== 'name') {
                                    throw "\u201C".concat(key, "\u201D is an invalid option.");
                                }
                            }
                    }
                }
            })(hierarchy, target);
        } catch (e) {
            throw "[Temme JS]: ".concat(e);
        }
    }

    if (typeof exports !== 'undefined') {
        module.exports = Temme;
    } else {
        obj.Temme = Temme;
    }
})(typeof window !== 'undefined' ? window : void 0);