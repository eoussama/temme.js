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
                name: 'main',
                children: [
                    {
                        name: 'section',
                        children: [
                            {
                                name: 'h3',
                                text: 'Description'
                            },
                            {
                                name: 'p',
                                text: "Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS, with no doubts, Emmet saved us from the headache of working with HTML and CSS, and now, it's time for Javascript too."
                            }
                        ]
                    },
                    {
                        name: 'section',
                        children: [
                            {
                                name: 'h3',
                                text: 'How does it work?'
                            },
                            {
                                name: 'p',
                                text: "With Temme, manipulating the DOM, specifically creating simple to complex HTML skeletons has never been simpler."
                            },
                            {
                                name: 'p',
                                text: "With javascript objects as the blueprint and you as the engineer, you can produce skyscrapers even, you only need to provide a concise hierarchy for your HTML wonder and let Temme take care of the rest. In fact, this whole web page is completely generated using Temme."
                            }
                        ]
                    }
                ]
            }
        ]
    }, target);

    console.log(target);
});
