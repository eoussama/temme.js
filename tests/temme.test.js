/**
 *
 * @name:       temmejs
 * @version:    1.0.0
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/temmejs
 * 
 * All real-world applications testing can be found here.
 */


const Temme = require('../build/temme');


describe('Parsing simple hierarchies.', () => {

    test('Parsing a span child with some classes.', () => {

        // Arrange.
        const
            target = document.createElement('div'),
            result = document.createElement('div'),
            span = document.createElement('span'),
            hierarchy = {
                childNodes: [
                    {
                        name: 'span',
                        classes: ['red', 'blue']
                    }
                ]
            };

        span.classList.add('blue', 'red');
        result.appendChild(span);
        
        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            console.log(e.name, e.message);
        }

        // Assert.
        expect(target).toEqual(result);
    });

    test('Parsing multiple children.', () => {

        // Arrange.
        const
            target = document.createElement('div'),
            result = document.createElement('div'),
            hierarchy = {
                childNodes: [
                    {
                        childNodes: [
                            {

                            }
                        ]
                    },
                    {

                    }
                ]
            };

        const
            div1 = document.createElement('div'),
            div2 = document.createElement('div'),
            div3 = document.createElement('div');

        
        div1.appendChild(div2);
        result.appendChild(div1);
        result.appendChild(div3);
        
        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            console.log(e.name, e.message);
        }

        // Assert.
        expect(target).toEqual(result);
    });
});

describe('Element to element reference.', () => {

    test('Children on the same depth level reference.', () => {

        // Arrange.
        const 
            target = document.createElement('div'),
            result = document.createElement('div'),
            hierarchy = {
                childNodes: [
                    {
                        ref: 'ele-1',
                        classes: ['red']
                    },
                    {
                        name: 'h1',
                        from: {
                            ref: 'ele-1'
                        },
                        classes: ['green']
                    }
                ]
            };

        const 
            div1 = document.createElement('div'),
            div2 = document.createElement('div');
        
        div1.classList.add('red'),
        div2.classList.add('green', 'red'),
        
        result.appendChild(div1);
        result.appendChild(div2);
        
        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            console.log(e.name, e.message);
        }

        // Assert.
        expect(target).toEqual(result);
    });

    test('Multi-depth children reference.', () => {

        // Arrange.
        const 
            target = document.createElement('div'),
            result = document.createElement('div'),
            hierarchy = {
                ref: 'ele-1',
                classes: ['yellow'],
                childNodes: [
                    {
                        ref: 'ele-2',
                        classes: ['red'],
                        from: {
                            ref: 'ele-1'
                        }
                    },
                    {
                        name: 'h1',
                        from: {
                            ref: 'ele-2'
                        },
                        classes: ['green']
                    }
                ]
            };

        const 
            div1 = document.createElement('div'),
            div2 = document.createElement('div');
        
        result.classList.add('yellow');
        div1.classList.add('red', 'yellow'),
        div2.classList.add('green', 'red', 'yellow'),
        
        result.appendChild(div1);
        result.appendChild(div2);
        
        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            console.log(e.name, e.message);
        }

        // Assert.
        expect(target).toEqual(result);
    });
});

describe('Template to element reference.', () => {

    test('Templates on the same depth level reference.', () => {

        // Arrange.
        const
            target = document.createElement('div'),
            result = document.createElement('div'),
            button = document.createElement('button'),
            hierarchy = {
                childNodes: [
                    {
                        templates: [
                            {
                                ref: 'temp-1',
                                classes: ['red']
                            }
                        ],
                        name: 'button',
                        from: {
                            ref: 'temp-1'
                        }
                    }
                ]
            };

        button.classList.add('red');
        result.appendChild(button);
        
        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            console.log(e.name, e.message);
        }

        // Assert.
        expect(target).toEqual(result);
    });

    test('Multi-depth template reference.', () => {

        // Arrange.
        const
            target = document.createElement('div'),
            result = document.createElement('div'),
            button = document.createElement('button'),
            hierarchy = {
                templates: [
                    {
                        ref: 'temp-1',
                        attributes: { visible: true }
                    }
                ],
                childNodes: [
                    {
                        templates: [
                            {
                                ref: 'temp-2',
                                classes: ['red'],
                                from: {
                                    ref: 'temp-1'
                                }
                            },
                            {
                                ref: 'temp-3',
                                classes: ['bold'],
                                dataset: { id: 100 },
                                from: {
                                    ref: 'temp-2'
                                }
                            }
                        ],
                        name: 'button',
                        from: {
                            ref: 'temp-3'
                        }
                    }
                ]
            };

        button.classList.add('bold', 'red');
        button.dataset.id = 100;
        button.setAttribute('visible', true);
        result.appendChild(button);
        
        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            console.log(e.name, e.message);
        }

        // Assert.
        expect(target).toEqual(result);
    });
});
