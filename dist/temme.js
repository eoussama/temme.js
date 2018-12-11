var Temme =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/temme.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/modules/errors/InvalidHierarchyError.ts":
/*!*****************************************************!*\
  !*** ./src/modules/errors/InvalidHierarchyError.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_TemmyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/TemmyError */ "./src/modules/models/TemmyError.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var InvalidHierarchyError = (function (_super) {
    __extends(InvalidHierarchyError, _super);
    function InvalidHierarchyError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "InvalidHierarchyError";
        _this.message = "The hierarchy object is not valid";
        _this.message = message.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidHierarchyError;
}(_models_TemmyError__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (InvalidHierarchyError);


/***/ }),

/***/ "./src/modules/errors/InvalidTargetError.ts":
/*!**************************************************!*\
  !*** ./src/modules/errors/InvalidTargetError.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_TemmyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/TemmyError */ "./src/modules/models/TemmyError.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var InvalidTargetError = (function (_super) {
    __extends(InvalidTargetError, _super);
    function InvalidTargetError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = "InvalidTargetError";
        _this.message = "The target is not a valid HTML element";
        _this.message = message.length > 0 ? message : _this.message;
        return _this;
    }
    return InvalidTargetError;
}(_models_TemmyError__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (InvalidTargetError);


/***/ }),

/***/ "./src/modules/models/Option.ts":
/*!**************************************!*\
  !*** ./src/modules/models/Option.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Option = (function () {
    function Option(name, type, defaultValue, values) {
        var _this = this;
        this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        this.name = name;
        this.type = type;
        this.default = defaultValue;
        this.values = values;
    }
    return Option;
}());
/* harmony default export */ __webpack_exports__["default"] = (Option);


/***/ }),

/***/ "./src/modules/models/TemmyError.ts":
/*!******************************************!*\
  !*** ./src/modules/models/TemmyError.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var TemmyError = (function (_super) {
    __extends(TemmyError, _super);
    function TemmyError(message) {
        var _this = _super.call(this) || this;
        _this.name = 'TemmyError';
        _this.message = "Temme isn't feeling good";
        _this.message = message.length > 0 ? message : _this.message;
        return _this;
    }
    return TemmyError;
}(Error));
/* harmony default export */ __webpack_exports__["default"] = (TemmyError);


/***/ }),

/***/ "./src/modules/options.ts":
/*!********************************!*\
  !*** ./src/modules/options.ts ***!
  \********************************/
/*! exports provided: options */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony import */ var _options_RefOption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./options/RefOption */ "./src/modules/options/RefOption.ts");
/* harmony import */ var _options_NameOption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options/NameOption */ "./src/modules/options/NameOption.ts");
/* harmony import */ var _options_IdOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./options/IdOption */ "./src/modules/options/IdOption.ts");
/* harmony import */ var _options_TextOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./options/TextOption */ "./src/modules/options/TextOption.ts");
/* harmony import */ var _options_HtmlOption__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./options/HtmlOption */ "./src/modules/options/HtmlOption.ts");
/* harmony import */ var _options_TemmeIdsOption__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./options/TemmeIdsOption */ "./src/modules/options/TemmeIdsOption.ts");
/* harmony import */ var _options_TemplatesOption__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options/TemplatesOption */ "./src/modules/options/TemplatesOption.ts");
/* harmony import */ var _options_ClassesOption__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./options/ClassesOption */ "./src/modules/options/ClassesOption.ts");
/* harmony import */ var _options_ChildrenOption__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./options/ChildrenOption */ "./src/modules/options/ChildrenOption.ts");
/* harmony import */ var _options_AttributesOption__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./options/AttributesOption */ "./src/modules/options/AttributesOption.ts");
/* harmony import */ var _options_DatasetOption__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./options/DatasetOption */ "./src/modules/options/DatasetOption.ts");
/* harmony import */ var _options_FromOption__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./options/FromOption */ "./src/modules/options/FromOption.ts");












var options = [
    new _options_RefOption__WEBPACK_IMPORTED_MODULE_0__["default"](),
    new _options_NameOption__WEBPACK_IMPORTED_MODULE_1__["default"](),
    new _options_IdOption__WEBPACK_IMPORTED_MODULE_2__["default"](),
    new _options_TextOption__WEBPACK_IMPORTED_MODULE_3__["default"](),
    new _options_HtmlOption__WEBPACK_IMPORTED_MODULE_4__["default"](),
    new _options_TemmeIdsOption__WEBPACK_IMPORTED_MODULE_5__["default"](),
    new _options_TemplatesOption__WEBPACK_IMPORTED_MODULE_6__["default"](),
    new _options_ClassesOption__WEBPACK_IMPORTED_MODULE_7__["default"](),
    new _options_ChildrenOption__WEBPACK_IMPORTED_MODULE_8__["default"](),
    new _options_AttributesOption__WEBPACK_IMPORTED_MODULE_9__["default"](),
    new _options_DatasetOption__WEBPACK_IMPORTED_MODULE_10__["default"](),
    new _options_FromOption__WEBPACK_IMPORTED_MODULE_11__["default"]()
];


/***/ }),

/***/ "./src/modules/options/AttributesOption.ts":
/*!*************************************************!*\
  !*** ./src/modules/options/AttributesOption.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var AttributesOption = (function (_super) {
    __extends(AttributesOption, _super);
    function AttributesOption() {
        var _this = _super.call(this, 'attributes', 'object', {}, []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return AttributesOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (AttributesOption);


/***/ }),

/***/ "./src/modules/options/ChildrenOption.ts":
/*!***********************************************!*\
  !*** ./src/modules/options/ChildrenOption.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ChildrenOption = (function (_super) {
    __extends(ChildrenOption, _super);
    function ChildrenOption() {
        var _this = _super.call(this, 'children', 'array', [], []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return ChildrenOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ChildrenOption);


/***/ }),

