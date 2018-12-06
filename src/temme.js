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

(function (obj) {
    function Temme(hierarchy = {}, target = document.body) {
        try {
            if (hierarchy == null || typeof hierarchy !== 'object' || Array.isArray(hierarchy)) throw 'The hierarchy must be a valid object.';
            if (target == null || !(target instanceof HTMLElement)) throw 'The target must be a valid HTML element.';

            /**
             *  All the references in the hierarchy object.
             */
            let references = [];

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
                        for (let child of _hierarchy['children']) {
                            getReferences(child, ++depth);
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
                for (let key in _hierarchy) {
                    switch (key) {
                        case 'ref': {
                            break;
                        }

                        // Replacing the reference.
                        case 'from': {
                            if ('from' in _hierarchy) {
                                if (_hierarchy[key] == null || typeof _hierarchy[key] !== 'string') {
                                    throw "The reference must be a string.";
                                } else {
                                    const reference = references
                                        .filter(ref => ref.ref.ref === _hierarchy[key] && ref.depth <= depth)
                                        .sort((refA, refB) => refB.depth - refA.depth)[0];

                                    if ('mode' in _hierarchy) {
                                        switch (_hierarchy['mode']) {
                                            case 'append': {
                                                console.log('Append');

                                                break;
                                            }

                                            case 'override': {
                                                console.log(reference.ref);
                                                for (let k in reference.ref) {
                                                    if (!['from', 'mode', 'ref', 'name', ...Object.keys(_hierarchy)].includes(k)) {
                                                        _hierarchy[k] = reference.ref[k];
                                                    }
                                                }

                                                break;
                                            }

                                            default: {
                                                throw `“${ _hierarchy['mode'] }” is not a valid mode, must be either (“append” or “override”).`;
                                            }
                                        }
                                    } else {
                                        console.log('Append');
                                    }
                                }
                            }

                            break;
                        }

                        case 'mode': {
                            break;
                        }

                        // Looking fort references on child elements.
                        case 'children': {
                            if ('children' in _hierarchy) {
                                if (_hierarchy[key] == null || !Array.isArray(_hierarchy.children)) {
                                    throw "The element's children must be an array.";
                                } else {
                                    _hierarchy.children.forEach(child => {
                                        affectReferences(child, ++depth);
                                    });
                                }
                            }
    
                            break;
                        }
                    }
                }
            })(hierarchy, 0);

            /**
             * Performs the Temme JS magic on a given element.
             * 
             * @param {*} _hierarchy 
             * @param {*} element
             */
            (function temmefy(_hierarchy, element) {
                for (let key in _hierarchy) {
                    switch (key) {

                        // Adding id to the element.
                        case 'id': {
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
                        case 'classes': {
                            if ('classes' in _hierarchy) {
                                if (_hierarchy[key] == null || !Array.isArray(_hierarchy[key])) {
                                    throw "The element's classes must be an array.";
                                } else {
                                    element.classList = [...element.classList, ..._hierarchy[key]].join(' ');
                                }
                            }

                            break;
                        }

                        // Adding attributes to the element.
                        case 'attributes': {
                            if ('attributes' in _hierarchy) {
                                if (_hierarchy[key] == null || !Array.isArray(_hierarchy[key])) {
                                    throw "The element's attributes must be an array.";
                                } else {
                                    _hierarchy.attributes.forEach(attr => {
                                        if (attr == null || Array.isArray(attr) || typeof attr !== 'object') {
                                            throw 'Attributes must be of type object.';
                                        } else {
                                            const attributeName = Object.keys(attr)[0];
    
                                            element.setAttribute(attributeName, attr[attributeName]);
                                        }
                                    });
                                }
                            }

                            break;
                        }

                        // Adding data attributes to the element.
                        case 'data': {
                            if ('data' in _hierarchy) {
                                if (_hierarchy[key] == null || Array.isArray(_hierarchy[key]) || typeof _hierarchy[key] !== 'object') {
                                    throw "The element's dataset must be an object.";
                                } else {
                                    Object.assign(element.dataset, _hierarchy.data);
                                }
                            }

                            break;
                        }

                        // Adding text to the element.
                        case 'text': {
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
                        case 'html': {
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
                        case 'children': {
                            if ('children' in _hierarchy) {
                                if (_hierarchy[key] == null || !Array.isArray(_hierarchy.children)) {
                                    throw "The element's children must be an array.";
                                } else {
                                    _hierarchy.children.forEach(child => {
                                        const childNode = document.createElement(child['name']);
    
                                        temmefy(child, childNode);
                                        element.appendChild(childNode);
                                    });
                                }
                            }

                            break;
                        }

                        // If it was none of the above options, 
                        // flag it as invalid.
                        default: {
                            if (!['ref', 'from', 'mode', 'name'].includes(key)) {
                                throw `“${key}” is an invalid option.`;
                            }
                        }
                    }
                }
            })(hierarchy, target);
        }
        catch (e) {
            throw `[Temme JS]: ${e}`;
        }
    }

    if (typeof exports !== 'undefined') {
        module.exports = Temme;
    } else {
        obj.Temme = Temme;
    }
})((typeof window !== 'undefined') ? window : this);
