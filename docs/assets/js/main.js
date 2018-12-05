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
                name: 'header',
                classes: ['row-container'],
                children: [
                    {
                        name: 'img',
                        classes: ['logo'],
                        attributes: [
                            { src: 'assets/img/logo.svg' }
                        ]
                    },
                    {
                        name: 'h1',
                        text: 'Temme JS',
                        classes: ['title']
                    },
                    {
                        name: 'h4',
                        text: 'From JSON to skeleton',
                        classes: ['subtitle']
                    }
                ]
            },
            {
                name: 'main'
            }
        ]
    }, target);

    console.log(target);
});