/***/ "./src/modules/options/ClassesOption.ts":
/*!**********************************************!*\
  !*** ./src/modules/options/ClassesOption.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ClassesOption = (function (_super) {
    __extends(ClassesOption, _super);
    function ClassesOption() {
        var _this = _super.call(this, 'classes', 'array', [], []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return ClassesOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ClassesOption);


/***/ }),

/***/ "./src/modules/options/DatasetOption.ts":
/*!**********************************************!*\
  !*** ./src/modules/options/DatasetOption.ts ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var DatasetOption = (function (_super) {
    __extends(DatasetOption, _super);
    function DatasetOption() {
        var _this = _super.call(this, 'dataset', 'object', {}, []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return DatasetOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (DatasetOption);


/***/ }),

/***/ "./src/modules/options/FromOption.ts":
/*!*******************************************!*\
  !*** ./src/modules/options/FromOption.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
/* harmony import */ var _RefOption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RefOption */ "./src/modules/options/RefOption.ts");
/* harmony import */ var _sub_options_ModeSubOption__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sub-options/ModeSubOption */ "./src/modules/options/sub-options/ModeSubOption.ts");
/* harmony import */ var _sub_options_ChildrenSubOption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sub-options/ChildrenSubOption */ "./src/modules/options/sub-options/ChildrenSubOption.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var FromOption = (function (_super) {
    __extends(FromOption, _super);
    function FromOption() {
        var _this = _super.call(this, 'from', 'object', '', []) || this;
        _this.keys = new FromKeys();
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return FromOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (FromOption);
var FromKeys = (function () {
    function FromKeys() {
        this.ref = new _RefOption__WEBPACK_IMPORTED_MODULE_1__["default"]();
        this.mode = new _sub_options_ModeSubOption__WEBPACK_IMPORTED_MODULE_2__["default"]();
        this.children = new _sub_options_ChildrenSubOption__WEBPACK_IMPORTED_MODULE_3__["default"]();
    }
    return FromKeys;
}());


/***/ }),

/***/ "./src/modules/options/HtmlOption.ts":
/*!*******************************************!*\
  !*** ./src/modules/options/HtmlOption.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var HtmlOption = (function (_super) {
    __extends(HtmlOption, _super);
    function HtmlOption() {
        var _this = _super.call(this, 'html', 'string', '', []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return HtmlOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (HtmlOption);


/***/ }),

/***/ "./src/modules/options/IdOption.ts":
/*!*****************************************!*\
  !*** ./src/modules/options/IdOption.ts ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var IdOption = (function (_super) {
    __extends(IdOption, _super);
    function IdOption() {
        var _this = _super.call(this, 'id', 'string', '', []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return IdOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (IdOption);


/***/ }),

/***/ "./src/modules/options/NameOption.ts":
/*!*******************************************!*\
  !*** ./src/modules/options/NameOption.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NameOption = (function (_super) {
    __extends(NameOption, _super);
    function NameOption() {
        var _this = _super.call(this, 'name', 'string', 'div', []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return NameOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (NameOption);


/***/ }),

/***/ "./src/modules/options/RefOption.ts":
/*!******************************************!*\
  !*** ./src/modules/options/RefOption.ts ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var RefOption = (function (_super) {
    __extends(RefOption, _super);
    function RefOption() {
        var _this = _super.call(this, 'ref', 'string', '', []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return RefOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (RefOption);


/***/ }),

/***/ "./src/modules/options/TemmeIdsOption.ts":
/*!***********************************************!*\
  !*** ./src/modules/options/TemmeIdsOption.ts ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TemmeIdsOption = (function (_super) {
    __extends(TemmeIdsOption, _super);
    function TemmeIdsOption() {
        var _this = _super.call(this, 'temmeIds', 'array', [], []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return TemmeIdsOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (TemmeIdsOption);


/***/ }),

/***/ "./src/modules/options/TemplatesOption.ts":
/*!************************************************!*\
  !*** ./src/modules/options/TemplatesOption.ts ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TemplatesOption = (function (_super) {
    __extends(TemplatesOption, _super);
    function TemplatesOption() {
        var _this = _super.call(this, 'templates', 'array', [], []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return TemplatesOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (TemplatesOption);


/***/ }),

/***/ "./src/modules/options/TextOption.ts":
/*!*******************************************!*\
  !*** ./src/modules/options/TextOption.ts ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TextOption = (function (_super) {
    __extends(TextOption, _super);
    function TextOption() {
        var _this = _super.call(this, 'text', 'string', '', []) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return TextOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (TextOption);


/***/ }),

/***/ "./src/modules/options/sub-options/ChildrenSubOption.ts":
/*!**************************************************************!*\
  !*** ./src/modules/options/sub-options/ChildrenSubOption.ts ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Option */ "./src/modules/models/Option.ts");
/* harmony import */ var _PlacementSubOption__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PlacementSubOption */ "./src/modules/options/sub-options/PlacementSubOption.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ChildrenSubOption = (function (_super) {
    __extends(ChildrenSubOption, _super);
    function ChildrenSubOption() {
        var _this = _super.call(this, 'children', 'object', '', []) || this;
        _this.keys = new ChildrenKeys();
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return ChildrenSubOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ChildrenSubOption);
var ChildrenKeys = (function () {
    function ChildrenKeys() {
        this.allow = false;
        this.placement = new _PlacementSubOption__WEBPACK_IMPORTED_MODULE_1__["default"]();
    }
    return ChildrenKeys;
}());


/***/ }),

/***/ "./src/modules/options/sub-options/ModeSubOption.ts":
/*!**********************************************************!*\
  !*** ./src/modules/options/sub-options/ModeSubOption.ts ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ModeSubOption = (function (_super) {
    __extends(ModeSubOption, _super);
    function ModeSubOption() {
        var _this = _super.call(this, 'mode', 'string', 'append', ['append', 'override']) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return ModeSubOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (ModeSubOption);


/***/ }),

