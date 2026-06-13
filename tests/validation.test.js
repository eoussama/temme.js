/**
 *
 * @name:       temmejs
 * @version:    1.0.6
 * @author:     EOussama
 * @license     MIT
 * @source:     https://github.com/EOussama/temmejs
 *
 * Everything that has to do with validation, from
 * data checks to value matching goes in here.
 */


const
  validator = require("../build/modules/validator");
const options = require("../build/modules/options").options;



describe("target checks.", () => {
  describe("invalid target.", () => {
    it("checking if invalid target (undefined) throws an error.", () => {
      // Assert.
      expect(validator.isValidHTMLElement(undefined)).toBe(false);
    });

    it("checking if invalid target (null) throws an error.", () => {
      // Assert.
      expect(validator.isValidHTMLElement(null)).toBe(false);
    });

    it("checking if invalid target (boolean) throws an error.", () => {
      // Assert.
      expect(validator.isValidHTMLElement(false)).toBe(false);
    });

    it("checking if invalid target (number) throws an error.", () => {
      // Assert.
      expect(validator.isValidHTMLElement(1634)).toBe(false);
    });

    it("checking if invalid target (string) throws an error.", () => {
      // Assert.
      expect(validator.isValidHTMLElement("fls")).toBe(false);
    });

    it("checking if invalid target (array) throws an error.", () => {
      // Assert.
      expect(validator.isValidHTMLElement([])).toBe(false);
    });

    it("checking if invalid target (object) throws an error.", () => {
      // Assert.
      expect(validator.isValidHTMLElement({})).toBe(false);
    });
  });

  describe("valid target.", () => {
    it("checking if valid target (HTML element) doesn't throw any error.", () => {
      // Arrange.
      const target = document.createElement("div");

      // Assert.
      expect(validator.isValidHTMLElement(target)).toBe(true);
    });
  });
});


describe("hierarchy checks.", () => {
  describe("invalid hierarchy.", () => {
    it("checking if invalid hierarchy (undefined) throws an error.", () => {
      // Assert.
      expect(validator.isValidHierarchy(undefined)).toBe(false);
    });

    it("checking if invalid hierarchy (null) throws an error.", () => {
      // Assert.
      expect(validator.isValidHierarchy(null)).toBe(false);
    });

    it("checking if invalid hierarchy (boolean) throws an error.", () => {
      // Assert.
      expect(validator.isValidHierarchy(false)).toBe(false);
    });

    it("checking if invalid hierarchy (number) throws an error.", () => {
      // Assert.
      expect(validator.isValidHierarchy(1634)).toBe(false);
    });

    it("checking if invalid hierarchy (string) throws an error.", () => {
      // Assert.
      expect(validator.isValidHierarchy("fls")).toBe(false);
    });

    it("checking if invalid hierarchy (array) throws an error.", () => {
      // Assert.
      expect(validator.isValidHierarchy([])).toBe(false);
    });
  });

  describe("valid hierarchy.", () => {
    it("checking if invalid hierarchy (object) doesn't throw any error.", () => {
      // Arrange.
      const hierarchy = {};

      // Assert.
      expect(validator.isValidHierarchy(hierarchy)).toBe(true);
    });
  });
});


describe("option checks.", () => {
  it("checking if all options are loaded.", () => {
    // Assert.
    expect(options.length).toBe(11);
  });

  it("“InvalidOptionNameError” should be thrown if the hierarchy object has an invalid option name.", () => {
    // Arrange.
    const hierarchy = { invalidOption: "some value" };
    let errorName = "";

    // Act.
    try {
      validator.validateOptions(hierarchy);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidOptionNameError");
  });

  it("“InvalidOptionTypeError” should be thrown if an option in the hierarchy object is of an incorrect type.", () => {
    // Arrange.
    const hierarchy = { name: [] };
    let errorName = "";

    // Act.
    try {
      validator.validateOptions(hierarchy);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidOptionTypeError");
  });

  it("“InvalidSubOptionValueError” should be thrown if a sub-option in the hierarchy object is of an incorrect value.", () => {
    // Arrange.
    const hierarchy = { content: { type: "invalid-content-type" } };
    let errorName = "";

    // Act.
    try {
      validator.validateOptions(hierarchy);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidSubOptionValueError");
  });

  it("“InvalidSubOptionNameError” should be thrown if a sub-option in the hierarchy is invalid.", () => {
    // Arrange.
    const hierarchy = {
      templates: [
        {
          ref: "temp-1",
          classes: ["red"],
        },
      ],
      childNodes: [
        {
          from: {
            ref: "temp-1",
            children: {
              "invalid-sub-option": false,
            },
          },
        },
      ],
    };
    let errorName = "";

    // Act.
    try {
      validator.validateOptions(hierarchy);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidSubOptionNameError");
  });

  it("“InvalidReferencingOptionError” should be thrown if the hierarchy object's “from” option doesn't have a “ref” sub-opotion.", () => {
    // Arrange.
    const hierarchy = { from: {} };
    let errorName = "";

    // Act.
    try {
      validator.validateOptions(hierarchy);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidReferencingOptionError");
  });

  it("“InvalidReferencingOptionError” should be thrown if both the “include” and “exclude” sub-options are used at the same time.", () => {
    // Arrange.
    const hierarchy = {
      from: {
        ref: "some-ref",
        include: [],
        exclude: [],
      },
    };
    let errorName = "";

    // Act.
    try {
      validator.validateOptions(hierarchy);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidReferencingOptionError");
  });
});


describe("template checks.", () => {
  it("“InvalidTemplateError” should be thrown if a template doesn't have a “ref” option.", () => {
    // Arrange.
    const template = { classes: ["red", "bold"] };
    let errorName = "";

    // Act.
    try {
      validator.validateTemplates(template);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidTemplateError");
  });

  it("“InvalidTemplateOptionError” should be thrown if a template has a forbidden option.", () => {
    // Arrange.
    const template = { classes: ["red", "bold"], name: "h1", ref: "temp-1" };
    let errorName = "";

    // Act.
    try {
      validator.validateTemplates(template);
    }
    catch (e) {
      errorName = e.name;
    }

    // Assert.
    expect(errorName).toBe("InvalidTemplateOptionError");
  });
});
