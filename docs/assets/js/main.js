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
        classes: ['card', 'card-dark'],
        children: [
            {
                name: 'div',
                classes: ['card-header'],
                children: [
                    {
                        name: 'h2',
                        text: 'Card header',
                        classes: ['title', 'txt-gray', 'txt-bold'],
                        attributes: [
                            { contenteditable: true }
                        ]
                    }
                ]
            },
            {
                name: 'div',
                classes: ['card-body', 'container'],
                data: {
                    source: 'www.somelink.com',
                    id: 536
                },
                children: [
                    {
                        name: 'p',
                        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores aspernatur deserunt assumenda in officiis dolore, perspiciatis nam soluta iste odit?'
                    },
                    {
                        name: 'p',
                        html: 'Lorem ipsum <b>dolor sit amet consectetur <u>adipisicing</u></b> elit. Dolores aspernatur <span class="link">deserunt</span> assumenda in officiis dolore, <mark>perspiciatis</mark> nam soluta iste odit?'
                    },
                ]
            }
        ]
    }, target);
});