/***/ "./src/modules/options/sub-options/PlacementSubOption.ts":
/*!***************************************************************!*\
  !*** ./src/modules/options/sub-options/PlacementSubOption.ts ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _models_Option__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../models/Option */ "./src/modules/models/Option.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var PlacementSubOption = (function (_super) {
    __extends(PlacementSubOption, _super);
    function PlacementSubOption() {
        var _this = _super.call(this, 'placement', 'string', 'after', ['after', 'before']) || this;
        _this.isValid = function () { return _this.name != null && typeof _this.name == _this.type; };
        return _this;
    }
    return PlacementSubOption;
}(_models_Option__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (PlacementSubOption);


/***/ }),

/***/ "./src/modules/validator.ts":
/*!**********************************!*\
  !*** ./src/modules/validator.ts ***!
  \**********************************/
/*! exports provided: isValidHierarchy, isValidHTMLElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidHierarchy", function() { return isValidHierarchy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidHTMLElement", function() { return isValidHTMLElement; });
var isValidHierarchy = function (hierarchy) { return hierarchy != null && typeof hierarchy === 'object' && !Array.isArray(hierarchy); };
var isValidHTMLElement = function (target) { return target != null && target instanceof HTMLElement; };


/***/ }),

/***/ "./src/temme.ts":
/*!**********************!*\
  !*** ./src/temme.ts ***!
  \**********************/
/*! exports provided: parse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony import */ var _modules_validator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/validator */ "./src/modules/validator.ts");
/* harmony import */ var _modules_options__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/options */ "./src/modules/options.ts");
/* harmony import */ var _modules_errors_InvalidHierarchyError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/errors/InvalidHierarchyError */ "./src/modules/errors/InvalidHierarchyError.ts");
/* harmony import */ var _modules_errors_InvalidTargetError__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/errors/InvalidTargetError */ "./src/modules/errors/InvalidTargetError.ts");




