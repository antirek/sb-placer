var sbPlacer =
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
  

  // require('helpers/indexof.js');
  // require('helpers/selector.js');
  // require('helpers/checkers.js');
  var core = __webpack_require__(1);
  var actions = __webpack_require__(3);

  module.exports = function(params) {

    var placer  = actions.place,
        targets = actions.getTargets(params.targets);

    core.go(placer, targets, params);

  };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var type = __webpack_require__(2);


var core = {

  go: function(placer, targets, params) {

    var terms = params.conditions;

    for (var i = 0; i < terms.length; i++) {

      if (this.isIncompatibleArrays(terms[i].check, terms[i].when)) continue;

      if (this.isCompatibleArrays(terms[i].check, terms[i].when)) {
        var place_it = false;
        for (var ii = 0; ii < terms[i].check.length; ii++) {
          if (this.isMatch(terms[i].check[ii], terms[i].when[ii])) {
            place_it = true;
          } else {
            place_it = false;
            break;
          }
        }
        if (place_it) {
          placer(targets, terms[i].place);
          this.execCallback(params.callback, terms[i].check, terms[i].when, terms[i].place);
          return true;
        }
      }

      if (this.isMatch(terms[i].check, terms[i].when)) {
        placer(targets, terms[i].place);
        this.execCallback(params.callback, terms[i].check, terms[i].when, terms[i].place);
        return true;
      }

    }

    // Oops, no match
    placer(targets, params.default_value);
    this.execCallback(params.callback, false, false, params.default_value);
    return true;

  },

  isIncompatibleArrays: function(check, when) {
    return (
      type.isArray(check) && type.isArray(when) && check.length !== when.length
    );
  },

  isCompatibleArrays: function(check, when) {
    return (
      type.isArray(check) && type.isArray(when) && check.length === when.length
    );
  },

  isMatch: function(check, when) {
    return (
      (type.isRegExp(when) && check.match(when)) ||
      (!type.isRegExp(when) && type.isArray(when) && when.indexOf(check) !== -1) ||
      (!type.isRegExp(when) && !type.isArray(when) && when === check)
    );
  },

  execCallback: function(cb, check, when, place) {
    if (cb && type.isFunction(cb)) cb(check, when, place);
  }

};

module.exports = core;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var type = {

  isArray: Array.isArray || function(o) {
    return (
        typeof o === 'object' && Object.prototype.toString.call(o) === '[object Array]'
    );
  },

  isRegExp: function(o) {
    return (
        Object.prototype.toString.call(o) === '[object RegExp]'
    );
  },

  isFunction: function(o) {
    return (
        typeof o === 'function' && Object.prototype.toString.call(o) === '[object Function]'
    );
  }

};

module.exports = type;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var select = __webpack_require__(4);

var actions = {

  place: function(targets, value) {
    for (var i = 0; i < targets.length; i++) {
      targets[i].innerHTML = value;
    }
  },

  getTargets: function(selectors) {
    return select.call(document, selectors);
  }

};

module.exports = actions;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var select = document.querySelectorAll || function(selector) {

  var style = document.styleSheets[0] || document.createStyleSheet();
  style.addRule(selector, 'foo:bar');
  var all = document.all, resultSet = [];
  for (var i = 0, l = all.length; i < l; i++) {
    if (all[i].currentStyle.foo === 'bar') resultSet[resultSet.length] = all[i];
  }
  style.removeRule(0);
  return resultSet;

};

module.exports = select;

/***/ })
/******/ ]);