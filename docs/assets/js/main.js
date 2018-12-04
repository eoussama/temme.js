/**
*
* @name:       temmejs
* @version:    0.1.0
* @author:     EOussama
* @license     MIT
* @source:     https://github.com/EOussama/temmejs
* 
* The main javascript file of the app.
*
*/

"use strict";

window.addEventListener('load', () => {
    const target = document.getElementById('target');

    Temme(['ff'], target);
});