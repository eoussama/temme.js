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
             *  All the references in the hierarchy object.
             */

            var references = [];
            /**
             *  Gets all the references in the hierarchy object.
             * 
             *  @param {*} _hierarchy
             *  @param {*} depth
             */

            (function getReferences(_hierarchy, depth) {
                if ('ref' in _hierarchy) {
                    references.push({
                        ref: _hierarchy,
                        depth: depth
                    });
                } else {
                    if ('children' in _hierarchy) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = _hierarchy['children'][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var child = _step.value;
                                getReferences(child, ++depth);
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return != null) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }
            })(hierarchy, 0);
            /**
             *  Replaces all the references.
             * 
             *  @param {*} _hierarchy
             *  @param {*} depth
             */


            (function affectReferences(_hierarchy, depth) {
                var _loop = function _loop(key) {
                    switch (key) {
                        case 'ref':
                            {
                                break;
                            }
                            // Replacing the reference.

                        case 'from':
                            {
                                if ('from' in _hierarchy) {
                                    if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
                                        throw "The reference must be a string.";
                                    } else {
                                        var reference = references.filter(function(ref) {
                                            return ref.ref.ref === _hierarchy[key] && ref.depth <= depth;
                                        }).sort(function(refA, refB) {
                                            return refB.depth - refA.depth;
                                        })[0];

                                        if ('mode' in _hierarchy) {
                                            switch (_hierarchy['mode']) {
                                                case 'append':
                                                    {
                                                        var _loop2 = function _loop2(k) {
                                                            if (!['from', 'mode', 'ref', 'name'].includes(k)) {
                                                                if (Array.isArray(reference.ref[k])) {
                                                                    if (k in _hierarchy) {
                                                                        _hierarchy[k] = _toConsumableArray(_hierarchy[k]).concat(_toConsumableArray(reference.ref[k].filter(function(el) {
                                                                            return !_hierarchy[k].includes(el);
                                                                        })));
                                                                    } else {
                                                                        _hierarchy[k] = reference.ref[k];
                                                                    }
                                                                } else if (_typeof(reference.ref[k]) === 'object') {
                                                                    _hierarchy[k] = _hierarchy[k] || {};
                                                                    Object.assign(_hierarchy[k] || {}, reference.ref[k]);
                                                                } else {
                                                                    _hierarchy[k] = reference.ref[k];
                                                                }
                                                            }
                                                        };

                                                        for (var k in reference.ref) {
                                                            _loop2(k);
                                                        }

                                                        break;
                                                    }

                                                case 'override':
                                                    {
                                                        for (var k in reference.ref) {
                                                            if (!['from', 'mode', 'ref', 'name'].concat(_toConsumableArray(Object.keys(_hierarchy))).includes(k)) {
                                                                _hierarchy[k] = reference.ref[k];
                                                            }
                                                        }

                                                        break;
                                                    }

                                                default:
                                                    {
                                                        throw "\u201C".concat(_hierarchy['mode'], "\u201D is not a valid mode, must be either (\u201Cappend\u201D or \u201Coverride\u201D).");
                                                    }
                                            }
                                        } else {
                                            var _loop3 = function _loop3(_k) {
                                                if (!['from', 'mode', 'ref', 'name'].includes(_k)) {
                                                    if (Array.isArray(reference.ref[_k])) {
                                                        if (_k in _hierarchy) {
                                                            _hierarchy[_k] = _toConsumableArray(_hierarchy[_k]).concat(_toConsumableArray(reference.ref[_k].filter(function(el) {
                                                                return !_hierarchy[_k].includes(el);
                                                            })));
                                                        } else {
                                                            _hierarchy[_k] = reference.ref[_k];
                                                        }
                                                    } else if (_typeof(reference.ref[_k]) === 'object') {
                                                        _hierarchy[_k] = _hierarchy[_k] || {};
                                                        Object.assign(_hierarchy[_k] || {}, reference.ref[_k]);
                                                    } else {
                                                        _hierarchy[_k] = reference.ref[_k];
                                                    }
                                                }
                                            };

                                            for (var _k in reference.ref) {
                                                _loop3(_k);
                                            }
                                        }
                                    }
                                }

                                break;
                            }

                        case 'mode':
                            {
                                break;
                            }
                            // Looking fort references on child elements.

                        case 'children':
                            {
                                if ('children' in _hierarchy) {
                                    if (_hierarchy[key] == null || !Array.isArray(_hierarchy.children)) {
                                        throw "The element's children must be an array.";
                                    } else {
                                        _hierarchy.children.forEach(function(child) {
                                            affectReferences(child, ++depth);
                                        });
                                    }
                                }

                                break;
                            }
                    }
                };

                for (var key in _hierarchy) {
                    _loop(key);
                }
            })(hierarchy, 0);
            /**
             * Performs the Temme JS magic on a given element.
             * 
             * @param {*} _hierarchy 
             * @param {*} element
             */


            (function temmefy(_hierarchy, element) {
                for (var key in _hierarchy) {
                    switch (key) {
                        // Adding id to the element.
                        case 'id':
                            {
                                if ('id' in _hierarchy) {
                                    if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
                                        throw "The element's id must be a string.";
                                    } else {
                                        element.id = _hierarchy[key];
                                    }
                                }

                                break;
                            }
                            // Adding classes to the element.

                        case 'classes':
                            {
                                if ('classes' in _hierarchy) {
                                    if (_hierarchy[key] == null || !Array.isArray(_hierarchy[key])) {
                                        throw "The element's classes must be an array.";
                                    } else {
                                        element.classList = _toConsumableArray(element.classList).concat(_toConsumableArray(_hierarchy[key])).sort().join(' ');
                                    }
                                }

                                break;
                            }
                            // Adding attributes to the element.

                        case 'attributes':
                            {
                                if ('attributes' in _hierarchy) {
                                    if (_hierarchy[key] == null || !Array.isArray(_hierarchy[key])) {
                                        throw "The element's attributes must be an array.";
                                    } else {
                                        _hierarchy.attributes.forEach(function(attr) {
                                            if (attr == null || Array.isArray(attr) || _typeof(attr) !== 'object') {
                                                throw 'Attributes must be of type object.';
                                            } else {
                                                var attributeName = Object.keys(attr)[0];
                                                element.setAttribute(attributeName, attr[attributeName]);
                                            }
                                        });
                                    }
                                }

                                break;
                            }
                            // Adding data attributes to the element.

                        case 'data':
                            {
                                if ('data' in _hierarchy) {
                                    if (_hierarchy[key] == null || Array.isArray(_hierarchy[key]) || _typeof(_hierarchy[key]) !== 'object') {
                                        throw "The element's dataset must be an object.";
                                    } else {
                                        Object.assign(element.dataset, _hierarchy.data);
                                    }
                                }

                                break;
                            }
                            // Adding text to the element.

                        case 'text':
                            {
                                if ('text' in _hierarchy) {
                                    if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
                                        throw "The element's text must be a string.";
                                    } else {
                                        element.textContent = _hierarchy[key];
                                    }
                                }

                                break;
                            }
                            // Adding HTML to the element.

                        case 'html':
                            {
                                if ('html' in _hierarchy) {
                                    if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
                                        throw "The element's HTML must be a string.";
                                    } else {
                                        element.innerHTML = _hierarchy[key];
                                    }
                                }

                                break;
                            }
                            // Adding children to the element.

                        case 'children':
                            {
                                if ('children' in _hierarchy) {
                                    if (_hierarchy[key] == null || !Array.isArray(_hierarchy.children)) {
                                        throw "The element's children must be an array.";
                                    } else {
                                        _hierarchy.children.forEach(function(child) {
                                            var childNode = document.createElement(child['name']);
                                            temmefy(child, childNode);
                                            element.appendChild(childNode);
                                        });
                                    }
                                }

                                break;
                            }
                            // If it was none of the above options, 
                            // flag it as invalid.

                        default:
                            {
                                if (!['ref', 'from', 'mode', 'name'].includes(key)) {
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