/**
*
* @name:       temmejs
* @version:    1.0.0
* @author:     EOussama
* @license     MIT
* @source:     https://github.com/EOussama/temmejs
* 
* Everything that has to do with validation, from
* data checks to value matching goes in here.
*
*/


const validator = require('../build/modules/validator');
const options = require('../build/modules/options').options;


describe('Target checks.', () => {

    describe('Invalid target.', () => {

        test('Checking if invalid target (undefined) throws an error.', () => {

            // Assert.
            expect(validator.isValidHTMLElement(undefined)).toBe(false);
        });

        test('Checking if invalid target (null) throws an error.', () => {

            // Assert.
            expect(validator.isValidHTMLElement(null)).toBe(false);
        });

        test('Checking if invalid target (boolean) throws an error.', () => {

            // Assert.
            expect(validator.isValidHTMLElement(false)).toBe(false);
        });

        test('Checking if invalid target (number) throws an error.', () => {

            // Assert.
            expect(validator.isValidHTMLElement(1634)).toBe(false);
        });

        test('Checking if invalid target (string) throws an error.', () => {

            // Assert.
            expect(validator.isValidHTMLElement('fls')).toBe(false);
        });

        test('Checking if invalid target (array) throws an error.', () => {

            // Assert.
            expect(validator.isValidHTMLElement([])).toBe(false);
        });

        test('Checking if invalid target (object) throws an error.', () => {

            // Assert.
            expect(validator.isValidHTMLElement({})).toBe(false);
        });
    });

    describe('Valid target.', () => {
        test("Checking if invalid target (HTML element) doesn't throw any error.", () => {

            // Arrange.
            const target = document.createElement('div');

            // Assert.
            expect(validator.isValidHTMLElement(target)).toBe(true);
        });
    });
});


describe('Hierarchy checks.', () => {

    describe('Invalid hierarchy.', () => {

        test('Checking if invalid hierarchy (undefined) throws an error.', () => {

            // Assert.
            expect(validator.isValidHierarchy(undefined)).toBe(false);
        });

        test('Checking if invalid hierarchy (null) throws an error.', () => {

            // Assert.
            expect(validator.isValidHierarchy(null)).toBe(false);
        });

        test('Checking if invalid hierarchy (boolean) throws an error.', () => {

            // Assert.
            expect(validator.isValidHierarchy(false)).toBe(false);
        });

        test('Checking if invalid hierarchy (number) throws an error.', () => {

            // Assert.
            expect(validator.isValidHierarchy(1634)).toBe(false);
        });

        test('Checking if invalid hierarchy (string) throws an error.', () => {

            // Assert.
            expect(validator.isValidHierarchy('fls')).toBe(false);
        });

        test('Checking if invalid hierarchy (array) throws an error.', () => {

            // Assert.
            expect(validator.isValidHierarchy([])).toBe(false);
        });
    });

    describe('Valid hierarchy.', () => {
        test("Checking if invalid hierarchy (object) doesn't throw any error.", () => {

            // Arrange.
            const hierarchy = {};

            // Assert.
            expect(validator.isValidHierarchy(hierarchy)).toBe(true);
        });
    });
});


describe('Option checks.', () => {

    test('Checking if all options are loaded.', () => {

        // Assert.
        expect(options.length).toBe(12);
    });
});
