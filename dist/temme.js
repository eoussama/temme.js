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

/***/ "./src/modules/errors/InvalidTargetError.ts":
/*!**************************************************!*\
  !*** ./src/modules/errors/InvalidTargetError.ts ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TemmyError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TemmyError */ "./src/modules/errors/TemmyError.ts");
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
        _this.message = message.length > 0 ? message : "The target is not a valid HTML element";
        return _this;
    }
    return InvalidTargetError;
}(_TemmyError__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (InvalidTargetError);


/***/ }),

/***/ "./src/modules/errors/TemmyError.ts":
/*!******************************************!*\
  !*** ./src/modules/errors/TemmyError.ts ***!
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
        _this.message = message.length > 0 ? message : "Temme isn't feeling good";
        return _this;
    }
    return TemmyError;
}(Error));
/* harmony default export */ __webpack_exports__["default"] = (TemmyError);


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
function isValidHierarchy(hierarchy) {
    return true;
}
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
/* harmony import */ var _modules_errors_InvalidTargetError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/errors/InvalidTargetError */ "./src/modules/errors/InvalidTargetError.ts");


function parse(hierarchy, target, endBallback, nodeCallback) {
    try {
        if (!_modules_validator__WEBPACK_IMPORTED_MODULE_0__["isValidHTMLElement"](target)) {
            throw new _modules_errors_InvalidTargetError__WEBPACK_IMPORTED_MODULE_1__["default"]("");
        }
        if (!_modules_validator__WEBPACK_IMPORTED_MODULE_0__["isValidHierarchy"](hierarchy)) {
            throw new _modules_errors_InvalidTargetError__WEBPACK_IMPORTED_MODULE_1__["default"]("");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9UZW1tZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL0phdmFzY3JpcHQvdGVtbWVqcy9zcmMvbW9kdWxlcy9lcnJvcnMvSW52YWxpZFRhcmdldEVycm9yLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvSmF2YXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL2Vycm9ycy9UZW1teUVycm9yLnRzIiwid2VicGFjazovL1RlbW1lL3NyYy9EOi9zY3JpcHRpbmcvSmF2YXNjcmlwdC90ZW1tZWpzL3NyYy9tb2R1bGVzL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly9UZW1tZS9zcmMvRDovc2NyaXB0aW5nL0phdmFzY3JpcHQvdGVtbWVqcy9zcmMvdGVtbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3RXNDO0FBRXRDO0lBQWdELHNDQUFVO0lBaUJ0RCw0QkFBWSxPQUFlO1FBQTNCLFlBR0ksa0JBQU0sT0FBTyxDQUFDLFNBSWpCO1FBbkJNLFVBQUksR0FBVyxvQkFBb0IsQ0FBQztRQUtwQyxhQUFPLEdBQVcsd0NBQXdDLENBQUM7UUFhOUQsS0FBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyx3Q0FBd0MsQ0FBQzs7SUFDM0YsQ0FBQztJQUNMLHlCQUFDO0FBQUQsQ0FBQyxDQXpCK0MsbURBQVUsR0F5QnpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWkQ7SUFBd0MsOEJBQUs7SUFpQnpDLG9CQUFZLE9BQWU7UUFBM0IsWUFHSSxpQkFBTyxTQUlWO1FBbkJlLFVBQUksR0FBVyxZQUFZLENBQUM7UUFLckMsYUFBTyxHQUFXLDBCQUEwQixDQUFDO1FBYWhELEtBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsMEJBQTBCLENBQUM7O0lBQzdFLENBQUM7SUFDTCxpQkFBQztBQUFELENBQUMsQ0F6QnVDLEtBQUssR0F5QjVDOzs7Ozs7Ozs7Ozs7OztBQ2pDRDtBQUFBO0FBQUE7QUFBTyxTQUFTLGdCQUFnQixDQUFDLFNBQW9CO0lBQ3BELE9BQU8sSUFBSSxDQUFDO0FBQ2IsQ0FBQztBQVFNLElBQU0sa0JBQWtCLEdBQUcsVUFBQyxNQUFtQixJQUFjLGFBQU0sSUFBSSxJQUFJLElBQUksTUFBTSxZQUFZLFdBQVcsRUFBL0MsQ0FBK0MsQ0FBQzs7Ozs7Ozs7Ozs7OztBQ1BwSDtBQUFBO0FBQUE7QUFBQTtBQUFpRDtBQUVvQjtBQVc5RCxTQUFTLEtBQUssQ0FBQyxTQUFvQixFQUFFLE1BQW1CLEVBQUUsV0FBcUIsRUFBRSxZQUFpRjtJQUVySyxJQUFJO1FBSUEsSUFBSSxDQUFDLHFFQUE0QixDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZDLE1BQU0sSUFBSSwwRUFBa0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUNwQztRQUlELElBQUksQ0FBQyxtRUFBMEIsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN4QyxNQUFNLElBQUksMEVBQWtCLENBQUMsRUFBRSxDQUFDLENBQUM7U0FDcEM7UUFHRCxXQUFXLEVBQUUsQ0FBQztLQUNqQjtJQUNELE9BQU8sQ0FBQyxFQUFFO1FBR08sQ0FBRSxDQUFDLE9BQU8sR0FBRyxjQUFZLENBQUMsQ0FBQyxPQUFPLE1BQUcsQ0FBQztRQUduRCxNQUFNLENBQUMsQ0FBQztLQUNYO0FBQ0wsQ0FBQyIsImZpbGUiOiJ0ZW1tZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL3RlbW1lLnRzXCIpO1xuIiwiLyoqXHJcbiAqIFRoZSBlcnJvciB0aHJvdyB3aGVuIGEgdGFyZ2V0IGlzIG5vdCBhIHZhbGlkXHJcbiAqIEhUTUwgZWxlbWVudC5cclxuICovXHJcblxyXG5pbXBvcnQgVGVtbXlFcnJvciBmcm9tIFwiLi9UZW1teUVycm9yXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbnZhbGlkVGFyZ2V0RXJyb3IgZXh0ZW5kcyBUZW1teUVycm9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvci5cclxuICAgICAqL1xyXG4gICAgcHVibGljIG5hbWU6IHN0cmluZyA9IFwiSW52YWxpZFRhcmdldEVycm9yXCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUaGUgbWVzc2FnZSBvZiB0aGUgZXJyb3IuXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcgPSBcIlRoZSB0YXJnZXQgaXMgbm90IGEgdmFsaWQgSFRNTCBlbGVtZW50XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb25zdHJ1Y3RvciB3aXRoIHBhcmFtZXRlcnMuXHJcbiAgICAgKiBcclxuICAgICAqIEBwYXJhbSBtZXNzYWdlIFRoZSBtZXNzYWdlIG9mIHRoZSBlcnJvci5cclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nKSB7XHJcblxyXG4gICAgICAgIC8vIENhbGxpbmcgdGhlIHBhcmVudCBjbGFzcyBgRXJyb3JgLlxyXG4gICAgICAgIHN1cGVyKG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGluZyB0aGUgZXJyb3IncyBtZXNzYWdlLlxyXG4gICAgICAgIHRoaXMubWVzc2FnZSA9IG1lc3NhZ2UubGVuZ3RoID4gMCA/IG1lc3NhZ2UgOiBcIlRoZSB0YXJnZXQgaXMgbm90IGEgdmFsaWQgSFRNTCBlbGVtZW50XCI7XHJcbiAgICB9XHJcbn1cclxuIiwiLyoqXHJcbiAqIFRlbW1lJ3MgZXJyb3IgaW50ZXJmYWNlLlxyXG4gKi9cclxuaW50ZXJmYWNlIElUZW1teUVycm9yIHtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvci5cclxuICAgICAqL1xyXG4gICAgcmVhZG9ubHkgbmFtZTogc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1lc3NhZ2Ugb2YgdGhlIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBtZXNzYWdlOiBzdHJpbmc7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogVGVtbWUncyBjdXN0b20gZXJyb3JzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGVtbXlFcnJvciBleHRlbmRzIEVycm9yIGltcGxlbWVudHMgSVRlbW15RXJyb3Ige1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgcmVhZG9ubHkgbmFtZTogc3RyaW5nID0gJ1RlbW15RXJyb3InO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogVGhlIG1lc3NhZ2Ugb2YgdGhlIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgbWVzc2FnZTogc3RyaW5nID0gXCJUZW1tZSBpc24ndCBmZWVsaW5nIGdvb2RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbnN0cnVjdG9yIHdpdGggcGFyYW1ldGVycy5cclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2UgVGhlIG1lc3NhZ2Ugb2YgdGhlIGVycm9yLlxyXG4gICAgICovXHJcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcclxuXHJcbiAgICAgICAgLy8gQ2FsbGluZyB0aGUgcGFyZW50IGNsYXNzIGBFcnJvcmAuXHJcbiAgICAgICAgc3VwZXIoKTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRpbmcgdGhlIGVycm9yJ3MgbWVzc2FnZS5cclxuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlLmxlbmd0aCA+IDAgPyBtZXNzYWdlIDogXCJUZW1tZSBpc24ndCBmZWVsaW5nIGdvb2RcIjtcclxuICAgIH1cclxufVxyXG4iLCIvKipcclxuICogVGhlIG1vZHVsZSByZXNwb25zaWJsZSBmb3IgdmFsaWRhdGluZyB0aGUgaW5wdXQuXHJcbiAqL1xyXG5cclxuaW1wb3J0IEhpZXJhcmNoeSBmcm9tIFwiLi9tb2RlbHMvSGllcmFyY2h5XCI7XHJcblxyXG5cclxuLyoqXHJcbiAqIENoZWNrcyBpZiBhbiBvYmplY3QgaXMgYSB2YWxpZCBoaWVyYXJjaHkgb2JqZWN0LlxyXG4gKiBcclxuICogQHBhcmFtIGhpZXJhcmNoeSBUaGUgb2JqZWN0IHRvIGNoZWNrLlxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGlzVmFsaWRIaWVyYXJjaHkoaGllcmFyY2h5OiBIaWVyYXJjaHkpOiBib29sZWFuIHtcclxuXHRyZXR1cm4gdHJ1ZTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYW4gb2JqZWN0IGlzIGEgdmFsaWQgSFRNTCBlbGVtZW50LlxyXG4gKiBcclxuICogQHBhcmFtIHRhcmdldCBUaGUgb2JqZWN0IHRvIGNoZWNrLlxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IGlzVmFsaWRIVE1MRWxlbWVudCA9ICh0YXJnZXQ6IEhUTUxFbGVtZW50KTogYm9vbGVhbiA9PiB0YXJnZXQgIT0gbnVsbCAmJiB0YXJnZXQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcclxuIiwiLyoqXHJcbiAqIFxyXG4gKiBAbmFtZTogICAgICAgdGVtbWVqc1xyXG4gKiBAdmVyc2lvbjogICAgMS4wLjBcclxuICogQGF1dGhvcjogICAgIEVPdXNzYW1hXHJcbiAqIEBsaWNlbnNlICAgICBNSVRcclxuICogQHNvdXJjZTogICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9FT3Vzc2FtYS90ZW1tZWpzXHJcbiAqIFxyXG4gKiBUZW1tZSAob3IgRW1tZXQgaW4gcmV2ZXJzZSkgaXMgdG8gamF2YXNjcmlwdCB3aGF0IEVtbWV0IGlzIHRvIEhUTUwgYW5kIENTUyxcclxuICogd2l0aCBubyBkb3VidHMsIEVtbWV0IHNhdmVkIHVzIGZyb20gdGhlIGhlYWRhY2hlIG9mIHdvcmtpbmcgd2l0aCBIVE1MIGFuZCBDU1MsIFxyXG4gKiBhbmQgbm93LCBUZW1tZSBpcyBkb2luZyBKYXZhc2NyaXB0IHRoZSBzYW1lIGZhdm91ciB0b28uXHJcbiAqIFxyXG4gKi9cclxuXHJcbmltcG9ydCBIaWVyYXJjaHkgZnJvbSBcIi4vbW9kdWxlcy9tb2RlbHMvSGllcmFyY2h5XCI7XHJcbmltcG9ydCAqIGFzIFZhbGlkYXRvciBmcm9tIFwiLi9tb2R1bGVzL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQgVGVtbXlFcnJvciBmcm9tIFwiLi9tb2R1bGVzL2Vycm9ycy9UZW1teUVycm9yXCI7XHJcbmltcG9ydCBJbnZhbGlkVGFyZ2V0RXJyb3IgZnJvbSBcIi4vbW9kdWxlcy9lcnJvcnMvSW52YWxpZFRhcmdldEVycm9yXCI7XHJcblxyXG4vKipcclxuICogYFBhcnNlYCBpcyB0aGUgZW50cnkgcG9pbnQgb2YgVGVtbWUsIGl0J3Mgd2hhdCBpbml0aWF0ZXMgZXZlcnl0aGluZ1xyXG4gKiBmcm9tIHNhbml0aXppbmcsIHRvIHBhcnNpbmcsIGxpa2UgYSBib3NzLlxyXG4gKiBcclxuICogQHBhcmFtIGhpZXJhcmNoeSBUaGUgaGllcmFyY2h5IG9iamVjdCB0aGF0IG1hcHMgdGhlIEhUTUwgc2tlbGV0b24uXHJcbiAqIEBwYXJhbSB0YXJnZXQgVGhlIEhUTUwgZWxlbWVudCB0aGF0IHdpbGwgaG9zdCB0aGUgcGFyc2VkIHNrZWxldG9uLlxyXG4gKiBAcGFyYW0gZW5kQmFsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZXhlY3V0ZSB3aGVuIHRoZSBza2VsZXRvbiBoYXMgYmVlbiBwYXJzZWQuXHJcbiAqIEBwYXJhbSBub2RlQ2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRoYXQgZXhlY3V0ZXMgd2hlbmV2ZXIgYW4gZWxlbWVudCBoYXMgYmVlbiBwYXJzZWQuXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UoaGllcmFyY2h5OiBIaWVyYXJjaHksIHRhcmdldDogSFRNTEVsZW1lbnQsIGVuZEJhbGxiYWNrOiAoKSA9PiB7fSwgbm9kZUNhbGxiYWNrOiAodGVtbWVJZDogc3RyaW5nLCBjdXJyZW50SGllcmFyY2h5OiBIaWVyYXJjaHksIGRlcHRoOiBudW1iZXIpID0+IHt9KSB7XHJcblxyXG4gICAgdHJ5IHtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdGhlIHRhcmdldCBpcyBhIHZhbGlkIEhUTUwgZWxlbWVudCBhbmQgdGhyb3dpbmdcclxuICAgICAgICAvLyBhbiBlcnJvciBpZiBpdCdzIG5vdC5cclxuICAgICAgICBpZiAoIVZhbGlkYXRvci5pc1ZhbGlkSFRNTEVsZW1lbnQodGFyZ2V0KSkge1xyXG4gICAgICAgICAgICB0aHJvdyBuZXcgSW52YWxpZFRhcmdldEVycm9yKFwiXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdGhlIGhpZXJhcmNoeSBvYmplY3QgaXMgYW5kIHRocm93aW5nXHJcbiAgICAgICAgLy8gYW4gZXJyb3IgaWYgaXQncyBub3QuXHJcbiAgICAgICAgaWYgKCFWYWxpZGF0b3IuaXNWYWxpZEhpZXJhcmNoeShoaWVyYXJjaHkpKSB7XHJcbiAgICAgICAgICAgIHRocm93IG5ldyBJbnZhbGlkVGFyZ2V0RXJyb3IoXCJcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFeGVjdXRpbmcgdGhlIGVuZCBjYWxsYmFjay5cclxuICAgICAgICBlbmRCYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGUpIHtcclxuXHJcbiAgICAgICAgLy8gQXBwZW5kaW5nIGEgdGFnIGluIGZyb250IG9mIHRoZSBlcnJvcidzIG1lc3NhZ2UuXHJcbiAgICAgICAgKDxUZW1teUVycm9yPmUpLm1lc3NhZ2UgPSBgW1RlbW1lXTogJHtlLm1lc3NhZ2V9LmA7XHJcblxyXG4gICAgICAgIC8vIFRocm93aW5nIHRoZSBlcnJvci5cclxuICAgICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiIn0=