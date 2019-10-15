(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["other"],{

/***/ "./src/other.js":
/*!**********************!*\
  !*** ./src/other.js ***!
  \**********************/
/*! exports provided: add, multy */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "multy", function() { return multy; });
const add = (...nums) => {
    return nums.reduce((prev, cur) => {
        return prev + cur
    }, 0)
}

const multy = (...nums) => {
    console.log('11111')
    return nums.reduce((prev, cur) => {
        return prev * cur
    }, 0)
}

/***/ })

}]);
//# sourceMappingURL=other.js.map