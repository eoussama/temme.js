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

    Temme({
        children: [
            {
                name: 'h1',
                text: 'Heading',
                classes: ['heading-1', 'bold']
            },
            {
                name: 'h3',
                text: 'Subsssssss to pewdddddds'
            },
            {
                name: 'div',
                children: [
                    {
                        name: 'p',
                        'text': 'lorem ipsum'
                    }
                ]
            }
        ]
    }, target);
});