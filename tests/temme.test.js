/**
*
* @name:       temmejs
* @version:    0.2.0
* @author:     EOussama
* @license     MIT
* @source:     https://github.com/EOussama/temmejs
* 
* Temme (or Emmet in reverse) is to javascript what Emmet is to HTML and CSS,
* with no doubts, Emmet saved us from the headache of working with HTML and CSS, 
* and now, Temme is doing Javascript the same favour too.
*
*/

const Temme = require('../src/temme');

describe('Passing invalid hierarchy', () => {
    test('Passing invalid hierarchy object (null) should raise a warning.', () => {
        // Arrange.
        const
            target = document.createElement('div'),
            hierarchy = null;

        let state = true;

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            state = false;
        }

        // Assert.
        expect(state).toBe(false);
    });

    test('Passing invalid hierarchy object (array) should raise a warning.', () => {
        // Arrange.
        const
            target = document.createElement('div'),
            hierarchy = [];

        let state = true;

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            state = false;
        }

        // Assert.
        expect(state).toBe(false);
    });

    test('Passing invalid hierarchy object (primitive) should raise a warning.', () => {
        // Arrange.
        const
            target = document.createElement('div'),
            hierarchy = 'some string';

        let state = true;

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            state = false;
        }

        // Assert.
        expect(state).toBe(false);
    });
});

describe('Passing invalid target', () => {
    test('Passing invalid target (null) should raise a warning.', () => {
        // Arrange.
        const
            target = null,
            hierarchy = {};

        let state = true;

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            state = false;
        }

        // Assert.
        expect(state).toBe(false);
    });

    test('Passing invalid target (non HTMLElement object) should raise a warning.', () => {
        // Arrange.
        const
            target = {},
            hierarchy = {};

        let state = true;

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            state = false;
        }

        // Assert.
        expect(state).toBe(false);
    });

    test('Passing invalid target (array) should raise a warning.', () => {
        // Arrange.
        const
            target = [],
            hierarchy = {};

        let state = true;

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            state = false;
        }

        // Assert.
        expect(state).toBe(false);
    });

    test('Passing invalid target (primitive) should raise a warning.', () => {
        // Arrange.
        const
            target = 'some string',
            hierarchy = {};

        let state = true;

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            state = false;
        }

        // Assert.
        expect(state).toBe(false);
    });
});

describe('Passing valid arguments.', () => {
    test('Passing an empty hierarchy object should leave the target as it is.', () => {
        // Arrange.
        const
            result = document.createElement('div'),
            target = document.createElement('div'),
            hierarchy = {};

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {

        }

        // Assert.
        expect(target).toEqual(result);
    });

    test('Altering the parent element.', () => {
        // Arrange.
        const
            result = document.createElement('h1'),
            target = document.createElement('h1'),
            hierarchy = {
                id: 'some-id',
                classes: ['bold', 'heading-1', 'title'],
                text: 'This is an interesting heading.'
            };

        result.id = 'some-id';
        result.classList.add('bold', 'heading-1', 'title');
        result.textContent = 'This is an interesting heading.';

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {

        }

        // Assert.
        expect(target).toEqual(result);
    });

    test('Appending children.', () => {
        // Arrange.
        const
            result = document.createElement('div'),
            div = document.createElement('div'),
            h1 = document.createElement('h1'),
            target = document.createElement('div'),
            hierarchy = {
                children: [
                    {
                        name: 'div',
                        children: [
                            {
                                name: 'h1',
                                html: 'Temme <span class="subtitle">JS</span>'
                            }
                        ]
                    }
                ]
            };

        result.appendChild(div);
        div.appendChild(h1);
        h1.innerHTML = 'Temme <span class="subtitle">JS</span>';

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {

        }

        // Assert.
        expect(target).toEqual(result);
    });
});
