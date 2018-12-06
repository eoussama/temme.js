/**
*
* @name:       temmejs
* @version:    0.2.2
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
            if (hierarchy == null || typeof hierarchy !== 'object' || Array.isArray(hierarchy)) throw `The hierarchy must be a valid object.`;
            if (target == null || !(target instanceof HTMLElement)) throw 'The target must be a valid HTML element.';

            /**
             * Performs the Temme JS magic on a given element.
             * 
             * @param {*} hierarchy 
             * @param {*} element
             */
            (function temmefy(hierarchy, element) {
                for (let key in hierarchy) {
                    switch (key) {

                        // Adding id to the element.
                        case 'id': {
                            if (hierarchy[key] == null || typeof hierarchy[key] !== 'string') {
                                throw "The element's id must be a string.";
                            } else {
                                element.id = hierarchy[key];
                            }

                            break;
                        }

                        // Adding classes to the element.
                        case 'classes': {
                            if (hierarchy[key] == null || !Array.isArray(hierarchy[key])) {
                                throw "The element's classes must be an array.";
                            } else {
                                element.classList = [...element.classList, ...hierarchy[key]].join(' ');
                            }
                            
                            break;
                        }

                        // Adding attributes to the element.
                        case 'attributes': {
                            if (hierarchy[key] == null || !Array.isArray(hierarchy[key])) {
                                throw "The element's attributes must be an array.";
                            } else {
                                hierarchy.attributes.forEach(attr => {
                                    if (attr == null || Array.isArray(attr) || typeof attr !== 'object') {
                                        throw 'Attributes must be of type object.';
                                    } else {
                                        const attributeName = Object.keys(attr)[0];
        
                                        element.setAttribute(attributeName, attr[attributeName]);
                                    }
                                });
                            }

                            break;
                        }

                        // Adding data attributes to the element.
                        case 'data': {
                            if (hierarchy[key] == null || Array.isArray(hierarchy[key]) || typeof hierarchy[key] !== 'object') {
                                throw "The element's dataset must be an object.";
                            } else {
                                Object.assign(element.dataset, hierarchy.data);
                            }

                            break;
                        }

                        // Adding text to the element.
                        case 'text': {
                            if (hierarchy[key] == null || typeof hierarchy[key] !== 'string') {
                                throw "The element's text must be a string.";
                            } else {
                                element.textContent = hierarchy[key];
                            }

                            break;
                        }

                        // Adding HTML to the element.
                        case 'html': {
                            if (hierarchy[key] == null || typeof hierarchy[key] !== 'string') {
                                throw "The element's HTML must be a string.";
                            } else {
                                element.innerHTML = hierarchy[key];
                            }

                            break;
                        }

                        // Adding children to the element.
                        case 'children': {
                            if (hierarchy[key] == null || !Array.isArray(hierarchy.children)) {
                                throw "The element's children must be an array.";
                            } else {
                                hierarchy.children.forEach(child => {
                                    const childNode = document.createElement(child['name']);
    
                                    temmefy(child, childNode);
                                    element.appendChild(childNode);
                                });    
                            }

                            break;
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
