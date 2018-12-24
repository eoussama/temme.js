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

        test("Checking if valid target (HTML element) doesn't throw any error.", () => {

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
        expect(options.length).toBe(11);
    });

    test('“InvalidOptionNameError” should be thrown if the hierarchy object has an invalid option name.', () => {
        
        // Arrange.
        const hierarchy = { invalidOption: "some value" };
        let errorName = "";

        // Act.
        try {

            validator.validateOptions(hierarchy);
        }
        catch(e) {

            errorName = e.name;
        }
        
        // Assert.
        expect(errorName).toBe("InvalidOptionNameError");
    });

    test('“InvalidOptionTypeError” should be thrown if an option in the hierarchy object is of an incorrect type.', () => {
        
        // Arrange.
        const hierarchy = { name: [] };
        let errorName = "";

        // Act.
        try {

            validator.validateOptions(hierarchy);
        }
        catch(e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidOptionTypeError");
    });

    test('“InvalidSubOptionValueError” should be thrown if a sub-option in the hierarchy object is of an incorrect value.', () => {
        
        // Arrange.
        const hierarchy = { content: { type: 'invalid-content-type' } };
        let errorName = "";

        // Act.
        try {

            validator.validateOptions(hierarchy);
        }
        catch(e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidSubOptionValueError");
    });

    test('“InvalidSubOptionNameError” should be thrown if a sub-option in the hierarchy is invalid.', () => {
        
        // Arrange.
        const hierarchy = { 
            templates: [
                {
                    ref: 'temp-1',
                    classes: ['red']
                }
            ],
            childrenNodes: [
                {
                    from: {
                        ref: 'temp-1',
                        children: {
                            'invalid-sub-option': false
                        }
                    },
                }
            ]
        };
        let errorName = "";

        // Act.
        try {

            validator.validateOptions(hierarchy);
        }
        catch(e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidSubOptionNameError");
    });

    test("“InvalidReferencingOptionError” should be thrown if the hierarchy object's “from” option doesn't have a “ref” sub-opotion.", () => {
        
        // Arrange.
        const hierarchy = { from: {} };
        let errorName = "";

        // Act.
        try {

            validator.validateOptions(hierarchy);
        }
        catch(e) {

            errorName = e.name;
        }
        
        // Assert.
        expect(errorName).toBe("InvalidReferencingOptionError");
    });
});


describe('Template checks.', () => {

    test("“InvalidTemplateError” should be thrown if a template doesn't have a “ref” option.", () => {
        
        // Arrange.
        const template = { classes: ['red', 'bold'] };
        let errorName = "";

        // Act.
        try {

            validator.validateTemplates(template);
        }
        catch(e) {

            errorName = e.name;
        }
        
        // Assert.
        expect(errorName).toBe("InvalidTemplateError");
    });

    test('“InvalidTemplateOptionError” should be thrown if a template has a forbidden option.', () => {
        
        // Arrange.
        const template = { classes: ['red', 'bold'], name: 'h1', ref: 'temp-1' };
        let errorName = "";

        // Act.
        try {

            validator.validateTemplates(template);
        }
        catch(e) {

            errorName = e.name;
        }
        
        // Assert.
        expect(errorName).toBe("InvalidTemplateOptionError");
    });
});
