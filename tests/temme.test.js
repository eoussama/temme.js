/**
*
* @name:       temmejs
* @version:    0.3.0
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
 * @param {String} message The message of the test.
 * @param {Object} value The value of the hierarchy to test.
 * @param {String} errorType The expected error.
 */
function testHierarchyParams(message, value, errorType) {
    test(message, () => {

        // Arrange.
        const
            target = document.createElement('div'),
            hierarchy = value;

        let errorName = '';

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe(errorType);
    });
}

/**
 * Tests against a passed target value.
 * 
 * @param {String} message The message of the test.
 * @param {Object} value The value the target to test.
 * @param {String} errorType The expected error.
 */
function testTarget(message, value, errorType) {
    test(message, () => {

        // Arrange.
        const
            target = value,
            hierarchy = {};

        let errorName = '';

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {
            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe(errorType);
    });
}

describe('Passing invalid hierarchy.', () => {
    testHierarchyParams('Passing invalid hierarchy object (null) should throw a InvalidHierarchyError error.', 'null', 'InvalidHierarchyError');
    testHierarchyParams('Passing invalid hierarchy object (array) should throw a InvalidHierarchyError error.', [], 'InvalidHierarchyError');
    testHierarchyParams('Passing invalid hierarchy object (string) should throw a InvalidHierarchyError error.', 'some string', 'InvalidHierarchyError');
    testHierarchyParams('Passing invalid hierarchy object (number) should throw a InvalidHierarchyError error.', 26, 'InvalidHierarchyError');
    testHierarchyParams('Passing invalid hierarchy object (boolean) should throw a InvalidHierarchyError error.', true, 'InvalidHierarchyError');
});

describe('Passing invalid values in the hierarchy object.', () => {
    testHierarchyParams('Passing an invalid id (not a string) should throw a InvalidOptionTypeError.', {
        id: 26
    }, 'InvalidOptionTypeError');

    testHierarchyParams('Passing invalid classes (not an array) should throw a InvalidOptionTypeError.', {
        classes: 'not an array'
    }, 'InvalidOptionTypeError');

    testHierarchyParams('Passing invalid attributes (not an objects as values) should throw a InvalidOptionTypeError.', {
        attributes: []
    }, 'InvalidOptionTypeError');

    testHierarchyParams('Passing invalid dataset (not an object) should throw a InvalidOptionTypeError.', {
        dataset: []
    }, 'InvalidOptionTypeError');

    testHierarchyParams('Passing invalid text (not a string) should throw a InvalidOptionTypeError.', {
        text: {}
    }, 'InvalidOptionTypeError');

    testHierarchyParams('Passing invalid HTML (not a string) should throw a InvalidOptionTypeError.', {
        html: true
    }, 'InvalidOptionTypeError');

    testHierarchyParams('Passing invalid children (not an array) should throw a InvalidOptionTypeError.', {
        children: {}
    }, 'InvalidOptionTypeError');

    testHierarchyParams('Passing invalid options should raise an InvalidOptionNameError.', {
        invalidOption: false
    }, 'InvalidOptionNameError');
});

describe('Passing invalid target.', () => {
    testTarget('Passing invalid target (null) should raise an InvalidTargetError.', null, 'InvalidTargetError');
    testTarget('Passing invalid target (non HTMLElement object) should raise an InvalidTargetError.', {}, 'InvalidTargetError');
    testTarget('Passing invalid target (array) should raise an InvalidTargetError.', [], 'InvalidTargetError');
    testTarget('Passing invalid target (string) should raise an InvalidTargetError.', 'some string', 'InvalidTargetError');
    testTarget('Passing invalid target (number) should raise an InvalidTargetError.', 15, 'InvalidTargetError');
    testTarget('Passing invalid target (boolean) should raise an InvalidTargetError.', false, 'InvalidTargetError');
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
            console.log(e.name, e.message);
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
/*
describe('References.', () => {
    test('Referencing a direct parent.', () => {
        // Arrange.
        const
            result = document.createElement('div'),
            div = document.createElement('div'),
            target = document.createElement('div'),
            hierarchy = {
                ref: 'ref-1',
                classes: ['red', 'blue'],
                children: [
                    {
                        from: {
                            ref: 'ref-1'
                        }
                    }
                ]
            };

        result.classList.add('blue', 'red');
        div.classList.add('blue', 'red');
        result.appendChild(div);

        // Act.
        try {
            Temme(hierarchy, target);
        }
        catch (e) {

        }

        // Assert.
        expect(target).toEqual(result);
    });
});*/
