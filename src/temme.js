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

    class Hierarchy {

        //#region Properties

        /**
         * The name of the HTML tag of the element.
         */
        name = 'div';

        /**
         * The id of the HTML element.
         */
        id = '';

        /**
         * The classes of the HTML element.
         */
        classes = [];

        /**
         * The attributes of the HTML element.
         */
        attributes = {};

        /**
         * The dataset of the HTML element.
         */
        dataset = {};

        /**
         * The text (textContent and innerText) of the HTML element.
         */
        text = '';

        /**
         * The HTML (innerHTML) of the HTML element.
         */
        html = '';

        /**
         * The child nodes of the HTML element.
         */
        children = [];

        //#endregion

        //#region Constructor

        /**
         * Parameterless constructor.
         */
        constructor() {

        }

        //#endregion
    }

    /**
     * The main function that does it all.
     * 
     * @param {*} hierarchy The hierarchy object that maps the HTML skeleton.
     * @param {*} target The HTML element that hosts the skeleton.
     */
    function Temme(hierarchy = new Hierarchy(), target = document.body) {
        try {

            // Checking if the hierarchy object is valid.
            if (!(hierarchy instanceof Hierarchy)) throw TypeError('The hierarchy object is invalid.');

            // Checking if the target object is a valid HTML element.
            if (!(target instanceof HTMLElement)) throw TypeError('The target must be a valid HTML element.');

            console.log(hierarchy.name);
            console.log(target);
        }
        catch(e) {
            e.message = `[Temme JS]: ${ e.message }`;
            throw e;
        }
    }

    if (typeof exports !== 'undefined') {
        module.exports = Temme;
        module.exports = Hierarchy;
	} else {
        obj.Temme = Temme;
        obj.Hierarchy = Hierarchy;
	}
})((typeof window !== 'undefined') ? window : this);
