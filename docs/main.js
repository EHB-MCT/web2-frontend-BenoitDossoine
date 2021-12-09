/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Gamenight.js":
/*!**************************!*\
  !*** ./src/Gamenight.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Gamenight {\r\n    constructor(gamenightName, playerAmount, duration, categories, location, time, date) {\r\n        this.name = gamenightName;\r\n        this.playerAmount = playerAmount;\r\n        this.duration = duration;\r\n        this.categories = categories;\r\n        this.location = location;\r\n        this.time = time;\r\n        this.date = date;\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gamenight);\n\n//# sourceURL=webpack://web2-frontend-benoitdossoine/./src/Gamenight.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Gamenight_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gamenight.js */ \"./src/Gamenight.js\");\n\r\n\r\n// let loader = document.getElementById(\"loader\");\r\n// setTimeout(() => {\r\n//     loader.classList.add(\"loaded\");\r\n//     setTimeout(() => {\r\n//         loader.remove();\r\n//     }, 1100);\r\n// }, Math.random() * (4000 - 2000) + 2000);\r\n\r\nwindow.onload = function () {\r\n    console.log(\"Window loaded!\");\r\n\r\n    //Add eventlisteners to buttons on homepage\r\n    document.getElementById(\"addGameNight\").addEventListener(\"click\", (e) => {\r\n        document.getElementById(\"gamenightOverview\").style.display = \"none\";\r\n        document.getElementById(\"gamenightMaker\").style.display = \"flex\";\r\n\r\n        let tabNumber = 0;\r\n\r\n        //Set event listeners of form\r\n        document.getElementById(\"addPlayerButton\").addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            addPlayer();\r\n        });\r\n        document.getElementById(\"removePlayerButton\").addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            removePlayer();\r\n        });\r\n        document.getElementById(\"addTimeButton\").addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            addTime();\r\n        });\r\n        document.getElementById(\"removeTimeButton\").addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            removeTime();\r\n        });\r\n        document.getElementById(\"formPrevious\").addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            tabNumber--;\r\n            showTabs(tabNumber);\r\n        })\r\n        document.getElementById(\"formNext\").addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            tabNumber++;\r\n            showTabs(tabNumber);\r\n        })\r\n        document.getElementById(\"formSubmit\").addEventListener(\"click\", function (e) {\r\n            e.preventDefault();\r\n            makeGamenight();\r\n        })\r\n\r\n\r\n        showTabs(0);\r\n    })\r\n}\r\n\r\nfunction addPlayer() {\r\n    if (document.getElementById(\"playersInput\").value < 8) {\r\n        document.getElementById(\"playersInput\").value++;\r\n        document.getElementById(\"numberContainer\").insertAdjacentHTML('beforeend', '<div class=\"hexagon\"></div>');\r\n    }\r\n}\r\n\r\nfunction removePlayer() {\r\n    if (document.getElementById(\"playersInput\").value > 2) {\r\n        document.getElementById(\"playersInput\").value--;\r\n        document.getElementById(\"numberContainer\").removeChild(document.getElementById(\"numberContainer\").lastChild);\r\n    }\r\n}\r\n\r\nfunction addTime() {\r\n    document.getElementById(\"timeInput\").value = parseInt(document.getElementById(\"timeInput\").value) + 30;\r\n    document.getElementById(\"timeContainer\").getElementsByTagName(\"span\")[0].innerHTML = document.getElementById(\"timeInput\").value;\r\n}\r\n\r\nfunction removeTime() {\r\n    if (document.getElementById('timeInput').value > 30) {\r\n        document.getElementById(\"timeInput\").value = parseInt(document.getElementById(\"timeInput\").value) - 30;\r\n        document.getElementById(\"timeContainer\").getElementsByTagName(\"span\")[0].innerHTML = document.getElementById(\"timeInput\").value;\r\n    }\r\n}\r\n\r\nfunction showTabs(n) {\r\n    document.getElementsByClassName(\"tab\")[n].style.display = \"block\";\r\n\r\n    if (n == 0) {\r\n        document.getElementById(\"formPrevious\").disabled = true;\r\n    } else {\r\n        document.getElementsByClassName(\"tab\")[n - 1].style.display = \"none\";\r\n        document.getElementById(\"formPrevious\").disabled = false;\r\n    }\r\n\r\n    if (n == document.getElementsByClassName(\"tab\").length - 1) {\r\n        document.getElementById(\"formNext\").style.display = \"none\";\r\n        document.getElementById(\"formSubmit\").style.display = \"block\";\r\n    } else {\r\n        document.getElementsByClassName(\"tab\")[n + 1].style.display = \"none\";\r\n        document.getElementById(\"formNext\").style.display = \"block\";\r\n        document.getElementById(\"formSubmit\").style.display = \"none\";\r\n    }\r\n}\r\n\r\nfunction makeGamenight() {\r\n    let gamenight = retrieveFormData();\r\n    console.log(gamenight);\r\n\r\n}\r\n\r\nfunction retrieveFormData() {\r\n    let amountOfPlayers = document.getElementById(\"playersInput\").value;\r\n    let duration = document.getElementById(\"timeInput\").value;\r\n    let allCategories = document.getElementsByClassName(\"formCategory\");\r\n    let chosenCategories = [];\r\n\r\n    for (let category of allCategories) {\r\n        if (category.checked) {\r\n            chosenCategories.push(category.id);\r\n        };\r\n    }\r\n\r\n    let name = document.getElementById(\"gamenightName\").value;\r\n    let location = document.getElementById(\"gamenightLocation\").value;\r\n    let time = document.getElementById(\"gamenightTime\").value;\r\n    let date = document.getElementById(\"gamenightDate\").value;\r\n\r\n    return new _Gamenight_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](name, amountOfPlayers, duration, chosenCategories, location, time, date);\r\n\r\n\r\n}\n\n//# sourceURL=webpack://web2-frontend-benoitdossoine/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;