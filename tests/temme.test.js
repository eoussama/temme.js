/**
*
* @name:       temmejs
* @version:    0.2.3
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

/**
 * Tests against a passed heirarchy value.
 * 
 * @param {*} message The message of the test.
 * @param {*} value The value of the hierarchy to test.
 */
function testHierarchy(message, value) {
    test(message, () => {
        // Arrange.
        const
            target = document.createElement('div'),
            hierarchy = value;

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
}

/**
 * Tests against a passed target value.
 * 
 * @param {*} message The message of the test.
 * @param {*} value The value the target to test.
 */
function testTarget(message, value) {
    test(message, () => {
        // Arrange.
        const
            target = value,
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
}

describe('Passing invalid hierarchy', () => {
    testHierarchy('Passing invalid hierarchy object (null) should raise a warning.', null);
    testHierarchy('Passing invalid hierarchy object (array) should raise a warning.', []);
    testHierarchy('Passing invalid hierarchy object (string) should raise a warning.', 'some string');
    testHierarchy('Passing invalid hierarchy object (number) should raise a warning.', 26);
    testHierarchy('Passing invalid hierarchy object (boolean) should raise a warning.', true);
});

describe('Passing invalid values in the hierarchy object.', () => {
    testHierarchy('Passing an invalid id (not a string) should raise an error.', {
        id: 26
    });

    testHierarchy('Passing invalid classes (not an array) should raise an error.', {
        classes: 'not an array'
    });

    testHierarchy('Passing invalid attributes (not an array with objects as values) should raise an error.', {
        attributes: ["ss", 32, true, []]
    });

    testHierarchy('Passing invalid data (not an object) should raise an error.', {
        data: []
    });

    testHierarchy('Passing invalid text (not a string) should raise an error.', {
        text: {}
    });

    testHierarchy('Passing invalid HTML (not a string) should raise an error.', {
        html: true
    });

    testHierarchy('Passing invalid children (not an array) should raise an error.', {
        children: {}
    });

    testHierarchy('Passing invalid options should raise an error.', {
        invalidOption: 'some value'
    });
});

describe('Passing invalid target.', () => {
    testTarget('Passing invalid target (null) should raise a warning.', null);
    testTarget('Passing invalid target (non HTMLElement object) should raise a warning.', {});
    testTarget('Passing invalid target (array) should raise a warning.', []);
    testTarget('Passing invalid target (string) should raise a warning.', 'some string');
    testTarget('Passing invalid target (number) should raise a warning.', 15);
    testTarget('Passing invalid target (boolean) should raise a warning.', false);
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
