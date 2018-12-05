/**
*
* @name:       temmejs
* @version:    0.2.0
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
        (function temmefy (hierarchy, element) {
            for (let key in hierarchy) {
                switch(key) {

                    // Adding id to the element.
                    case 'id': {
                        element.id = hierarchy[key];
    
                        break;
                    }

                    // Adding classes to the element.
                    case 'classes': {
                        element.classList = [...element.classList, ...hierarchy[key]].join(' ');
    
                        break;
                    }

                    // Adding attributes to the element.
                    case 'attributes': {
                        hierarchy.attributes.forEach(attr => {
                            const attributeName = Object.keys(attr)[0];
    
                            element.setAttribute(attributeName, attr[attributeName]);
                        });
    
                        break;
                    }

                    // Adding data attributes to the element.
                    case 'data': {
                        Object.assign(element.dataset, hierarchy.data);
                        
                        break;
                    }

                    // Adding text to the element.
                    case 'text': {
                        element.textContent = hierarchy[key];

                        break;
                    }

                    // Adding HTML to the element.
                    case 'html': {
                        element.innerHTML = hierarchy[key];

                        break;
                    }

                    // Adding children to the element.
                    case 'children': {
                        hierarchy.children.forEach(child => {
                            const childNode = document.createElement(child['name']);

                            temmefy(child, childNode);
                            element.appendChild(childNode);
                        });

                        break;
                    }
                }
            }
        })(hierarchy, target);
    }
    catch (e) {
        throw `[Temme JS]: ${ e }`;
    }
 }
 
module.exports = Temme;
