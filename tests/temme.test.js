/**
 *
 * @name:       temmejs
 * @version:    1.0.1
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
            div = document.createElement('div'),
            h1 = document.createElement('h1');
        
        div.classList.add('red'),
        h1.classList.add('green', 'red'),
        
        result.appendChild(div);
        result.appendChild(h1);
        
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
            div = document.createElement('div'),
            h1 = document.createElement('h1');
        
        result.classList.add('yellow');
        div.classList.add('red', 'yellow'),
        h1.classList.add('green', 'red', 'yellow'),
        
        result.appendChild(div);
        result.appendChild(h1);
        
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

    test('Inheriting children.', () => {

        // Arrange.
        const
            target = document.createElement('div'),
            result = document.createElement('div'),
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
                        ref: 'ele',
                        from: {
                            ref: 'temp-3'
                        },
                        childNodes: [
                            {
                                name: 'span',
                                content: {
                                    value: 'Hello, world!'
                                }
                            }
                        ]
                    },
                    {
                        from: {
                            ref: 'ele',
                            children: {
                                allow: true
                            }
                        }
                    }
                ]
            };

        const 
            div1 = document.createElement('div'),
            div2 = document.createElement('div'),
            span1 = document.createElement('span'),
            span2 = document.createElement('span');
            
        span1.textContent = 'Hello, world!';
        span2.textContent = 'Hello, world!';
        
        div1.classList.add('bold', 'red');
        div1.dataset.id = 100;
        div1.setAttribute('visible', true);

        div2.classList.add('bold', 'red');
        div2.dataset.id = 100;
        div2.setAttribute('visible', true);

        div1.appendChild(span1);
        div2.appendChild(span2);
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

    test('Inheritance range (include).', () => {

        // Arrange.
        const
            target = document.createElement('div'),
            result = document.createElement('div'),
            hierarchy = {
                templates: [
                    {
                        ref: 'temp',
                        classes: ['red', 'yellow'],
                        attributes: { visible: true }
                    }
                ],
                from: {
                    ref: 'temp',
                    include: ['classes']
                }
            };

        result.classList.add('red', 'yellow');
        
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

    test('Inheritance range (exclude).', () => {

        // Arrange.
        const
            target = document.createElement('div'),
            result = document.createElement('div'),
            hierarchy = {
                templates: [
                    {
                        ref: 'temp',
                        classes: ['red', 'yellow'],
                        attributes: { visible: true }
                    }
                ],
                from: {
                    ref: 'temp',
                    exclude: ['classes']
                }
            };

        result.setAttribute('visible', true);
        
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
