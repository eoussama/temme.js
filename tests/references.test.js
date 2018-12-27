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
            target = document.createElement('div'),
            hierarchy = {
                ref: '@invalid-ref'
            };

        let errorName = "";

        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidReferenceOptionValueError");
    });

    test("“InvalidReferenceOptionValueError” error should be thrown if an object is referencing an invalid outer element.", () => {

        // Arrange.
        const
            target = document.createElement('div'),
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
        catch (e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidReferenceOptionValueError");
    });

    test("“InvalidReferenceError” error should be thrown if an object is referencing an invalid element.", () => {

        // Arrange.
        const
            target = document.createElement('div'),
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
        catch (e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidReferenceError");
    });

    test("“InvalidTemplateReferencingError” error should be thrown if a template is referencing a non-template hierarchy.", () => {

        // Arrange.
        const
            target = document.createElement('div'),
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
        catch (e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("InvalidTemplateReferencingError");
    });

    test("“ReferenceOutOfScopeError” error should be thrown if an object is referencing an element out of its scope.", () => {

        // Arrange.
        const
            target = document.createElement('div'),
            hierarchy = {
                from: {
                    ref: "out-of-scope"
                },
                childNodes: [
                    {
                        ref: 'out-of-scope'
                    }
                ]
            };

        let errorName = "";

        // Act.
        try {

            Temme.parse(hierarchy, target);
        }
        catch (e) {

            errorName = e.name;
        }

        // Assert.
        expect(errorName).toBe("ReferenceOutOfScopeError");
    });
});

describe('References.', () => {

    test("Referencing a template and inheriting it's classes.", () => {

        // Arrange.
        const 
            target = document.createElement('div'),
            hierarchy = {
                templates: [
                    {
                        ref: 'temp',
                        classes: ['red', 'bold']
                    }
                ],
                childNodes: [
                    {
                        from: {
                            ref: 'temp'
                        }
                    }
                ]
            };

        // Act.
        try {

            Temme.parse(hierarchy, target, (h) => {

                // Assert
                expect(h.childNodes[0].classes).toEqual(['bold', 'red']);
            });
        }
        catch(e) {

            console.error(e.name, e.message);
        }
    });
});
