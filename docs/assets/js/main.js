/**
*
* @name:       temmejs
* @version:    0.1.0
* @author:     EOussama
* @license     MIT
* @source:     https://github.com/EOussama/temmejs
* 
* The main javascript file of the docs.
*
*/

"use strict";

window.addEventListener('load', async () => {
    const
        // The host element.
        target = document.getElementById('target'),
        // The snippets object.
        snippets = {
            html: {},
            js: {}
        };

    // Loading all the snippets.
    await fetch('assets/snippets/html/usage-1.txt').then(response => response.text()).then(snippet => snippets['html']['usage-1'] = snippet);
    await fetch('assets/snippets/html/usage-2.txt').then(response => response.text()).then(snippet => snippets['html']['usage-2'] = snippet);
    await fetch('assets/snippets/html/usage-3.txt').then(response => response.text()).then(snippet => snippets['html']['usage-3'] = snippet);
    await fetch('assets/snippets/js/syntax-1.txt').then(response => response.text()).then(snippet => snippets['js']['syntax-1'] = snippet);
    await fetch('assets/snippets/js/usage-1.txt').then(response => response.text()).then(snippet => snippets['js']['usage-1'] = snippet);
    await fetch('assets/snippets/js/usage-2.txt').then(response => response.text()).then(snippet => snippets['js']['usage-2'] = snippet);
        
    // Creating the DOM tree.
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
                        text: 'From JSON to HTML',
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
                    },
                    {
                        name: 'section',
                        children: [
                            {
                                name: 'h3',
                                text: 'Syntax'
                            },
                            {
                                name: 'pre',
                                children: [
                                    {
                                        name: 'code',
                                        classes: ['javascript'],
                                        text: snippets['js']['syntax-1']
                                    }
                                ]
                            },
                            {
                                name: 'p',
                                html: "Where <code>hierarchy</code> is a valid javascript object that represents your HTML skeleton, and <code>target</code> is a valid HTML element that will host the skeleton as its parent."
                            }
                        ]
                    },
                    {
                        name: 'section',
                        children: [
                            {
                                name: 'h3',
                                text: 'Usage'
                            },
                            {
                                name: 'p',
                                text: "Like any other library, Temme is just as shy and needs to be invited to your project first."
                            },
                            {
                                name: 'p',
                                html: "After adding the <code>temme.js</code> or <code>temme.min.js</code> to your source files, simply visualize an HTML skeleton in your head and describe it as a javascript object."
                            },
                            {
                                name: 'h4',
                                text: 'Example'
                            },
                            {
                                name: 'p',
                                text: "Let's take the following HTML snippet as a starting point:"
                            },
                            {
                                name: 'pre',
                                children: [
                                    {
                                        name: 'code',
                                        classes: ['html'],
                                        text: snippets['html']['usage-1']
                                    }
                                ]
                            },
                            {
                                name: 'p',
                                html: "Say, we want to output the same as Emmet would if given the following instructions: <code>(h1.heading-1.bold>({Interesting title.}))+(hr)+(div.container>(p{Some random text}))+hr</code>"
                            },
                            {
                                name: 'p',
                                text: 'Theoretically, that should output the following HTML skeleton:'
                            },
                            {
                                name: 'pre',
                                children: [
                                    {
                                        name: 'code',
                                        classes: ['html'],
                                        text: snippets['html']['usage-2']
                                    }
                                ]
                            },
                            {
                                name: 'p',
                                text: "Temme's equivalence of that would be:"
                            },
                            {
                                name: 'pre',
                                children: [
                                    {
                                        name: 'code',
                                        classes: ['javascript'],
                                        text: snippets['js']['usage-1']
                                    }
                                ]
                            },
                            {
                                name: 'p',
                                text: "Now that you've managed to describe the skeleton as a javascript object, simple tell Temme to do its thing."
                            },
                            {
                                name: 'pre',
                                children: [
                                    {
                                        name: 'code',
                                        classes: ['javascript'],
                                        text: snippets['js']['usage-2']
                                    }
                                ]
                            },
                            {
                                name: 'p',
                                text: "And simply, just like that, the resulting HTML is the following:"
                            },
                            {
                                name: 'pre',
                                children: [
                                    {
                                        name: 'code',
                                        classes: ['html'],
                                        text: snippets['html']['usage-3']
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }, target);

    // Highlighting the code snippets.
    document.querySelectorAll('pre > code').forEach(block => {
        hljs.highlightBlock(block);
    });
});
