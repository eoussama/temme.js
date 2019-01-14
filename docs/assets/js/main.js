/**
*
* @name:       temmejs
* @version:    1.0.1
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
    try {
        Temme.parse({
            childNodes: [
                {
                    name: 'header',
                    classes: ['row-container'],
                    childNodes: [
                        {
                            name: 'img',
                            classes: ['logo'],
                            attributes: {
                                src: 'assets/img/logo.svg'
                            }
                        },
                        {
                            name: 'h1',
                            content: {
                                value: 'Temme JS'
                            },
                            classes: ['title']
                        },
                        {
                            name: 'h4',
                            content: {
                                value: 'From JSON to HTML'
                            },
                            classes: ['subtitle']
                        },
                        {
                            classes: ['column-container'],
                            childNodes: [
                                {
                                    ref: 'github-btn',
                                    name: 'iframe',
                                    attributes: {
                                        frameborder: 0,
                                        height: '30px',
                                        scrolling: 0,
                                        src: 'https://ghbtns.com/github-btn.html?user=EOussama&repo=temmejs&type=star&size=large',
                                        width: '80px'
                                    }
                                },
                                {
                                    from: {
                                        ref: 'github-btn',
                                        mode: 'append'
                                    },
                                    attributes: {
                                        src: 'https://ghbtns.com/github-btn.html?user=EOussama&repo=temmejs&type=fork&size=large'
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'main',
                    childNodes: [
                        {
                            name: 'section',
                            childNodes: [
                                {
                                    name: 'h3',
                                    content: {
                                        value: 'Description'
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS, with no doubts, Emmet saved us from the headache of working with HTML and CSS, and now, it's about time Javascript had the same quirk too"
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        type: 'html',
                                        value: "A more in-depth documentation can be found <a href=\"https://github.com/EOussama/temmejs/wiki\">at the wiki</a>."
                                    }
                                }
                            ]
                        },
                        {
                            name: 'section',
                            childNodes: [
                                {
                                    name: 'h3',
                                    content: {
                                        value: 'How does it work?'
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "With Temme, manipulating the DOM, specifically creating simple to complex HTML skeletons has never been simpler."
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "With javascript objects as the blueprint and you as the engineer, you can produce skyscrapers even, you only need to provide a concise hierarchy for your HTML wonder and let Temme take care of the rest. In fact, this whole web page is completely generated using Temme."
                                    }
                                }
                            ]
                        },
                        {
                            name: 'section',
                            childNodes: [
                                {
                                    name: 'h3',
                                    content: {
                                        value: 'Syntax'
                                    }
                                },
                                {
                                    name: 'pre',
                                    childNodes: [
                                        {
                                            name: 'code',
                                            classes: ['javascript'],
                                            content: {
                                                value: snippets['js']['syntax-1']
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'p',
                                    content: {
                                        type: 'html',
                                        value: "Where <code>hierarchy</code> is a valid javascript object that represents your HTML skeleton, and <code>target</code> is a valid HTML element that will host the skeleton as its parent."
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        type: 'html',
                                        value: "<code>endCallback</code> is the optional function that's executed when Temme has done doing its thing, and <code>nodeCallback</code> is a function executed whenever a hierarchy object (or sub-object) has been parsed."
                                    }
                                }
                            ]
                        },
                        {
                            name: 'section',
                            childNodes: [
                                {
                                    name: 'h3',
                                    content: {
                                        value: 'Usage'
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "Like any other library, Temme is just as shy and needs to be invited to your project first."
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        type: 'html',
                                        value: "After adding the <code>temme.js</code> or <code>temme.min.js</code> to your source files, simply visualize an HTML skeleton in your head and describe it as a javascript object."
                                    }
                                },
                                {
                                    name: 'h4',
                                    content: {
                                        value: 'Example'
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "Let's take the following HTML snippet as a starting point:"
                                    }
                                },
                                {
                                    name: 'pre',
                                    childNodes: [
                                        {
                                            name: 'code',
                                            classes: ['html'],
                                            content: {
                                                value: snippets['html']['usage-1']
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'p',
                                    content: {
                                        type: 'html',
                                        value: "Say, we want to output the same as Emmet would if given the following instructions: <code>(h1.heading-1.bold>({Interesting title.}))+(hr)+(div.container>(p{Some random text}))+hr</code>"
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: 'Theoretically, that should output the following HTML skeleton:'
                                    }
                                },
                                {
                                    name: 'pre',
                                    childNodes: [
                                        {
                                            name: 'code',
                                            classes: ['html'],
                                            content: {
                                                value: snippets['html']['usage-2']
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "Temme's equivalence of that would be:"
                                    }
                                },
                                {
                                    name: 'pre',
                                    childNodes: [
                                        {
                                            name: 'code',
                                            classes: ['javascript'],
                                            content: {
                                                value: snippets['js']['usage-1']
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "Now that you've managed to describe the skeleton as a javascript object, simple tell Temme to do its thing."
                                    }
                                },
                                {
                                    name: 'pre',
                                    childNodes: [
                                        {
                                            name: 'code',
                                            classes: ['javascript'],
                                            content: {
                                                value: snippets['js']['usage-2']
                                            }
                                        }
                                    ]
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "And simply, just like that, the resulting HTML is the following:"
                                    }
                                },
                                {
                                    name: 'pre',
                                    childNodes: [
                                        {
                                            name: 'code',
                                            classes: ['html'],
                                            content: {
                                                value: snippets['html']['usage-3']
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            name: 'section',
                            childNodes: [
                                {
                                    name: 'h3',
                                    content: {
                                        value: 'Advantages'
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "You might have be wondering, yeah cool, but why though?"
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "Comparing both Temme's and Emmet's syntaxes, it's clearly apparent that Emmet blows Temme away in terms of swiftness, you just hit up short instructions in plain text, and then boom."
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        type: 'html',
                                        value: "Temme focuses on the data structure more, it's much better than manually working with <code>createElement</code> and prettier than direct HTML embed <code>innerHTML</code>."
                                    }
                                },
                                {
                                    name: 'p',
                                    content: {
                                        value: "One other strong point that Temme has going on is it being javascript-object oriented, meaning, it can easily be parsed into JSON and vice versa."
                                    }
                                }
                            ]
                        },
                    ]
                }
            ]
        }, target, () => {
            document.body.classList.remove('loader');
        });
    }
    catch (e) {
        console.error(e.name, e.message);
    }

    // Highlighting the code snippets.
    document.querySelectorAll('pre > code').forEach(block => {
        hljs.highlightBlock(block);
    });
});
