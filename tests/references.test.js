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


const Temme = require('../build/temme');


describe('Validating references.', () => {
    
    test('“ref” options whose values start with an “@” symbol should throw the error “InvalidReferenceOptionValueError”.', () => {

        // Arrange.
        const 
            target =  document.createElement('div'),
            hierarchy = {
                ref: '@invalid-ref'
            };

        let errorName = "";

        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch(e) {
            
            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidReferenceOptionValueError");
    });

    test("“InvalidReferenceOptionValueError” error should be thrown if an object is referencing an invalid outer element.", () => {

        // Arrange.
        const 
            target =  document.createElement('div'),
            hierarchy = {
                from: {
                    ref: '@#some-id'
                }
            };

        let errorName = "";

        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch(e) {
            
            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidReferenceOptionValueError");
    });

    test("“InvalidReferenceError” error should be thrown if an object is referencing an invalid element.", () => {

        // Arrange.
        const 
            target =  document.createElement('div'),
            hierarchy = {
                from: {
                    ref: 'some-invalid-id'
                }
            };

        let errorName = "";

        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch(e) {
            
            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidReferenceError");
    });
    
    test("“InvalidTemplateReferencingError” error should be thrown if a template is referencing a non-template hierarchy.", () => {

        // Arrange.
        const 
            target =  document.createElement('div'),
            hierarchy = {
                ref: 'some-ref',
                childNodes: [
                    {
                        templates: [
                            {
                                ref: 'temp',
                                from: {
                                   ref: "some-ref"
                                }
                            }
                        ]
                    }
                ]
            };

        let errorName = "";

        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch(e) {
            
            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidTemplateReferencingError");
    });
});