function parse(hierarchy, target, endBallback, nodeCallback) {
    console.log(_modules_options__WEBPACK_IMPORTED_MODULE_1__["options"]);
    try {
        if (!_modules_validator__WEBPACK_IMPORTED_MODULE_0__["isValidHTMLElement"](target)) {
            throw new _modules_errors_InvalidTargetError__WEBPACK_IMPORTED_MODULE_3__["default"]("");
        }
        if (!_modules_validator__WEBPACK_IMPORTED_MODULE_0__["isValidHierarchy"](hierarchy)) {
            throw new _modules_errors_InvalidHierarchyError__WEBPACK_IMPORTED_MODULE_2__["default"]("");
        }
        endBallback();
    }
    catch (e) {
        e.message = "[Temme]: " + e.message + ".";
        throw e;
    }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UZW1tZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9lcnJvcnMvSW52YWxpZEhpZXJhcmNoeUVycm9yLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL2Vycm9ycy9JbnZhbGlkVGFyZ2V0RXJyb3IudHMiLCJ3ZWJwYWNrOi8vVGVtbWUvc3JjL0Q6L3NjcmlwdGluZy9UeXBlc2NyaXB0L3RlbW1lanMvc3JjL21vZHVsZXMvbW9kZWxzL09wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9tb2RlbHMvVGVtbXlFcnJvci50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL29wdGlvbnMvQXR0cmlidXRlc09wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zL0NoaWxkcmVuT3B0aW9uLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL29wdGlvbnMvQ2xhc3Nlc09wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zL0RhdGFzZXRPcHRpb24udHMiLCJ3ZWJwYWNrOi8vVGVtbWUvc3JjL0Q6L3NjcmlwdGluZy9UeXBlc2NyaXB0L3RlbW1lanMvc3JjL21vZHVsZXMvb3B0aW9ucy9Gcm9tT3B0aW9uLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL29wdGlvbnMvSHRtbE9wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zL0lkT3B0aW9uLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL29wdGlvbnMvTmFtZU9wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zL1JlZk9wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zL1RlbW1lSWRzT3B0aW9uLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL29wdGlvbnMvVGVtcGxhdGVzT3B0aW9uLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL29wdGlvbnMvVGV4dE9wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zL3N1Yi1vcHRpb25zL0NoaWxkcmVuU3ViT3B0aW9uLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvVHlwZXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL29wdGlvbnMvc3ViLW9wdGlvbnMvTW9kZVN1Yk9wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9vcHRpb25zL3N1Yi1vcHRpb25zL1BsYWNlbWVudFN1Yk9wdGlvbi50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL1R5cGVzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy92YWxpZGF0b3IudHMiLCJ3ZWJwYWNrOi8vVGVtbWUvc3JjL0Q6L3NjcmlwdGluZy9UeXBlc2NyaXB0L3RlbW1lanMvc3JjL3RlbW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUU4QztBQUc5QztJQUFtRCx5Q0FBVTtJQWlCekQsK0JBQVksT0FBZTtRQUEzQixZQUdJLGtCQUFNLE9BQU8sQ0FBQyxTQUlqQjtRQW5CTSxVQUFJLEdBQVcsdUJBQXVCLENBQUM7UUFLdkMsYUFBTyxHQUFXLG1DQUFtQyxD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QUFPLENBQUMsU0FBUyxDQUFDLEVBQS9FLENBQStFLENBQUM7QUFRNUksSUFBTSxrQkFBa0IsR0FBRyxVQUFDLE1BQW1CLElBQWMsYUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLFlBQVksV0FBVyxFQUEvQyxDQUErQyxDQUFDOzs7Ozs7Ozs7Ozs7O0FDTnBIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFpRDtBQUNMO0FBRStCO0FBQ047QUFXOUQsU0FBUyxLQUFLLENBQUMsU0FBb0IsRUFBRSxNQUFtQixFQUFFLFdBQXFCLEVBQUUsWUFBaUY7SUFDckssT0FBTyxDQUFDLEdBQUcsQ0FBQyx3REFBTyxDQUFDLENBQUM7SUFDckIsSUFBSTtRQUlBLElBQUksQ0FBQyxxRUFBNEIsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUN2QyxNQUFNLElBQUksMEVBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEM7UUFJRCxJQUFJLENBQUMsbUVBQTBCLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDeEMsTUFBTSxJQUFJLDZFQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3ZDO1FBR0QsV0FBVyxFQUFFLENBQUM7S0FDakI7SUFDRCxPQUFPLENBQUMsRUFBRTtRQUdPLENBQUUsQ0FBQyxPQUFPLEdBQUcsY0FBWSxDQUFDLENBQUMsT0FBTyxNQUFHLENBQUM7UUFHbkQsTUFBTSxDQUFDLENBQUM7S0FDWDtBQUNMLENBQUMiLCJmaWxlIjoidGVtbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy90ZW1tZS50c1wiKTtcbiIsIi8qKlxyXG4gKiBUaGUgZXJyb3IgdGhyb3cgd2hlbiBhIGhpZXJhcmNoeSBvYmplY3RcclxuICogaXMgbm90IHZhbGlkLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgVGVtbXlFcnJvciBmcm9tIFwiLi4vbW9kZWxzL1RlbW15RXJyb3JcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkSGllcmFyY2h5RXJyb3IgZXh0ZW5kcyBUZW1teUVycm9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvci5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiSW52YWxpZEhpZXJhcmNoeUVycm9yXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIlRoZSBoaWVyYXJjaHkgb2JqZWN0IGlzIG5vdCB2YWxpZFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igd2l0aCBwYXJhbWV0ZXJzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBDYWxsaW5nIHRoZSBwYXJlbnQgY2xhc3MgYEVycm9yYC5cclxuICAgICAgICBzdXBlcihtZXNzYWdlKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRpbmcgdGhlIGVycm9yJ3MgbWVzc2FnZS5cclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlLmxlbmd0aCA+IDAgPyBtZXNzYWdlIDogdGhpcy5tZXNzYWdlO1xyXG4gICAgfVxyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGUgZXJyb3IgdGhyb3cgd2hlbiBhIHRhcmdldCBpcyBub3QgYSB2YWxpZFxyXG4gKiBIVE1MIGVsZW1lbnQuXHJcbiAqL1xyXG5cclxuaW1wb3J0IFRlbW15RXJyb3IgZnJvbSBcIi4uL21vZGVscy9UZW1teUVycm9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkVGFyZ2V0RXJyb3IgZXh0ZW5kcyBUZW1teUVycm9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvci5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiSW52YWxpZFRhcmdldEVycm9yXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIlRoZSB0YXJnZXQgaXMgbm90IGEgdmFsaWQgSFRNTCBlbGVtZW50XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciB3aXRoIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9mIHRoZSBlcnJvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIENhbGxpbmcgdGhlIHBhcmVudCBjbGFzcyBgRXJyb3JgLlxyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGluZyB0aGUgZXJyb3IncyBtZXNzYWdlLlxyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UubGVuZ3RoID4gMCA/IG1lc3NhZ2UgOiB0aGlzLm1lc3NhZ2U7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSBoaWVyYXJjaHkncyBvcHRpb24gbW9kZWwuXHJcbiAqIFdoYXQgZGVmaW5lcyBhIHZhbGlkIG9wdGlvbi5cclxuICovXHJcblxyXG5pbnRlcmZhY2UgSU9wdGlvbiB7XHJcblxyXG4gICAgbmFtZTogc3RyaW5nO1xyXG4gICAgdHlwZTogc3RyaW5nO1xyXG4gICAgZGVmYXVsdDogYW55O1xyXG4gICAgdmFsdWVzOiBBcnJheTxhbnk+O1xyXG5cclxuICAgIGlzVmFsaWQoKTogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWJzdHJhY3QgY2xhc3MgT3B0aW9uIGltcGxlbWVudHMgSU9wdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRhdGEgdHlwZSBvZiB0aGUgb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgdHlwZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIGRlZmF1bHQ6IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBwb3NzaWJsZSB2YWx1ZXMgb2YgdGhlIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHZhbHVlczogQXJyYXk8YW55PjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yIHdpdGggcGFyYW1ldGVycy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG5hbWUgVGhlIG5hbWUgb2YgdGhlIG9wdGlvbi5cclxuICAgICAqIEBwYXJhbSB0eXBlIFRoZSBkYXRhIHR5cGUgb2YgdGhlIG9wdGlvbi5cclxuICAgICAqIEBwYXJhbSBkZWZhdWx0VmFsdWUgVGhlIGRlZmF1bHQgdmFsdWUgb2YgdGhlIG9wdGlvbi5cclxuICAgICAqIEBwYXJhbSB2YWx1ZXMgVGhlIHBvc3NpYmxlIHZhbHVlcyBvZiB0aGUgb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHR5cGU6IHN0cmluZywgZGVmYXVsdFZhbHVlOiBhbnksIHZhbHVlczogQXJyYXk8YW55Pikge1xyXG5cclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XHJcbiAgICAgICAgdGhpcy5kZWZhdWx0ID0gZGVmYXVsdFZhbHVlO1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGFic3RyYWN0IGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG4iLCIvKipcclxuICogVGVtbWUncyBlcnJvciBpbnRlcmZhY2UuXHJcbiAqL1xyXG5pbnRlcmZhY2UgSVRlbW15RXJyb3Ige1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLlxyXG4gICAgICovXHJcbiAgICByZWFkb25seSBuYW1lOiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIG1lc3NhZ2U6IHN0cmluZztcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBUZW1tZSdzIGN1c3RvbSBlcnJvcnMuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1teUVycm9yIGV4dGVuZHMgRXJyb3IgaW1wbGVtZW50cyBJVGVtbXlFcnJvciB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyByZWFkb25seSBuYW1lOiBzdHJpbmcgPSAnVGVtbXlFcnJvcic7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIlRlbW1lIGlzbid0IGZlZWxpbmcgZ29vZFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29uc3RydWN0b3Igd2l0aCBwYXJhbWV0ZXJzLlxyXG4gICAgICogXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZSBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZykge1xyXG5cclxuICAgICAgICAvLyBDYWxsaW5nIHRoZSBwYXJlbnQgY2xhc3MgYEVycm9yYC5cclxuICAgICAgICBzdXBlcigpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGluZyB0aGUgZXJyb3IncyBtZXNzYWdlLlxyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UubGVuZ3RoID4gMCA/IG1lc3NhZ2UgOiB0aGlzLm1lc3NhZ2U7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSBsaXN0IG9mIHN1cHBvcnRlZCBvcHRpb25zLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuL21vZGVscy9PcHRpb25cIjtcclxuaW1wb3J0IFJlZk9wdGlvbiBmcm9tIFwiLi9vcHRpb25zL1JlZk9wdGlvblwiO1xyXG5pbXBvcnQgTmFtZU9wdGlvbiBmcm9tIFwiLi9vcHRpb25zL05hbWVPcHRpb25cIjtcclxuaW1wb3J0IElkT3B0aW9uIGZyb20gXCIuL29wdGlvbnMvSWRPcHRpb25cIjtcclxuaW1wb3J0IFRleHRPcHRpb24gZnJvbSBcIi4vb3B0aW9ucy9UZXh0T3B0aW9uXCI7XHJcbmltcG9ydCBIdG1sT3B0aW9uIGZyb20gXCIuL29wdGlvbnMvSHRtbE9wdGlvblwiO1xyXG5pbXBvcnQgVGVtbWVJZHNPcHRpb24gZnJvbSBcIi4vb3B0aW9ucy9UZW1tZUlkc09wdGlvblwiO1xyXG5pbXBvcnQgVGVtcGxhdGVzT3B0aW9uIGZyb20gXCIuL29wdGlvbnMvVGVtcGxhdGVzT3B0aW9uXCI7XHJcbmltcG9ydCBDbGFzc2VzT3B0aW9uIGZyb20gXCIuL29wdGlvbnMvQ2xhc3Nlc09wdGlvblwiO1xyXG5pbXBvcnQgQ2hpbGRyZW5PcHRpb24gZnJvbSBcIi4vb3B0aW9ucy9DaGlsZHJlbk9wdGlvblwiO1xyXG5pbXBvcnQgQXR0cmlidXRlc09wdGlvbiBmcm9tIFwiLi9vcHRpb25zL0F0dHJpYnV0ZXNPcHRpb25cIjtcclxuaW1wb3J0IERhdGFzZXRPcHRpb24gZnJvbSBcIi4vb3B0aW9ucy9EYXRhc2V0T3B0aW9uXCI7XHJcbmltcG9ydCBGcm9tT3B0aW9uIGZyb20gXCIuL29wdGlvbnMvRnJvbU9wdGlvblwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IG9wdGlvbnM6IEFycmF5PE9wdGlvbj4gPSBbXHJcbiAgICBuZXcgUmVmT3B0aW9uKCksXHJcbiAgICBuZXcgTmFtZU9wdGlvbigpLFxyXG4gICAgbmV3IElkT3B0aW9uKCksXHJcbiAgICBuZXcgVGV4dE9wdGlvbigpLFxyXG4gICAgbmV3IEh0bWxPcHRpb24oKSxcclxuICAgIG5ldyBUZW1tZUlkc09wdGlvbigpLFxyXG4gICAgbmV3IFRlbXBsYXRlc09wdGlvbigpLFxyXG4gICAgbmV3IENsYXNzZXNPcHRpb24oKSxcclxuICAgIG5ldyBDaGlsZHJlbk9wdGlvbigpLFxyXG4gICAgbmV3IEF0dHJpYnV0ZXNPcHRpb24oKSxcclxuICAgIG5ldyBEYXRhc2V0T3B0aW9uKCksXHJcbiAgICBuZXcgRnJvbU9wdGlvbigpXHJcbl07XHJcbiIsIi8qKlxyXG4gKiBUaGUgYXR0cmlidXRlcyBvcHRpb24gbW9kZWwuXHJcbiAqL1xyXG5cclxuXHJcbmltcG9ydCBPcHRpb24gZnJvbSBcIi4uL21vZGVscy9PcHRpb25cIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBdHRyaWJ1dGVzT3B0aW9uIGV4dGVuZHMgT3B0aW9uIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcmFtZXRlcmxlc3MgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICBzdXBlcignYXR0cmlidXRlcycsICdvYmplY3QnLCB7fSwgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG4iLCIvKipcclxuICogVGhlIGNoaWxkcmVuIG9wdGlvbiBtb2RlbC5cclxuICovXHJcblxyXG5cclxuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi4vbW9kZWxzL09wdGlvblwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoaWxkcmVuT3B0aW9uIGV4dGVuZHMgT3B0aW9uIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcmFtZXRlcmxlc3MgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICBzdXBlcignY2hpbGRyZW4nLCAnYXJyYXknLCBbXSwgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG4iLCIvKipcclxuICogVGhlIGNsYXNzZXMgb3B0aW9uIG1vZGVsLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLi9tb2RlbHMvT3B0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xhc3Nlc09wdGlvbiBleHRlbmRzIE9wdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJhbWV0ZXJsZXNzIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoJ2NsYXNzZXMnLCAnYXJyYXknLCBbXSwgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG4iLCIvKipcclxuICogVGhlIGRhdGFzZXQgb3B0aW9uIG1vZGVsLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLi9tb2RlbHMvT3B0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRGF0YXNldE9wdGlvbiBleHRlbmRzIE9wdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJhbWV0ZXJsZXNzIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoJ2RhdGFzZXQnLCAnb2JqZWN0Jywge30sIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgb3B0aW9uIGlzIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBpc1ZhbGlkID0gKCk6IGJvb2xlYW4gPT4gdGhpcy5uYW1lICE9IG51bGwgJiYgdHlwZW9mIHRoaXMubmFtZSA9PSB0aGlzLnR5cGU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSBmcm9tIG9wdGlvbiBtb2RlbC5cclxuICovXHJcblxyXG5cclxuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi4vbW9kZWxzL09wdGlvblwiO1xyXG5pbXBvcnQgUmVmT3B0aW9uIGZyb20gXCIuL1JlZk9wdGlvblwiO1xyXG5pbXBvcnQgTW9kZVN1Yk9wdGlvbiBmcm9tIFwiLi9zdWItb3B0aW9ucy9Nb2RlU3ViT3B0aW9uXCI7XHJcbmltcG9ydCBDaGlsZHJlblN1Yk9wdGlvbiBmcm9tIFwiLi9zdWItb3B0aW9ucy9DaGlsZHJlblN1Yk9wdGlvblwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEZyb21PcHRpb24gZXh0ZW5kcyBPcHRpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN1YiBrZXlzIG9mIHRoZSBgZnJvbWAgb3B0aW9uLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMga2V5czogRnJvbUtleXMgPSBuZXcgRnJvbUtleXMoKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcmFtZXRlcmxlc3MgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICBzdXBlcignZnJvbScsICdvYmplY3QnLCAnJywgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG5cclxuXHJcbmNsYXNzIEZyb21LZXlzIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSByZWZlcmVuY2Ugc3ViIG9wdGlvbi5cclxuICAgICAqL1xyXG4gICAgcHVibGljIHJlZjogUmVmT3B0aW9uID0gbmV3IFJlZk9wdGlvbigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGluaGVyaXRhbmNlIG1vZGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtb2RlOiBNb2RlU3ViT3B0aW9uID0gbmV3IE1vZGVTdWJPcHRpb24oKTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBpbmhlcml0YW5jZSBtb2RlLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgY2hpbGRyZW46IENoaWxkcmVuU3ViT3B0aW9uID0gbmV3IENoaWxkcmVuU3ViT3B0aW9uKCk7XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSBIVE1MIG9wdGlvbiBtb2RlbC5cclxuICovXHJcblxyXG5cclxuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi4vbW9kZWxzL09wdGlvblwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEh0bWxPcHRpb24gZXh0ZW5kcyBPcHRpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyYW1ldGVybGVzcyBjb25zdHJ1Y3Rvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCdodG1sJywgJ3N0cmluZycsICcnLCBbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIG9wdGlvbiBpcyB2YWxpZC5cclxuICAgICAqL1xyXG4gICAgaXNWYWxpZCA9ICgpOiBib29sZWFuID0+IHRoaXMubmFtZSAhPSBudWxsICYmIHR5cGVvZiB0aGlzLm5hbWUgPT0gdGhpcy50eXBlO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGUgSUQgb3B0aW9uIG1vZGVsLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLi9tb2RlbHMvT3B0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSWRPcHRpb24gZXh0ZW5kcyBPcHRpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyYW1ldGVybGVzcyBjb25zdHJ1Y3Rvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCdpZCcsICdzdHJpbmcnLCAnJywgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG4iLCIvKipcclxuICogVGhlIG5hbWUgb3B0aW9uIG1vZGVsLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLi9tb2RlbHMvT3B0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTmFtZU9wdGlvbiBleHRlbmRzIE9wdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJhbWV0ZXJsZXNzIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoJ25hbWUnLCAnc3RyaW5nJywgJ2RpdicsIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgb3B0aW9uIGlzIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBpc1ZhbGlkID0gKCk6IGJvb2xlYW4gPT4gdGhpcy5uYW1lICE9IG51bGwgJiYgdHlwZW9mIHRoaXMubmFtZSA9PSB0aGlzLnR5cGU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSByZWZlcmVuY2Ugb3B0aW9uIG1vZGVsLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLi9tb2RlbHMvT3B0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVmT3B0aW9uIGV4dGVuZHMgT3B0aW9uIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcmFtZXRlcmxlc3MgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICBzdXBlcigncmVmJywgJ3N0cmluZycsICcnLCBbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIG9wdGlvbiBpcyB2YWxpZC5cclxuICAgICAqL1xyXG4gICAgaXNWYWxpZCA9ICgpOiBib29sZWFuID0+IHRoaXMubmFtZSAhPSBudWxsICYmIHR5cGVvZiB0aGlzLm5hbWUgPT0gdGhpcy50eXBlO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBUaGUgcmVmZXJlbmNlIG9wdGlvbiBtb2RlbC5cclxuICovXHJcblxyXG5cclxuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi4vbW9kZWxzL09wdGlvblwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRlbW1lSWRzT3B0aW9uIGV4dGVuZHMgT3B0aW9uIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFBhcmFtZXRlcmxlc3MgY29uc3RydWN0b3IuXHJcbiAgICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG5cclxuICAgICAgICBzdXBlcigndGVtbWVJZHMnLCAnYXJyYXknLCBbXSwgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG4iLCIvKipcclxuICogVGhlIHRlbXBsYXRlcyBvcHRpb24gbW9kZWwuXHJcbiAqL1xyXG5cclxuXHJcbmltcG9ydCBPcHRpb24gZnJvbSBcIi4uL21vZGVscy9PcHRpb25cIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZW1wbGF0ZXNPcHRpb24gZXh0ZW5kcyBPcHRpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyYW1ldGVybGVzcyBjb25zdHJ1Y3Rvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCd0ZW1wbGF0ZXMnLCAnYXJyYXknLCBbXSwgW10pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRoZSBvcHRpb24gaXMgdmFsaWQuXHJcbiAgICAgKi9cclxuICAgIGlzVmFsaWQgPSAoKTogYm9vbGVhbiA9PiB0aGlzLm5hbWUgIT0gbnVsbCAmJiB0eXBlb2YgdGhpcy5uYW1lID09IHRoaXMudHlwZTtcclxufVxyXG4iLCIvKipcclxuICogVGhlIHRleHQgb3B0aW9uIG1vZGVsLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLi9tb2RlbHMvT3B0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dE9wdGlvbiBleHRlbmRzIE9wdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJhbWV0ZXJsZXNzIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoJ3RleHQnLCAnc3RyaW5nJywgJycsIFtdKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgb3B0aW9uIGlzIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBpc1ZhbGlkID0gKCk6IGJvb2xlYW4gPT4gdGhpcy5uYW1lICE9IG51bGwgJiYgdHlwZW9mIHRoaXMubmFtZSA9PSB0aGlzLnR5cGU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSBjaGlsZHJlbiBzdWIgb3B0aW9uIG1vZGVsLlxyXG4gKi9cclxuXHJcblxyXG5pbXBvcnQgT3B0aW9uIGZyb20gXCIuLi8uLi9tb2RlbHMvT3B0aW9uXCI7XHJcbmltcG9ydCBQbGFjZW1lbnRTdWJPcHRpb24gZnJvbSBcIi4vUGxhY2VtZW50U3ViT3B0aW9uXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2hpbGRyZW5TdWJPcHRpb24gZXh0ZW5kcyBPcHRpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIHN1YiBrZXlzIG9mIHRoZSBgY2hpbGRyZW5gIHN1YiBvcHRpb24uXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBrZXlzOiBDaGlsZHJlbktleXMgPSBuZXcgQ2hpbGRyZW5LZXlzKCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJhbWV0ZXJsZXNzIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoJ2NoaWxkcmVuJywgJ29iamVjdCcsICcnLCBbXSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdGhlIG9wdGlvbiBpcyB2YWxpZC5cclxuICAgICAqL1xyXG4gICAgaXNWYWxpZCA9ICgpOiBib29sZWFuID0+IHRoaXMubmFtZSAhPSBudWxsICYmIHR5cGVvZiB0aGlzLm5hbWUgPT0gdGhpcy50eXBlO1xyXG59XHJcblxyXG5jbGFzcyBDaGlsZHJlbktleXMge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogV2hldGhlciBvciBub3QgdG8gYWxsb3cgY2hpbGRyZW4gaW5oZXJpdGFuY2UuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhbGxvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIGluaGVyaXRhbmNlIG1vZGUuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBwbGFjZW1lbnQ6IFBsYWNlbWVudFN1Yk9wdGlvbiA9IG5ldyBQbGFjZW1lbnRTdWJPcHRpb24oKTtcclxufVxyXG4iLCIvKipcclxuICogVGhlIG1vZGUgc3ViIG9wdGlvbiBtb2RlbC5cclxuICovXHJcblxyXG5cclxuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi4vLi4vbW9kZWxzL09wdGlvblwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vZGVTdWJPcHRpb24gZXh0ZW5kcyBPcHRpb24ge1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGFyYW1ldGVybGVzcyBjb25zdHJ1Y3Rvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcblxyXG4gICAgICAgIHN1cGVyKCdtb2RlJywgJ3N0cmluZycsICdhcHBlbmQnLCBbJ2FwcGVuZCcsICdvdmVycmlkZSddKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgb3B0aW9uIGlzIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBpc1ZhbGlkID0gKCk6IGJvb2xlYW4gPT4gdGhpcy5uYW1lICE9IG51bGwgJiYgdHlwZW9mIHRoaXMubmFtZSA9PSB0aGlzLnR5cGU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSBwbGFjZW1lbnQgc3ViIG9wdGlvbiBtb2RlbC5cclxuICovXHJcblxyXG5cclxuaW1wb3J0IE9wdGlvbiBmcm9tIFwiLi4vLi4vbW9kZWxzL09wdGlvblwiO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYWNlbWVudFN1Yk9wdGlvbiBleHRlbmRzIE9wdGlvbiB7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQYXJhbWV0ZXJsZXNzIGNvbnN0cnVjdG9yLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuXHJcbiAgICAgICAgc3VwZXIoJ3BsYWNlbWVudCcsICdzdHJpbmcnLCAnYWZ0ZXInLCBbJ2FmdGVyJywgJ2JlZm9yZSddKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB0aGUgb3B0aW9uIGlzIHZhbGlkLlxyXG4gICAgICovXHJcbiAgICBpc1ZhbGlkID0gKCk6IGJvb2xlYW4gPT4gdGhpcy5uYW1lICE9IG51bGwgJiYgdHlwZW9mIHRoaXMubmFtZSA9PSB0aGlzLnR5cGU7XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRoZSBtb2R1bGUgcmVzcG9uc2libGUgZm9yIHZhbGlkYXRpbmcgdGhlIGlucHV0LlxyXG4gKi9cclxuXHJcbiBcclxuaW1wb3J0IHsgSGllcmFyY2h5IH0gZnJvbSBcIi4vbW9kZWxzL0hpZXJhcmNoeVwiO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGEgdmFsaWQgaGllcmFyY2h5IG9iamVjdC5cclxuICogXHJcbiAqIEBwYXJhbSBoaWVyYXJjaHkgVGhlIG9iamVjdCB0byBjaGVjay5cclxuICovXHJcbmV4cG9ydCBjb25zdCBpc1ZhbGlkSGllcmFyY2h5ID0gKGhpZXJhcmNoeTogSGllcmFyY2h5KTogYm9vbGVhbiA9PiBoaWVyYXJjaHkgIT0gbnVsbCAmJiB0eXBlb2YgaGllcmFyY2h5ID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShoaWVyYXJjaHkpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGEgdmFsaWQgSFRNTCBlbGVtZW50LlxyXG4gKiBcclxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IHRvIGNoZWNrLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzVmFsaWRIVE1MRWxlbWVudCA9ICh0YXJnZXQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiA9PiB0YXJnZXQgIT0gbnVsbCAmJiB0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcclxuIiwiLyoqXHJcbiAqIFxyXG4gKiBAbmFtZTogICAgICAgdGVtbWVqc1xyXG4gKiBAdmVyc2lvbjogICAgMS4wLjBcclxuICogQGF1dGhvcjogICAgIEVPdXNzYW1hXHJcbiAqIEBsaWNlbnNlICAgICBNSVRcclxuICogQHNvdXJjZTogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9FT3Vzc2FtYS90ZW1tZWpzXHJcbiAqIFxyXG4gKiBUZW1tZSAob3IgRW1tZXQgaW4gcmV2ZXJzZSkgaXMgdG8gamF2YXNjcmlwdCB3aGF0IEVtbWV0IGlzIHRvIEhUTUwgYW5kIENTUyxcclxuICogd2l0aCBubyBkb3VidHMsIEVtbWV0IHNhdmVkIHVzIGZyb20gdGhlIGhlYWRhY2hlIG9mIHdvcmtpbmcgd2l0aCBIVE1MIGFuZCBDU1MsIFxyXG4gKiBhbmQgbm93LCBUZW1tZSBpcyBkb2luZyBKYXZhc2NyaXB0IHRoZSBzYW1lIGZhdm91ciB0b28uXHJcbiAqIFxyXG4gKi9cclxuXHJcbmltcG9ydCB7IEhpZXJhcmNoeSB9IGZyb20gXCIuL21vZHVsZXMvbW9kZWxzL0hpZXJhcmNoeVwiO1xyXG5pbXBvcnQgKiBhcyBWYWxpZGF0b3IgZnJvbSBcIi4vbW9kdWxlcy92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHsgb3B0aW9ucyB9IGZyb20gXCIuL21vZHVsZXMvb3B0aW9uc1wiO1xyXG5pbXBvcnQgVGVtbXlFcnJvciBmcm9tIFwiLi9tb2R1bGVzL21vZGVscy9UZW1teUVycm9yXCI7XHJcbmltcG9ydCBJbnZhbGlkSGllcmFyY2h5RXJyb3IgZnJvbSBcIi4vbW9kdWxlcy9lcnJvcnMvSW52YWxpZEhpZXJhcmNoeUVycm9yXCI7XHJcbmltcG9ydCBJbnZhbGlkVGFyZ2V0RXJyb3IgZnJvbSBcIi4vbW9kdWxlcy9lcnJvcnMvSW52YWxpZFRhcmdldEVycm9yXCI7XHJcblxyXG4vKipcclxuICogYFBhcnNlYCBpcyB0aGUgZW50cnkgcG9pbnQgb2YgVGVtbWUsIGl0J3Mgd2hhdCBpbml0aWF0ZXMgZXZlcnl0aGluZ1xyXG4gKiBmcm9tIHNhbml0aXppbmcsIHRvIHBhcnNpbmcsIGxpa2UgYSBib3NzLlxyXG4gKiBcclxuICogQHBhcmFtIGhpZXJhcmNoeSBUaGUgaGllcmFyY2h5IG9iamVjdCB0aGF0IG1hcHMgdGhlIEhUTUwgc2tlbGV0b24uXHJcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIEhUTUwgZWxlbWVudCB0aGF0IHdpbGwgaG9zdCB0aGUgcGFyc2VkIHNrZWxldG9uLlxyXG4gKiBAcGFyYW0gZW5kQmFsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZXhlY3V0ZSB3aGVuIHRoZSBza2VsZXRvbiBoYXMgYmVlbiBwYXJzZWQuXHJcbiAqIEBwYXJhbSBub2RlQ2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZXhlY3V0ZXMgd2hlbmV2ZXIgYW4gZWxlbWVudCBoYXMgYmVlbiBwYXJzZWQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UoaGllcmFyY2h5OiBIaWVyYXJjaHksIHRhcmdldDogSFRNTEVsZW1lbnQsIGVuZEJhbGxiYWNrOiAoKSA9PiB7fSwgbm9kZUNhbGxiYWNrOiAodGVtbWVJZDogc3RyaW5nLCBjdXJyZW50SGllcmFyY2h5OiBIaWVyYXJjaHksIGRlcHRoOiBudW1iZXIpID0+IHt9KSB7XHJcbiAgICBjb25zb2xlLmxvZyhvcHRpb25zKTtcclxuICAgIHRyeSB7XHJcblxyXG4gICAgICAgIC8vIENoZWNraW5nIGlmIHRoZSB0YXJnZXQgaXMgYSB2YWxpZCBIVE1MIGVsZW1lbnQgYW5kIHRocm93aW5nXHJcbiAgICAgICAgLy8gYW4gZXJyb3IgaWYgaXQncyBub3QuXHJcbiAgICAgICAgaWYgKCFWYWxpZGF0b3IuaXNWYWxpZEhUTUxFbGVtZW50KHRhcmdldCkpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEludmFsaWRUYXJnZXRFcnJvcihcIlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNraW5nIGlmIHRoZSBoaWVyYXJjaHkgb2JqZWN0IGlzIGFuZCB0aHJvd2luZ1xyXG4gICAgICAgIC8vIGFuIGVycm9yIGlmIGl0J3Mgbm90LlxyXG4gICAgICAgIGlmICghVmFsaWRhdG9yLmlzVmFsaWRIaWVyYXJjaHkoaGllcmFyY2h5KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZEhpZXJhcmNoeUVycm9yKFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXhlY3V0aW5nIHRoZSBlbmQgY2FsbGJhY2suXHJcbiAgICAgICAgZW5kQmFsbGJhY2soKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlKSB7XHJcblxyXG4gICAgICAgIC8vIEFwcGVuZGluZyBhIHRhZyBpbiBmcm9udCBvZiB0aGUgZXJyb3IncyBtZXNzYWdlLlxyXG4gICAgICAgICg8VGVtbXlFcnJvcj5lKS5tZXNzYWdlID0gYFtUZW1tZV06ICR7ZS5tZXNzYWdlfS5gO1xyXG5cclxuICAgICAgICAvLyBUaHJvd2luZyB0aGUgZXJyb3IuXHJcbiAgICAgICAgdGhyb3cgZTtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6IiJ9